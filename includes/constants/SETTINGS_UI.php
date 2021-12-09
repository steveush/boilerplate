<?php return array(
    'title' => __( 'Boilerplate Settings', 'foobp' ),
    'description' => __( 'Configure the global defaults for the various plugin options.', 'foobp' ),
    'fp_components' => array(
        array(
            'fp_type' => 'tabs',
            'tabs' => array(
                array(
                    'fp_ui' => 'settings-active-tab',
                    'name' => 'settings',
                    'title' => __( 'Settings', 'foobp' ),
                    'fp_components' => array(
                        array(
                            'fp_ui' => 'general-panel-is-open',
                            'fp_type' => 'panel',
                            'title' => __( 'General', 'foobp' ),
                            'icon' => 'admin-generic',
                            'initialOpen' => false,
                            'fp_components' => array()
                        ),
                        array(
                            'fp_ui' => 'appearance-panel-is-open',
                            'fp_type' => 'panel',
                            'title' => __( 'Appearance', 'foobp' ),
                            'icon' => 'admin-appearance',
                            'initialOpen' => false,
                            'fp_components' => array(
                                array(
                                    'fp_type' => 'panel-row',
                                    'fp_components' => array(
                                        array(
                                            'fp_key' => 'style.theme',
                                            'fp_type' => 'radio',
                                            'label' => __( 'Theme', 'foobp' ),
                                            'help' => __( 'The general theme for the lightbox.', 'foopb' ),
                                            'orientation' => 'horizontal',
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
                        ),
                    )
                ),
                array(
                    'name' => 'advanced',
                    'title' => __( 'Advanced', 'foobp' ),
                    'fp_components' => array(
                        array(
                            'fp_type' => 'panel',
                            'title' => __( 'Something', 'foobp' ),
                            'icon' => 'admin-generic',
                            'initialOpen' => false,
                            'fp_components' => array(
                                array(
                                    'fp_type' => 'panel-row',
                                    'fp_components' => array(
                                        array(
                                            'fp_key' => 'advanced.someOption',
                                            'fp_type' => 'radio',
                                            'label' => __( 'Some Option', 'foobp' ),
                                            'help' => __( 'Testing states across tabs/panels.', 'foopb' ),
                                            'orientation' => 'horizontal',
                                            'options' => array(
                                                array(
                                                    'label' => __( 'One', 'foobp' ),
                                                    'value' => 'one'
                                                ),
                                                array(
                                                    'label' => __( 'Two', 'foobp' ),
                                                    'value' => 'two'
                                                ),
                                                array(
                                                    'label' => __( 'Three', 'foobp' ),
                                                    'value' => 'three'
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                    )
                ),
            )
        )
    )
);
