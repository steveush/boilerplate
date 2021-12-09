/**
 * The default options for how localStorage is used.
 * @type {{mode: string}}
 */
import { isEmpty, isObject, isString, get, set } from "lodash";
import { useEffect, useState } from "@wordpress/element";

const defaultOptions = {
    mode: 'immediate' // immediate writes changes to the localStorage as they happen
};

/**
 * @param {string} key - The key used to store the state in localStorage.
 * @param {localStateOptions} [options] - The options used to create the hook.
 * @returns {[ useLocalState, clearLocalState ]}
 */
export function createLocalState( key, options = defaultOptions ){

    const { mode } = { ...defaultOptions, ...options };

    const readStorage = () => {
        const data = localStorage.getItem( key );
        return isString( data ) ? JSON.parse( data ) : {};
    };

    const writeStorage = ( data ) => {
        if ( isObject( data ) && !isEmpty( data ) ){
            localStorage.setItem( key, JSON.stringify( data ) );
        } else {
            localStorage.removeItem( key );
        }
    };

    let stored = readStorage();

    const useLocalState = ( key, initial ) => {

        // if there's no key then just useState
        if ( ! isString( key ) ){
            return useState( initial );
        }

        const [ localState, setLocalState ] = useState( get( stored, key, initial ) );
        // when ever the state changes, update the stored value
        useEffect( () => {
            set( stored, key, localState );
            if ( mode === 'immediate' ){
                writeStorage( stored );
            }
        }, [ localState ] );
        return [
            localState,
            setLocalState
        ];
    };

    const clearLocalState = () => {
        localStorage.removeItem( key );
    };

    return [
        useLocalState,
        clearLocalState
    ];
}

//region Type Definitions

/**
 * The options for creating a new local state hook.
 *
 * @typedef {object} localStateOptions
 * @property {("immediate"|"beforeunload")} [mode="immediate"] - Configures when changes to the local state are persisted to localStorage.
 */

/**
 * A hook that wraps localStorage and the useState hook to make persisting values a bit simpler.
 *
 * @callback useLocalState
 * @template T
 * @param {string} key - The key used to persist this state in local storage.
 * @param {( T | lazyInitialState )} [initialState] - The initial value to set for the state.
 * @returns {[ T, setLocalState ]} Returns an array containing the current state and its setState callback.
 */

/**
 * If the initial state is the result of an expensive computation, you may provide a function instead,
 * which will be executed only on the initial render.
 *
 * @callback lazyInitialState
 * @template T
 * @returns {T} Returns the initial state.
 */

/**
 * Sets the state and persists its value to localStorage.
 *
 * @callback setLocalState
 * @template T
 * @param {(T|functionalUpdate)} nextState - The next state value.
 */

/**
 * If the new state is computed using the previous state, you can pass a function to setLocalState.
 * The function will receive the previous value, and return an updated value.
 *
 * @callback functionalUpdate
 * @template T
 * @param {T} prevState - The previous state value.
 * @returns {T} Returns the updated value.
 */

/**
 * Clear all stored local state.
 *
 * @callback clearLocalState
 */

//endregion