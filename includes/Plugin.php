<?php

namespace Boilerplate;

use Boilerplate\traits\WithSettings;
use Boilerplate\traits\WithSingleton;

/**
 * Contains the core logic for the plugin and initializes the flow of code.
 *
 * @implements WithSingleton<Plugin>
 */
class Plugin {
    use WithSingleton, WithSettings;

    public function __construct() {
        add_action( 'init', array( $this, 'init' ) );
    }

    public function init(){

        $theme = $this->get_option( "style.theme" );

        $this->set_option( "style.theme", "flat" );

        $t = '';

    }
}