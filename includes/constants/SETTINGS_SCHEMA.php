<?php return array(
    'schema' => array(
        'type' => 'object',
        'properties' => array(
            'version' => array(
                'type' => 'integer',
                'required' => true
            ),
	        'general' => array(
		        'type' => 'object',
		        'required' => true,
		        'properties' => array(
			        'someTextOption' => array(
				        'type' => 'string',
				        'required' => true,
				        'minLength' => 1
			        ),
			        'someToggle' => array(
				        'type' => 'boolean',
			        ),
			        'select' => array(
				        'type' => 'string',
				        'enum' => array( 'red', 'green', 'blue', 'yellow' )
			        ),
			        'range' => array(
				        'type' => 'integer'
			        )
		        )
	        ),
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