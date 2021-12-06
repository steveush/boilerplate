<?php /** @noinspection PhpIncludeInspection */
/*
Plugin Name: FooPlugins Boilerplate
Description: WordPress boilerplate plugin
Version:     0.0.1
Author:      FooPlugins
Plugin URI:  https://fooplugins.com
Author URI:  https://fooplugins.com
Text Domain: FOOPB
License:     GPL-2.0+
Domain Path: /languages

@fs_premium_only /pro/

*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'FOOPB_FILE', __FILE__ );
define( 'FOOPB_DIR', plugin_dir_path( __FILE__ ) );

//include other essential constants
require_once( FOOPB_DIR . 'includes/constants.php' );

//include common global functions
require_once( FOOPB_DIR . 'includes/functions.php' );

//include freemius logic
//require_once( FOOPB_DIR . 'includes/freemius.php' );

// Check minimum requirements before loading the plugin
if ( require_once FOOPB_DIR . 'includes/startup-checks.php' ) {

	// Start the autoloader.
	require_once( FOOPB_DIR . 'vendor/autoload.php' );

	// Register our custom autoloader.
	spl_autoload_register( 'FooPlugins\PluginBoilerplate\autoloader' );

	// Hook in activation.
	//register_activation_hook( __FILE__, array( 'FooPlugins\FOOPB\Activation', 'activate' ) );

	// Start the plugin!
	FooPlugins\PluginBoilerplate\Init::get_instance();
}