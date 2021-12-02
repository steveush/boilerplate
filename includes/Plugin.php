<?php

namespace Boilerplate;

use Boilerplate\traits\WithSingleton;

/**
 * Contains the core logic for the plugin and initializes the flow of code.
 *
 * @implements WithSingleton<Plugin>
 */
class Plugin {
    use WithSingleton;

    public $settings;

    public function __construct() {
        $this->settings = Settings::getInstance();
    }

    public $text = 'This is some text';
}