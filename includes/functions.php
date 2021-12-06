<?php
namespace FooPlugins\PluginBoilerplate;

/**
 * Contains all the Global common functions used throughout the plugin
 */


/**
 * Custom Autoloader used throughout the plugin
 *
 * @param $class
 */
function autoloader( $class ) {
	/* Only autoload classes from this namespace */
	if ( false === strpos( $class, __NAMESPACE__ ) ) {
		return;
	}

	/* Remove namespace from class name */
	$class_file = str_replace( __NAMESPACE__ . '\\', '', $class );

	/* Convert sub-namespaces into directories */
	$class_path = explode( '\\', $class_file );
	$class_file = array_pop( $class_path );
	$class_path = strtolower( implode( '/', $class_path ) );

	/* Convert class name format to file name format */
	$class_file = uncamelize( $class_file );
	$class_file = str_replace( '_', '-', $class_file );
	$class_file = str_replace( '--', '-', $class_file );

	// Check for traits.
	if ( substr( $class_file,0,5) === 'with-' ) {

		require_once BASE_PATH . '/includes/' . $class_path . '/trait-' . $class_file . '.php';

	} else {

		// We are dealing with a class.
		require_once BASE_PATH . '/includes/' . $class_path . '/class-' . $class_file . '.php';
	}
}

/**
 * Convert a CamelCase string to camel_case
 *
 * @param $str
 *
 * @return string
 */
function uncamelize( $str ) {
	$str    = lcfirst( $str );
	$lc     = strtolower( $str );
	$result = '';
	$length = strlen( $str );
	for ( $i = 0; $i < $length; $i ++ ) {
		$result .= ( $str[ $i ] == $lc[ $i ] ? '' : '_' ) . $lc[ $i ];
	}

	return $result;
}
