<?php

namespace FooPlugins\PluginBoilerplate\Traits;

use FooPlugins\PluginBoilerplate\Settings;

trait With_Settings {
    public function get_option( $key ){
        return Settings::get_instance()->get( $key );
    }

    public function set_option( $key, $value ){
        return Settings::get_instance()->set( $key, $value );
    }
}
