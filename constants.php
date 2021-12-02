<?php
namespace Boilerplate;

const INC_PATH = DIR_PATH . 'includes/';
const CONST_PATH = INC_PATH . 'constants/';
const ASSET_PATH = DIR_PATH . 'assets/';
const ASSET_URL = DIR_URL . 'assets/';

define( __NAMESPACE__ . '\SETTINGS_DEFAULTS', require_once( CONST_PATH . 'SETTINGS_DEFAULTS.php' ) );
define( __NAMESPACE__ . '\SETTINGS_SCHEMA', require_once( CONST_PATH . 'SETTINGS_SCHEMA.php' ) );