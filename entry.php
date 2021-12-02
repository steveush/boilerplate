<?php
/**
 * reason: IDE cannot resolve the path of the includes as they use the CONST DIR_PATH value which is only set at runtime.
 * @noinspection PhpIncludeInspection
 */

namespace Boilerplate;
/**
 * Plugin Name: Boilerplate
 * Description: Empty boilerplate for a WordPress plugin.
 * Author: John Doe
 * Author URI: https://example.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: boilerplate
 * Domain Path: /languages/
 *
 * @package boilerplate
 */

// Exit if accessed directly.
if ( ! defined( '\ABSPATH' ) ) {
    exit;
}

// Exit if it already exists
if ( defined( __NAMESPACE__ . '\DIR_PATH' ) ){
    exit;
}

function require_dir( $path ){
    foreach (glob("{$path}/*.php") as $filename) {
        require_once $filename;
    }
}

const UID = 'boilerplate';
const SLUG = 'boilerplate';
const VERSION = '1.0.0';
const TEXT_DOMAIN = 'boilerplate';

define( __NAMESPACE__ . '\DIR_PATH', plugin_dir_path( __FILE__ ) );
define( __NAMESPACE__ . '\DIR_URL', plugin_dir_url( __FILE__ ) );

require_dir( DIR_PATH . 'includes/utils' );

require_once( DIR_PATH . 'constants.php' );

require_once( DIR_PATH . 'autoloader.php' );

$instance = Plugin::getInstance();

$text = $instance->text;
