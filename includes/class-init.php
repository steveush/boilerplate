<?php
namespace FooPlugins\PluginBoilerplate;

use FooPlugins\PluginBoilerplate\Traits\With_Settings;
use FooPlugins\PluginBoilerplate\Traits\With_Singleton;

/**
 * PluginBoilerplate Init Class
 * Runs at the startup of the plugin
 * Assumes after all checks have been made, and all is good to go!
 */

if ( !class_exists( __NAMESPACE__ . '\Init' ) ) {

	class Init {
		use With_Singleton;

		/**
		 * Initialize the plugin by setting localization, filters, and administration functions.
		 */
		public function __construct() {
			// We no longer need to load the plugin text domain!
//			add_action( 'plugins_loaded', function() {
//				load_plugin_textdomain( FOOBAR_SLUG, false, plugin_basename( FOOBAR_FILE ) . '/languages/' );
//			} );

			// Check for a new version of the plugin.
			add_action( 'plugins_loaded', array( $this, 'perform_version_check' ) );

            Settings::get_instance();

			if ( is_admin() ) {
				//namespace\Admin\Init::get_instance();
			} else {
				//new namespace\Front\Init();
			}

//			add_action( 'init', array( $this, 'test' ) );
		}

		/**
		 * Perform a check to see if the plugin has been updated
		 */
		public function perform_version_check() {
			if ( get_site_option( OPTION_VERSION ) != VERSION ) {
				//This code will run every time the plugin is updated

				do_action( HOOK_ACTION_UPDATED );

				//set the current version, so that this does not run again until the next update!
				update_site_option( OPTION_VERSION, VERSION );
			}
		}
	}
}
