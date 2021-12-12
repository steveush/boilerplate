<?php /** @noinspection PhpIncludeInspection */

namespace FooPlugins\PluginBoilerplate;

use FooPlugins\PluginBoilerplate\Traits\With_Singleton;
use function FooPlugins\PluginBoilerplate\Utils\array_defaults;
use function FooPlugins\PluginBoilerplate\Utils\array_get;
use function FooPlugins\PluginBoilerplate\Utils\array_set;

if ( !class_exists( __NAMESPACE__ . '\Settings' ) ) {

	/**
	 * Contains all the logic for dealing with settings throughout the plugin.
	 *
	 * @implements WithSingleton<Settings>
	 * @implements WithArrayHelper
	 */
	class Settings {
	    use With_Singleton;

	    //region Properties
	    public $UID = UID . '-settings';
	    public $SLUG = SLUG . '_settings';
	    public $OPTION_NAME = SLUG . '_options';
	    //endregion

	    //region Constructor

	    public function __construct() {
	        add_action( 'admin_init', array( $this, 'register' ) );
	        add_action( 'rest_api_init', array( $this, 'register' ) );
		    add_action( HOOK_ACTION_UPDATED, array( $this, 'migrate_options' ) );

	        add_action( 'admin_menu', array( $this, 'add_option_page' ) );
	        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ), 10 );
	    }

	    function migrate_options() {
		    $defaults = $this->get_defaults();

		    $options = get_option( $this->OPTION_NAME );

		    if ( !is_array( $options ) ) {
		    	$options = array();
		    }

		    $options = array_defaults( $options, $defaults );

	        foreach( $this->get_migrations() as $migration ) {
		        $options = call_user_func( $migration, $options, $defaults );
		    }

	        // Validate that the new option match the schema.
            $is_valid = $this->validate( $options );
            if ( $is_valid === true ){
                // only update the options if the migrated options passes schema validation.
                update_option( $this->OPTION_NAME, $options );
            } else {
            	// TODO : Save the validation error so that it can be displayed later.
            	update_option( OPTION_MIGRATION_ERROR, $is_valid );
            }
	    }

	    public function validate( $options ){
	        return rest_validate_value_from_schema( $options, $this->get_schema()[ 'schema' ], $this->OPTION_NAME );
	    }

	    //endregion

	    //region Hooks

	    /**
	     * Registers the plugin settings.
	     */
	    public function register(){
	        register_setting( $this->SLUG, $this->OPTION_NAME, [
	            'default' => $this->get_defaults(),
	            'show_in_rest' => $this->get_schema(),
	            'type' => 'object'
	        ] );
	    }

		private $_migrations;
		private function get_migrations() {
			if ( !isset( $this->_migrations ) ) {
				$this->_migrations = require_once( BASE_PATH . 'includes/constants/SETTINGS_MIGRATIONS.php' );
			}
			return $this->_migrations;
		}

	    private $_defaults;
	    private function get_defaults() {
	        if ( !isset( $this->_defaults ) ) {
			    $this->_defaults = require_once( BASE_PATH . 'includes/constants/SETTINGS_DEFAULTS.php' );
		    }
	        return $this->_defaults;
	    }

	    private $_schema;
	    private function get_schema() {
	        if ( !isset( $this->_schema ) ) {
	            $this->_schema = require_once( BASE_PATH . 'includes/constants/SETTINGS_SCHEMA.php' );
	        }
	        return $this->_schema;
	    }

	    private $_ui;
	    private function get_ui() {
	        if ( !isset( $this->_ui ) ) {
	            $this->_ui = require_once( BASE_PATH . 'includes/constants/SETTINGS_UI.php' );
	        }
	        return $this->_ui;
	    }

	    /**
	     * Adds an option page for the settings to render within.
	     */
	    public function add_option_page(){
	        add_options_page(
	            __( 'Boilerplate Settings', SLUG ),
	            __( 'Boilerplate Settings', SLUG ),
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
	        $path = BASE_PATH . 'assets/admin/admin.settings';
	        $url = BASE_URL . 'assets/admin/admin.settings';
	        $asset = require_once( $path . '.asset.php' );

	        // Enqueue styles
	        wp_enqueue_style(
	            $this->SLUG,
	            $url . '.css',
	            [ 'dashicons', 'wp-components' ],
	            $asset["version"]
	        );

	        // Enqueue scripts
	        wp_enqueue_script(
	            $this->SLUG,
	            $url . '.js',
	            $asset["dependencies"],
	            $asset["version"],
	            true // Enqueue the script in the footer.
	        );

		    $js_variable = strtoupper( $this->SLUG );
	        $js_config = array_merge( $this->get_ui(), [
	            'version' => VERSION,
	            'uid' => $this->UID,
	            'slug' => $this->SLUG,
	            'optionName' => $this->OPTION_NAME,
	            'defaults' => $this->get_defaults()
	        ] );

	        // Enqueue any additional configuration for the front end
	        wp_localize_script(
	            $this->SLUG,
	            $js_variable,
	            apply_filters( $this->SLUG, $js_config )
	        );
	    }

	    //endregion

	    public function get( $key ) {
	        $defaults = $this->get_defaults();
	        $default = array_get( $defaults, $key );
	        $options = get_option( $this->OPTION_NAME, $defaults );
	        return array_get( $options, $key, $default );
	    }

	    public function set( $key, $value ) {
	        $options = get_option( $this->OPTION_NAME, $this->get_defaults() );
	        $result = array_set( $options, $key, $value );
	        // if the value was actually set then toggle the has_changes flag
	        if ( $result === true ) {
	            // rest_validate_value_from_schema & rest_sanitize_value_from_schema
	            return update_option( $this->OPTION_NAME, $options );
	        }
	        return $result;
	    }

	    public function reset(){
	        return update_option( $this->OPTION_NAME, $this->get_defaults() );
	    }
	}
}