import { useEffect, useState } from "@wordpress/element";
import { cloneDeep, get as getProperty, has as hasProperty, isEqual, set as setProperty } from "lodash";

// the NPM package @wordpress/api is no longer available so wp-api has been manually included in the scripts dependencies
const { api } = wp;

/**
 * React hook that wraps working with the WP Backbone API settings in our plugins.
 *
 * NOTE:
 *
 * Our settings are stored as an object within a single registered WP option.
 * This hook provides a simple interface to work with this extra layer of abstraction.
 *
 * @param {string} optionName - The "option_name" used to "register_setting" on the server.
 * @param {object} defaults - The "default" used to "register_setting" on the server.
 * @returns {[ useSettings~State, useSettings~Actions ]} Array containing the state and actions.
 */
export default function useSettings( optionName, defaults ){

    const [ currentOptions, setCurrentOptions ] = useState( null );
    const [ persistedOptions, setPersistedOptions ] = useState( null );

    const [ isLoaded, setIsLoaded ] = useState( false );
    const [ hasChanges, setHasChanges ] = useState( false );
    const [ canReset, setCanReset ] = useState( false );

    // sync up the canReset and currentOptions values whenever the defaults or persistedOptions change
    useEffect( () => {
        if ( persistedOptions !== null ){
            setCanReset( !isEqual( defaults, persistedOptions ) );
            setCurrentOptions( cloneDeep( persistedOptions ) );
        }
    }, [ defaults, persistedOptions ] );

    // sync up the hasChanges value whenever the persistedOptions or currentOptions change
    useEffect( () => {
        // only sync up the state if both the persistedOptions and currentOptions have values
        if ( persistedOptions !== null && currentOptions !== null ){
            setHasChanges( !isEqual( persistedOptions, currentOptions ) );
        }
    }, [ persistedOptions, currentOptions ] );

    // whenever the optionName changes fetch the setting from the WP Api and set the isLoaded and persistedOptions values
    useEffect( () => {
        api.loadPromise.then( () => {
            const settings = new api.models.Settings();
            settings.fetch().then( ( response ) => {
                if ( hasProperty( response, optionName ) ){
                    setPersistedOptions( cloneDeep( response[ optionName ] ) );
                    setIsLoaded( true );
                }
                throw new Error( `SettingsError: No '${optionName}' option in response.` );
            } );
        } );
    }, [ optionName ] );

    /**
     * Persists the supplied options to the server, returns a Promise that is resolved with a reference to the persisted object.
     *
     * WARNING:
     *
     * This method creates a deepClone of the supplied options before persisting them to avoid reference issues with React renders.
     * The options object supplied as a parameter IS NOT the object the promise is resolved with.
     *
     * @private
     * @param {object} options
     * @returns {Promise<object>}
     */
    const persist = ( options ) => {
        return new Promise( ( resolve, reject ) => {
            const nextOptions = cloneDeep( options );
            const settings = new api.models.Settings( {
                [ optionName ]: nextOptions
            } );
            settings.save( null, {
                success: () => {
                    setPersistedOptions( nextOptions );
                    resolve( nextOptions );
                },
                error: ( model, response ) => reject( response )
            } );
        } );
    };

    const getDefault = ( path ) => getProperty( defaults, path );

    const getInitial = ( path ) => getProperty( persistedOptions, path );

    const getValue = ( path ) => getProperty( currentOptions, path, getDefault( path ) );

    const setValue = ( path, value ) => {
        const current = getValue( path );
        if ( !isEqual( current, value ) ){
            setCurrentOptions( ( prevOptions ) => {
                // spread the next value into a new object or else react see's it as the same ref and does not re-render
                const nextOptions = { ...prevOptions };
                setProperty( nextOptions, path, value );
                return nextOptions;
            } );
            return true;
        }
        return false;
    };

    const setToDefault = ( path ) => setValue( path, getDefault( path ) );
    const setToInitial = ( path ) => setValue( path, getInitial( path ) );

    const save = () => {
        return hasChanges ? persist( currentOptions ) : Promise.resolve( currentOptions );
    };

    const reset = () => {
        return canReset ? persist( defaults ) : Promise.resolve( currentOptions );
    };

    const discard = () => {
        if ( !hasChanges ) return false;
        const options = cloneDeep( persistedOptions );
        setCurrentOptions( options );
        return true;
    };

    return [
        /** @type {useSettings~State} */ {
            isLoaded,
            hasChanges,
            canReset
        },
        /** @type {useSettings~Actions} */ {
            getValue,
            setValue,
            getInitial,
            setToInitial,
            getDefault,
            setToDefault,
            save,
            reset,
            discard
        }
    ];
}

//region Type Definitions

/**
 * @typedef {object} useSettings~State
 * @property {boolean} [isLoaded=false] - Whether or not the WP Api is currently loading the settings.
 * @property {boolean} [hasChanges=false] - Whether or not the current options have any changes compared to the last saved state.
 * @property {boolean} [canReset=false] - Whether or not the current options can be reset back to the defaults.
 */

/**
 * @typedef {object} useSettings~Actions
 * @property {function(string):*} getValue - Get the current value for the option path. i.e. The value in memory.
 * @property {function(string, *):boolean} setValue - Set the current value for the option path. i.e. The value in memory.
 * @property {function(string):*} getDefault - Get the default value for the option path.
 * @property {function(string):boolean} setToDefault - Set the current value for the option path back to its default. i.e. Set the value in memory back to default.
 * @property {function(string):*} getInitial - Get the initial value for the option path. i.e. The persisted value.
 * @property {function(string):boolean} setToInitial - Set the current value for the option path back to its last saved value. i.e. Set the value in memory back to the persisted value.
 * @property {function():Promise<object>} save - Saves any changes to the server.
 * @property {function():Promise<object>} reset - Resets all options to the defaults and saves them back to the server.
 * @property {function():boolean} discard - Discards all changes made to the options and resets them back to the last saved state.
 */

//endregion