<?php
namespace FooPlugins\PluginBoilerplate;

use FooPlugins\PluginBoilerplate\Traits\With_Settings;
use FooPlugins\PluginBoilerplate\Traits\With_Singleton;

/**
 * PluginBoilerplate Init Class
 * Runs at the startup of the plugin
 * Assumes after all checks have been made, and all is good to go!
 */

if ( !class_exists( 'FooPlugins\PluginBoilerplate\Init' ) ) {

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

            Settings::get_instance();

			if ( is_admin() ) {
				//namespace\Admin\Init::get_instance();
			} else {
				//new namespace\Front\Init();
			}

//			add_action( 'init', array( $this, 'test' ) );
		}

		public function test(){

			$theme = $this->get_option( "style.theme" );

			$this->set_option( "style.theme", "flat" );

			$t = '';

		}
	}
}
