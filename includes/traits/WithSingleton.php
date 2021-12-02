<?php
namespace Boilerplate\traits;

/**
 * Implements a Singleton pattern and exposes a single `getInstance` method to retrieve the current instance.
 *
 * @template T
 */
trait WithSingleton {

    /**
     * The internal instance variable.
     * @var T
     */
    private static $__instance;

    /**
     * Gets the current instance of the class or creates it if one does not exist.
     * @return T
     */
    public static function getInstance()
    {
        if ( is_null( self::$__instance ) ){
            self::$__instance = new self();
        }
        return self::$__instance;
    }

}