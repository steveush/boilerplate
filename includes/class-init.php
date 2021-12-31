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

			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_block_editor_assets' ) );

			add_action( 'init', array( $this, 'register_meta' ) );
		}

		/**
		 * Enqueue Block Editor Assets
		 *
		 * - block-editor.js: scripts for the block editor.
		 * - block-editor.scss: styles for the block editor only.
		 * - localize the script with custom settings.
		 *
		 * @return void
		 */
		function enqueue_block_editor_assets() {

			$path = BASE_PATH . 'assets/blocks/core';
			$url = BASE_URL . 'assets/blocks/core';
			$asset = require_once( $path . '.asset.php' );

			// Enqueue styles
			wp_enqueue_style(
				SLUG . '-block-editor',
				$url . '.css',
				[ 'dashicons', 'wp-components' ],
				$asset["version"]
			);

			// Enqueue scripts
			wp_enqueue_script(
				SLUG . '-block-editor',
				$url . '.js',
				$asset["dependencies"],
				$asset["version"],
				true // Enqueue the script in the footer.
			);
		}

		function register_meta() {
			$meta_key = '_' . SLUG . '_post_meta_boolean';

			// Get all public post types.
			$post_types = get_post_types( array( 'public' => true ), 'names' );

			// Register meta for all public post types.
			foreach ( $post_types as $post_type ) {
				register_post_meta(
					$post_type,
					$meta_key,
					array(
						'auth_callback' => function() { //A function or method to call when performing edit_post_meta, add_post_meta, and delete_post_meta capability checks.
							return current_user_can( 'edit_posts' );
						},
						'show_in_rest'  => true, // Whether data associated with this meta key can be considered public and should be accessible via the REST API
						'single'        => true, // Whether the meta key has one value per object, or an array of values per object.
						'type'          => 'boolean', //Valid values are 'string', 'boolean', 'integer', 'number', 'array', and 'object'.
						//'sanitize_callback' => '' // A function or method to call when sanitizing $meta_key data.
					)
				);
			}
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
