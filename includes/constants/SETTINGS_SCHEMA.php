<?php return array(
    'schema' => array(
        'type' => 'object',
        'properties' => array(
            'style' => array(
                'type' => 'object',
                'properties' => array(
                    'theme' => array(
                        'type' => 'string',
                        'enum' => array( 'modern', 'classic', 'metro', 'flat', 'custom' )
                    )
                )
            )
        )
    )
);