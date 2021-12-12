import "./index.scss";

import { render } from "@wordpress/element";

import { createLocalState } from "./utils";
import { useSnackbar } from "./hooks/use-snackbar";
import { ErrorBoundary, SettingsProvider } from "../../utils";

import SettingsHeader from "./settings-header";
import SettingsMain from "./settings-main";
import SettingsActions from "./settings-actions";
import SettingsError from "./components/error";

const CONFIG = global.FOOPB_SETTINGS;

export const SETTINGS_CONFIG = global.FOOPB_SETTINGS;

export const [
    useUIState,
    clearUIState
] = createLocalState( SETTINGS_CONFIG.uid );

function SettingsContainer(){
    const { UIComponent: SnackbarUI } = useSnackbar();

    const onError = ( error ) => {
        return (<SettingsError error={ error } />);
    };

    return (
        <SettingsProvider
            optionName={ SETTINGS_CONFIG.optionName }
            defaults={ SETTINGS_CONFIG.defaults }
            onDidCatch={ onError }
        >
            <SettingsHeader
                icon={ SETTINGS_CONFIG?.icon }
                version={ SETTINGS_CONFIG.version }
                title={ SETTINGS_CONFIG.title }
                description={ SETTINGS_CONFIG.description }
            />
            <SettingsMain components={ SETTINGS_CONFIG.fp_components } />
            <SettingsActions/>
            <div className="settings__notices">
                <SnackbarUI/>
            </div>
        </SettingsProvider>
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
            <SettingsContainer />,
            htmlOutput
        );
    }
});