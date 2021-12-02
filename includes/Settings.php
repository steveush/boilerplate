<?php /** @noinspection PhpIncludeInspection */

namespace Boilerplate;

use Boilerplate\traits\WithSingleton;

/**
 * Contains all the logic for dealing with settings throughout the plugin.
 *
 * @implements WithSingleton<Settings>
 */
class Settings {
    use WithSingleton;

    public function __construct() {
        add_action( 'init', array( $this, 'register' ) );
        add_action( 'admin_menu', array( $this, 'add_option_page' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ), 10 );
    }

    /**
     * Registers the plugin settings.
     */
    public function register(){
        register_setting( SLUG . '_settings', SLUG . '_options', [
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
            'boilerplate_settings',
            array( $this, 'render_option_page' )
	    );
    }

    /**
     * Renders the root of the options page which is just a placeholder for the JS to render within.
     */
    public function render_option_page(){
        ?>
        <div id="<?php echo SLUG ?>-settings"></div>
        <?php
    }

    /**
     * Enqueues the assets required by the options page.
     */
    public function enqueue_assets(){
        $path = ASSET_PATH . 'admin/admin.settings';
        $url = ASSET_URL . 'admin/admin.settings';
        $asset = require_once( $path . '.asset.php' );
        $handle = SLUG . "-settings";
        $GLOBAL_NAME = strtoupper( SLUG ) . "_SETTINGS";

        // Enqueue styles
        wp_enqueue_style(
            $handle,
            $url . '.css',
            array(),
            $asset["version"]
        );
        // Enqueue scripts
        wp_enqueue_script(
            $handle,
            $url . '.js',
            $asset["dependencies"],
            $asset["version"],
            true // Enqueue the script in the footer.
        );
        // Enqueue any additional configuration for the front end
        wp_localize_script(
            $handle,
            $GLOBAL_NAME,
            apply_filters( $GLOBAL_NAME, [
                'handle' => $handle,
                'textDomain' => TEXT_DOMAIN
            ] )
        );
    }
}