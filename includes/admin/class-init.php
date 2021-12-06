<?php
namespace FooPlugins\PluginBoilerplate\Admin;

use FooPlugins\PluginBoilerplate\Traits\With_Singleton;
use const FooPlugins\PluginBoilerplate\BASE_PATH;
use const FooPlugins\PluginBoilerplate\BASE_URL;

/**
 * PluginBoilerplate Admin Init Class
 * Runs all classes that need to run in the admin
 */

if ( !class_exists( 'FooPlugins\PluginBoilerplate\Admin\Init' ) ) {

	class Init {
		use With_Singleton;

		/**
		 * Init constructor.
		 */
		function __construct() {
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
		}

		function enqueue_admin_assets() {
			$admin_asset_path = BASE_PATH . 'assets/admin/admin.asset.php';

			if ( ! file_exists( $admin_asset_path ) ) {
				throw new \Error(
					esc_html__( 'Plugin not initialized! You need to run `npm start` or `npm run build` in the root of the plugin first.', 'foopb' )
				);
			}

			$admin_script_src = BASE_URL . 'assets/admin.js';
			$admin_styles_src  = BASE_URL . '/build/admin.css';
			$script_asset  = include $admin_asset_path;

			// Enqueue block styles
			wp_enqueue_style(
				'foopb-blocks-admin',
				$admin_script_src,
				array(),
				$script_asset["version"]
			);
			// Enqueue block scripts
			wp_enqueue_script(
				'foopb-blocks-admin',
				$admin_styles_src,
				$script_asset["dependencies"],
				$script_asset["version"],
				true // Enqueue the script in the footer.
			);

//			wp_localize_script(
//				PLUGIN_SLUG . '-admin',
//				'WholesomeBoilerplateSettings',
//				$block_settings
//			);
		}
	}
}
