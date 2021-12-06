<?php

namespace Boilerplate\traits;

use Boilerplate\Settings;

trait WithSettings {
    public function get_option( $key ){
        return Settings::getInstance()->get( $key );
    }

    public function set_option( $key, $value ){
        return Settings::getInstance()->set( $key, $value );
    }
}
Settings::getInstance();