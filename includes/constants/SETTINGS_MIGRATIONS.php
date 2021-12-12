<?php
namespace FooPlugins\PluginBoilerplate;

use function FooPlugins\PluginBoilerplate\Utils\array_get;
use function FooPlugins\PluginBoilerplate\Utils\array_set;

function migrate_to_version_2( $options, $defaults ) {
	$actual_version = 0;
	if ( isset( $options['version'] ) ) {
		$actual_version = $options['version'];
	}

	if ( $actual_version < 2 ) {

		$someTextOption_default = array_get( $defaults, 'general.someTextOption' );

		// Make sure someTextOption is set to something.
		$someTextOption = array_get( $options, 'general.someTextOption', $someTextOption_default );
		if ( strlen( $someTextOption ) <= 1 ) {
			if ( array_set( $options, 'general.someTextOption', $someTextOption_default ) ) {
				// Update the version so that this migration does not run again.
				$options['version'] = 2;
			}
		}
	}

	return $options;
}

return array( __NAMESPACE__ . '\migrate_to_version_2' );
