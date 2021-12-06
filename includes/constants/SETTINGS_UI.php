<?php return array(
    'title' => __( 'Boilerplate Settings', 'foobp' ),
    'description' => __( 'Configure the global defaults for the various plugin options.', 'foobp' ),
    'tabs' => array(
        array(
            'type' => 'tab',
            'name' => 'style',
            'title' => __( 'Style', 'foobp' ),
            'children' => array(
                array(
                    'type' => 'radio',
                    'name' => 'style.theme',
                    'label' => __( 'Theme', 'foobp' ),
                    'options' => array(
                        array(
                            'label' => __( 'Modern', 'foobp' ),
                            'value' => 'modern'
                        ),
                        array(
                            'label' => __( 'Classic', 'foobp' ),
                            'value' => 'classic'
                        ),
                        array(
                            'label' => __( 'Metro', 'foobp' ),
                            'value' => 'metro'
                        ),
                        array(
                            'label' => __( 'Flat', 'foobp' ),
                            'value' => 'flat'
                        ),
                        array(
                            'label' => __( 'Customize', 'foobp' ),
                            'value' => 'custom'
                        )
                    )
                )
            )
        )
    )
);
