<?php namespace Boilerplate\utils;

/**
 * Takes an array of objects containing a 'value' property and returns those values in an array.
 *
 * @param array $options The array of options to get an enum for.
 *
 * @return array
 */
function options2enum( $options ){
    return array_reduce( $options, function( $result, $option ){
        if ( isset( $option[ 'value' ] ) ){
            $result[] = $option[ 'value' ];
        }
        return $result;
    }, array() );
}
