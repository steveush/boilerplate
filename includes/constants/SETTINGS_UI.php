<?php namespace Boilerplate;

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
    'title' => __( 'Boilerplate Settings', TEXT_DOMAIN ),
    'description' => __( 'Configure the global defaults for the various plugin options.', TEXT_DOMAIN ),
    'settings' => array(

    )
);
