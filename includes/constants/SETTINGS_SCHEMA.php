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
            ),
            'advanced' => array(
                'type' => 'object',
                'properties' => array(
                    'someOption' => array(
                        'type' => 'string',
                        'required' => true,
                        'enum' => array( 'one', 'two', 'three' )
                    )
                )
            )
        )
    )
);