<?php
/**
 * Contains the Global constants used throughout the plugin
 */

namespace FooPlugins\PluginBoilerplate;

//define some essentials constants
const SLUG = 'foopb';
const VERSION  = '0.0.2';
define( __NAMESPACE__ . '\UID', str_replace( '-', '_', SLUG ) );
define( __NAMESPACE__ . '\BASE_PATH', plugin_dir_path( FOOPB_FILE ) );
define( __NAMESPACE__ . '\BASE_URL', plugin_dir_url( FOOPB_FILE ) );

const OPTION_VERSION = SLUG . '_version';
const OPTION_MIGRATION_ERROR = SLUG . '_migration_error';

const HOOK_ACTION_UPDATED = SLUG . '_updated';
