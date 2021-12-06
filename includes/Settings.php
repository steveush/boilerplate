<?php /** @noinspection PhpIncludeInspection */

namespace Boilerplate;

use Boilerplate\traits\WithSingleton;
use Boilerplate\traits\WithArrayHelper;

/**
 * Contains all the logic for dealing with settings throughout the plugin.
 *
 * @implements WithSingleton<Settings>
 * @implements WithArrayHelper
 */
class Settings {
    //region Traits

    use WithSingleton, WithArrayHelper;

    //endregion

    //region Properties

    public $VAR_NAME;
    public $UID = UID . '-settings';
    public $SLUG = SLUG . '_settings';
    public $OPTION_NAME = SLUG . '_options';
    public $options = array();
    public $has_changes = false;

    //endregion

    //region Constructor

    public function __construct() {
        $this->VAR_NAME = strtoupper( $this->SLUG );

        add_action( 'admin_init', array( $this, 'register' ) );
        add_action( 'rest_api_init', array( $this, 'register' ) );
        add_action( 'admin_menu', array( $this, 'add_option_page' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ), 10 );
    }

    //endregion

    //region Hooks

    /**
     * Registers the plugin settings.
     */
    public function register(){
        register_setting( $this->SLUG, $this->OPTION_NAME, [
            'default' => SETTINGS_DEFAULTS,
            'show_in_rest' => SETTINGS_SCHEMA,
            'type' => 'object'
        ] );
    }

    /**
     * Adds an option page for the settings to render within.
     */
    public function add_option_page(){
        add_options_page(
            __( 'Boilerplate Settings', TEXT_DOMAIN ),
            __( 'Boilerplate Settings', TEXT_DOMAIN ),
            'manage_options',
            $this->SLUG,
            array( $this, 'render_option_page' )
	    );
    }

    /**
     * Renders the root of the options page which is just a placeholder for the JS to render within.
     */
    public function render_option_page(){
        ?>
        <div id="<?php echo $this->UID; ?>"></div>
        <?php
    }

    /**
     * Enqueues the assets required by the options page.
     */
    public function enqueue_assets(){
        $path = ASSET_PATH . 'admin/admin.settings';
        $url = ASSET_URL . 'admin/admin.settings';
        $asset = require_once( $path . '.asset.php' );

        // Enqueue styles
        wp_enqueue_style(
            $this->SLUG,
            $url . '.css',
            [],
            $asset["version"]
        );
        // Enqueue scripts
        wp_enqueue_script(
            $this->SLUG,
            $url . '.js',
            // the wp-api is a Backbone dependency, we need to merge it into the deps as it's not auto-included in the *.asset.php file
            array_merge( $asset["dependencies"], [ 'wp-api' ] ),
            $asset["version"],
            true // Enqueue the script in the footer.
        );
        // Enqueue any additional configuration for the front end
        wp_localize_script(
            $this->SLUG,
            $this->VAR_NAME,
            apply_filters( $this->VAR_NAME, [
                'uid' => $this->UID,
                'slug' => $this->SLUG,
                'optionName' => $this->OPTION_NAME,
                'textDomain' => TEXT_DOMAIN
            ] )
        );
    }

    //endregion

    public function get( $key ){
        $SETTINGS_DEFAULTS = SETTINGS_DEFAULTS;
        $default = $this->array_get( $SETTINGS_DEFAULTS, $key );
        $options = get_option( $this->OPTION_NAME, SETTINGS_DEFAULTS );
        return $this->array_get( $options, $key, $default );
    }

    public function set( $key, $value ){
        $options = get_option( $this->OPTION_NAME, SETTINGS_DEFAULTS );
        $result = $this->array_set( $options, $key, $value );
        // if the value was actually set then toggle the has_changes flag
        if ( $result === true ){
            // rest_validate_value_from_schema & rest_sanitize_value_from_schema
            return update_option( $this->OPTION_NAME, $options );
        }
        return $result;
    }

    public function reset(){
        return update_option( $this->OPTION_NAME, SETTINGS_DEFAULTS );
    }
}