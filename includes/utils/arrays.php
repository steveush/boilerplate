<?php
namespace FooPlugins\PluginBoilerplate\Utils;

/**
 * Parses the supplied key into a multi-dimensional array property containing both its key and path values.
 *
 * @param string|int $key   The key to parse.
 *
 * @returns array|false
 */
function array_property( $key ){
    if ( is_string( $key ) ){
        // to handle array syntax like "array[0].prop" replace square brackets that contain only numbers
        // with a period followed by the number, e.g.: "array[3].prop" -> "array.3.prop"
        $key = preg_replace( '/\[(\d+)]/', '.$1', $key );
        // now that we have a normalized name explode it to get the path segments
        $path = explode( ".",  strval( $key ) );
        // if explode returns false set a path containing just the name
        if ( $path === false ){
            $path = array( $key );
        }
    } else {
        $path = array( $key );
    }

    if ( is_array( $path ) ){
        // path segments could be integers or strings so convert them accordingly
        foreach ( $path as $index => $segment ){
            if ( is_string( $segment ) && is_numeric( $segment ) ){
                $path[ $index ] = intval( $segment );
            }
        }

        // the last value in the path will be the key
        $result_key = array_pop( $path );
        if ( is_string( $result_key ) || is_int( $result_key ) ){
            return array(
                'key' => $result_key,
                'path' => $path
            );
        }
    }
    return false;
}

/**
 * Gets a reference to a child array using the supplied root array and path.
 *
 * @param array         $root          The root array to interrogate.
 * @param array         $path          An array containing the individual path segments to retrieve.
 * @param bool          $create        If set to true the path will be created if it does not exist.
 *
 * @return array|false
 */
function &array_path( &$root, $path, $create = false ){
    $target = &$root;
    if ( is_array( $path ) ){
        foreach ( $path as $segment ){
            if ( array_key_exists( $segment, $target ) ){
                $target = &$target[ $segment ];
            } else if ( $create ) {
                $target[ $segment ] = array();
                $target = &$target[ $segment ];
            } else {
                // required to set a variable as its ref returned.
                $default = false;
                return $default;
            }
        }
    }
    return $target;
}

/**
 * Get a property value from a multi-dimensional array using the supplied key.
 *
 * @param array $fromArray      The array to get the property from.
 * @param string|int $key       The key to return the value for. This can use "array" or "dot" notation e.g. "root.childList[0].childProperty"
 * @param mixed|null $default   The default value if none exists.
 * @return mixed|null
 */
function &array_get( &$fromArray, $key, $default = null ){
    $property = array_property( $key );
    if ( $property !== false ){
        $path = &array_path( $fromArray, $property[ 'path' ] );
        if ( $path !== false && array_key_exists( $property[ 'key' ], $path ) ){
            return $path[ $property[ 'key' ] ];
        }
    }
    return $default;
}

/**
 * Set a property value on a multi-dimensional array using the supplied key and value.
 *
 * @param array $toArray    The array to set the property on.
 * @param string|int $key   The key to set the value for. This can use "array" or "dot" notation e.g. "root.childList[0].childProperty"
 * @param mixed $value      The value to set for the property.
 * @return bool|null        Returns TRUE if the value was set, NULL if the current and supplied values were the same, or FALSE if the value was not set.
 */
function array_set( &$toArray, $key, $value ){
    $property = array_property( $key );
    if ( $property !== false ) {
        $path = &array_path( $toArray, $property[ 'path' ], true );
        if ( $path !== false ){
            if ( !array_key_exists( $property[ 'key' ], $path ) || $value !== $path[ $property[ 'key' ] ] ){
                $path[ $property[ 'key' ] ] = $value;
                return true;
            }
            return null;
        }
    }
    return false;
}
