<?php
namespace Boilerplate;

spl_autoload_register(__NAMESPACE__ . '\boilerplate_autoloader');

function boilerplate_autoloader($class) {
    $namespace = __NAMESPACE__;

    if (strpos($class, $namespace) !== 0) {
        return;
    }

    $class = str_replace($namespace, '', $class);
    $class = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';

    $path = DIR_PATH . 'includes' . DIRECTORY_SEPARATOR . $class;

    if (file_exists($path)) {
        require_once($path);
    }
}