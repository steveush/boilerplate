# PHP Requirements - `useSettings`

Before the `useSettings` hook can be used in the JavaScript, the setting must be registered on the WordPress PHP side.

```php
// ...some_plugin_file.php

// The slug for the plugin
const PLUGIN_SLUG = 'my_plugin';

// The name of the option to register for the plugin.
const PLUGIN_OPTION_NAME = 'plugin_settings';

// The default values for our plugin settings.
const PLUGIN_SETTINGS_DEFAULTS = array(
    'option1' => true,
    'child' => array(
        'option2' => 'small' // accepts 'small', 'medium' and 'large'
    )
);

// The schema to supply to the `register_setting` function to enable it to show in the Rest API.
// @see https://developer.wordpress.org/rest-api/extending-the-rest-api/schema/
const PLUGIN_SETTINGS_SCHEMA = array(
    'schema' => array(
        'type' => 'object',
        'properties' => array(
            'option1' => array(
                'type' => 'boolean'
            )
            'child' => array(
                'type' => 'object',
                'properties' => array(
                    'option2' => array(
                        'type' => 'string',
                        'required' => true,
                        'enum' => array( 'small', 'medium', 'large' )
                    )
                )
            )
        )
    )
);

// The callback that actual registers our settings.
function plugin_register_setting(){
    register_setting( PLUGIN_SLUG, PLUGIN_OPTION_NAME, [
        'default' => PLUGIN_DEFAULTS,
        'show_in_rest' => PLUGIN_SETTINGS_SCHEMA,
        'type' => 'object'
    ] );
}
// Make sure to hook into both the 'admin_init' and 'rest_api_init' to register our setting.
add_action( 'admin_init', array( 'plugin_register_setting' ) );
add_action( 'rest_api_init', array( 'plugin_register_setting' ) );
```

When the asset files are enqueued that make use of the hook we also need to output the `PLUGIN_OPTION_NAME` and the `PLUGIN_DEFAULTS`. These values are then passed as parameters to the hook.

```php
// ...some_plugin_file.php

function plugin_enqueue_assets(){
    // The handle the assets will be registered with.
    $handle = 'plugin_assets';
    
    // Code that enqueues the assets that use the `useSetting` hook.
    wp_enqueue_script( $handle, /* ...params */ );
    
    // Enqueue the option name and defaults to be output into a global
    // variable on the front end called 'PLUGIN_ASSETS'.
    wp_localize_script(
        $handle,
        'PLUGIN_ASSETS',
        array(
            'optionName' => PLUGIN_OPTION_NAME,
            'defaults' => PLUGIN_DEFAULTS
        )
    );
}
```

Now on the front end we can access these values in our JavaScript by using the global variable `PLUGIN_ASSETS`.

```js
const { optionName, defaults } = global.PLUGIN_ASSETS;
```