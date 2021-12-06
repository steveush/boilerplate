<?php
/**
 * Contains the Global constants used throughout the plugin
 */

namespace FooPlugins\PluginBoilerplate;

//define some essentials constants
const SLUG = 'foopb';
const VERSION  = '0.0.1';
define( __NAMESPACE__ . '\UID', str_replace( '-', '_', SLUG ) );
define( __NAMESPACE__ . '\BASE_PATH', plugin_dir_path( FOOPB_FILE ) );
define( __NAMESPACE__ . '\BASE_URL', plugin_dir_url( FOOPB_FILE ) );
