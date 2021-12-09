import "./index.scss";

import { useState, useEffect, Fragment, render } from "@wordpress/element";
import {
    get as getProperty,
    isArray,
    isEqual,
    set as setProperty,
    has as hasProperty,
    cloneDeep
} from "lodash";
import { SettingsPanel, SettingsPanelRow, SettingsRadio, SettingsTabs } from "./components";
import SettingsIcon from "./icon";
import { Button, Spinner } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useSnackbar } from "./snackbar";
import SettingsUnknown from "./components/unknown";
import SettingsCatchError from "./components/catch-error";
import { ConfirmButton } from "../../components/";

// the NPM package @wordpress/api is no longer available so wp-api has been manually included in the scripts dependencies
const { api } = wp;

const CONFIG = global.FOOPB_SETTINGS;

import { createLocalState } from "./utils";
export const [
    useUIState,
    clearUIState
] = createLocalState( CONFIG.uid );

function Settings(){
    // setup our states
    const [ isLoaded, setIsLoaded ] = useState( false );
    const [ isError, setIsError ] = useState( false );
    const [ options, setOptions ] = useState( null );
    const [ persisted, setPersisted ] = useState( null );
    const [ disableSave, setDisableSave ] = useState( true );
    const [ disableReset, setDisableReset ] = useState( true );
    const [ snackbar, SnackbarUI ] = useSnackbar();

    // sync up the disableReset and options states whenever the persisted state changes
    useEffect( () => {
        if ( persisted !== undefined ){
            setDisableReset( isEqual( CONFIG.defaults, persisted ) );
            setOptions( cloneDeep( persisted ) );
        }
    }, [ persisted ] );

    // sync up the disableSave state whenever the persisted or options states change
    useEffect( () => {
        // only sync up the state if both the persisted and options have there states
        if ( persisted !== undefined && options !== null ){
            setDisableSave( isEqual( persisted, options ) );
        }
    }, [ persisted, options ] );

    // once the api is loaded set the isLoaded and persisted states
    useEffect( () => {
        if ( isLoaded === false && isError === false ) {
            api.loadPromise.then( () => {
                const settings = new api.models.Settings();
                settings.fetch().then( ( response ) => {
                    if ( hasProperty( response, CONFIG.optionName ) ){
                        setPersisted( cloneDeep( response[ CONFIG.optionName ] ) );
                        setIsLoaded( true );
                    } else {
                        console.error( 'WP API LoadError', `No '${CONFIG.optionName}' option in response.` );
                        setIsError( true );
                    }
                } );
            }, ( reason ) => {
                console.error( 'WP API LoadError', reason );
                setIsError( true );
            } );
        }
    }, [ isLoaded, isError ] );

    // create utility getter/setter functions to pass to child components
    const fp_default = ( path ) => getProperty( CONFIG.defaults, path );
    const fp_initial = ( path ) => getProperty( persisted, path );
    const fp_get = ( path ) => getProperty( options, path );
    const fp_set = ( path, value ) => {
        const current = fp_get( path );
        if ( !isEqual( current, value ) ){
            setOptions( ( prevState ) => {
                const nextState = { ...prevState };
                setProperty( nextState, path, value );
                // spread the result into a new object or else react see's it as the same ref and does not re-render
                return nextState;
            } );
        }
    };
    // let components render there own child components
    const fp_render = ( components ) => renderComponents( components );

    /**
     * Recursively renders the supplied component configurations and is passed down as a prop to each so
     * they can render there own child components.
     *
     * @param {ComponentConfiguration[]|ComponentConfiguration} components
     *
     * @return {WPElement}
     */
    const renderComponents = ( components ) => {
        // if we're supplied an array of components then loop through them and render each one
        if ( isArray( components ) ){
            return (
                <Fragment>
                    { components.map( ( component ) => renderComponents( component ) ) }
                </Fragment>
            );
        }

        // we're actually dealing with a single component
        const component = components;

        // create the props to pass to use for rendering
        const props = {
            ...component,
            fp_render,
            fp_get,
            fp_set,
            fp_default,
            fp_initial
        };

        const getComponent = () => {
            switch ( component?.fp_type ){
                case "tabs":
                    return <SettingsTabs { ...props } />;
                case 'panel':
                    return <SettingsPanel { ...props } />;
                case 'panel-row':
                    return <SettingsPanelRow { ...props } />;
                case 'radio':
                    return <SettingsRadio { ...props } />;
                default:
                    return <SettingsUnknown component={ component } />;
            }
        };

        return (
            <SettingsCatchError component={ component }>
                { getComponent() }
            </SettingsCatchError>
        );
    };

    const onSaveClicked = () => {
        const settings = new api.models.Settings( {
            [ CONFIG.optionName ]: options
        } );
        settings.save( null, {
            success: () => {
                snackbar.success( __( "Save successful...", "foobp" ) );
                setPersisted( cloneDeep( options ) );
            },
            error: () => snackbar.error( __( "Save failed!", "foobp" ) )
        } );
    };

    const onResetClicked = () => {
        // create a new object so we don't pass by ref and end up modify the actual defaults in state
        const settings = new api.models.Settings( {
            [ CONFIG.optionName ]: CONFIG.defaults
        } );
        settings.save( null, {
            success: () => {
                snackbar.success( __( "Reset successful...", "foobp" ) );
                setPersisted( cloneDeep( CONFIG.defaults ) );
            },
            error: () => snackbar.error( __( "Reset failed!", "foobp" ) )
        } );
    };

    return (
        <Fragment>
            <div className="settings__header">
                <div className="settings__container">
                    <div className="settings__title">
                        <h1><SettingsIcon icon={ CONFIG?.icon }/>{ CONFIG.title }</h1>
                        <span className="settings__version">{ CONFIG.version }</span>
                    </div>
                    <small className="settings__description">{ CONFIG.description }</small>
                </div>
            </div>
            <div className="settings__main">
                { !isLoaded ? (
                    <div className="settings-placeholder">
                        <Spinner />
                    </div>
                ) : (
                    <Fragment>
                        { renderComponents( CONFIG?.fp_components ) }
                        <div className="settings__actions">
                            <Button
                                disabled={ disableSave }
                                isPrimary
                                onClick={ () => onSaveClicked() }
                            >
                                { __( 'Save', 'foopb' ) }
                            </Button>
                            <ConfirmButton
                                disabled={ disableReset }
                                isDestructive
                                onConfirmClick={ () => onResetClicked() }
                            >
                                { __( 'Reset', 'foopb' ) }
                            </ConfirmButton>
                        </div>
                    </Fragment>
                ) }
            </div>
            <div className="settings__notices">
                <SnackbarUI/>
            </div>
        </Fragment>
    );
}

//region Type Definitions

/**
 * @typedef {object} FOOPB_SETTINGS
 * @property {string} version
 * @property {string} uid
 * @property {string} slug
 * @property {string} optionName
 * @property {object} defaults
 * @property {ComponentConfiguration[]} fp_components
 */

/**
 * @typedef {object} ComponentConfiguration
 * @property {string} fp_type
 * @property {string} [fp_key]
 * @property {ComponentConfiguration[]} [fp_components]
 */

//endregion

document.addEventListener( 'DOMContentLoaded', () => {
    const htmlOutput = document.getElementById( CONFIG.uid );

    if ( htmlOutput ) {
        render(
            <Settings />,
            htmlOutput
        );
    }
});