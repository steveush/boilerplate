<?php
namespace FooPlugins\PluginBoilerplate;

use function FooPlugins\PluginBoilerplate\Utils\array_get;
use function FooPlugins\PluginBoilerplate\Utils\array_set;

function migrate_to_version_2( $migration, $defaults ) {
	$value = $migration['value'];

	$actual_version = 0;
	if ( isset( $value['version'] ) ) {
		$actual_version = $value['version'];
	}

	if ( $actual_version < 2 ) {

		$someTextOption_default = array_get( $defaults, 'general.someTextOption' );

		// Make sure someTextOption is set to something.
		$someTextOption = array_get( $value, 'general.someTextOption', $someTextOption_default );
		if ( strlen( $someTextOption ) <= 1 ) {
			if ( array_set( $value, 'general.someTextOption', $someTextOption_default ) ) {
				// Update the version so that this migration does not run again.
				$value['version'] = 2;

				$migration['migrated'] = true;
				$migration['value'] = $value;
			}
		}
	}

	return $migration;
}

return array( __NAMESPACE__ . '\migrate_to_version_2' );
