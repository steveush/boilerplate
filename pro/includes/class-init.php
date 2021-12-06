<?php
namespace FooPlugins\PluginBoilerplate\Pro;

use FooPlugins\PluginBoilerplate\Traits\WithSingleton;

/**
 * PluginBoilerplate Pro Init Class
 */

if ( !class_exists( 'FooPlugins\PluginBoilerplate\Pro\Init' ) ) {

	class Init {
		use WithSingleton;

		/**
		 * Initialize the plugin by setting localization, filters, and administration functions.
		 */
		public function __construct() {

		}
	}
}
