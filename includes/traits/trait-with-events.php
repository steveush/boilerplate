<?php

namespace FooPlugins\PluginBoilerplate\Traits;

/**
 * Adds basic events to a PHP class through the use of the on, off and trigger functions.
 */
trait With_Events {
    /**
     * The internal events array used to hold registered listeners.
     *
     * @var array $events
     */
    private $events = [];

    /**
     * Register a listener for the specified event.
     *
     * @param string    $event          The name of the event to listen for.
     * @param callable  $listener       The function to call when the event is triggered.
     *
     * @return bool     Returns TRUE if the listener was successfully registered.
     */
    public function on( $event, callable $listener ) {
        if ( is_callable( $listener, false, $listener_name ) ) {
            $this->events[ $event ][] = array(
                'key' => $listener_name,
                'listener' => $listener
            );
            return true;
        }
        return false;
    }

    /**
     * Unregister a listener for the specified event.
     *
     * @param string $event             The name of the event to stop listening to.
     * @param callable $listener        The function that was registered for the event.
     *
     * @return bool     Returns TRUE if the listener was removed, NULL if the listener did not exist, or FALSE if the listener could not be removed.
     */
    public function off( $event, callable $listener ){
        if ( is_callable( $listener, false, $listener_name ) ){
            $found_at = -1;
            foreach ( $this->events[ $event ] as $index => $registered ) {
                if ( $listener_name === $registered[ 'name' ] ){
                    $found_at = $index;
                    break;
                }
            }
            if ( $found_at > -1 ){
                array_splice( $this->events, $found_at );
                return true;
            }
        }
        return false;
    }

    /**
     * Trigger an event passing any supplied arguments to the listeners.
     *
     * @param string $event         The name of the event to trigger.
     * @param mixed ...$args        Any number of additional arguments to pass to the event listeners.
     */
    public function trigger( $event, ...$args ) {
        foreach ( $this->events[ $event ] as $registered ) {
            if ( count( $args ) > 0 ) {
                call_user_func_array( $registered[ 'listener' ], $args );
            } else {
                call_user_func( $registered[ 'listener' ] );
            }
        }
    }
}