<?php return array(
    'schema' => array(
        'type' => 'object',
        'properties' => array(
	        'general' => array(
		        'type' => 'object',
		        'required' => true,
		        'properties' => array(
			        'someTextOption' => array(
				        'type' => 'string',
				        'required' => true,
				        'minLength' => 1
			        )
		        )
	        ),
            'style' => array(
                'type' => 'object',
                'properties' => array(
                    'theme' => array(
                        'type' => 'string',
                        'enum' => array( 'modern', 'classic', 'metro', 'flat' )
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