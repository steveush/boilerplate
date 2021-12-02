<?php
namespace Boilerplate;

use function Boilerplate\utils\options2enum;

$theme_options = array(
    array(
        'title' => __( 'Modern', TEXT_DOMAIN ),
        'value' => 'modern'
    ),
    array(
        'title' => __( 'Classic', TEXT_DOMAIN ),
        'value' => 'classic'
    ),
    array(
        'title' => __( 'Metro', TEXT_DOMAIN ),
        'value' => 'metro'
    ),
    array(
        'title' => __( 'Flat', TEXT_DOMAIN ),
        'value' => 'flat'
    ),
    array(
        'title' => __( 'Customize', TEXT_DOMAIN ),
        'value' => 'custom'
    )
);

return array(
    'schema' => array(
        'type' => 'object',
        'properties' => array(
            'style' => array(
                'type' => 'object',
                'title' => __( 'Style', TEXT_DOMAIN ),
                'properties' => array(
                    'theme' => array(
                        'type' => 'string',
                        'title' => __( 'Title', TEXT_DOMAIN ),
                        'enum' => options2enum( $theme_options ),
                        'options' => $theme_options
                    )
                )
            ),

        )
    )
);
