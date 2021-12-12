import { createContext, useContext } from "@wordpress/element";
import { useSettings } from "../../hooks";

const noContextError = () => { throw Error( 'No settings context.' ); };
const noContextReject = () => Promise.reject('No settings context.');

/**
 * The default value returned to components when there is no matching provider above it in the tree.
 *
 * WARNING:
 *
 * Calling any actions will result in an error as there is no context!
 */
const defaultValue = [
    /** @type {useSettings~State} */ {
        isLoaded: false,
        hasChanges: false,
        canReset: false
    },
    /** @type {useSettings~Actions} */ {
        getValue: noContextError,
        setValue: noContextError,
        getInitial: noContextError,
        getDefault: noContextError,
        save: noContextReject,
        reset: noContextReject,
        discard: noContextReject,
    }
];
export const SettingsContext = createContext( defaultValue );

/**
 * Convenience method for using the closest SettingsContext.
 *
 * @returns {[ useSettings~State, useSettings~Actions ]}
 */
export function useSettingsContext(){
    return useContext( SettingsContext );
}

// @reason: Avoid documenting Reacts' "children" prop as it should not be set directly.
// noinspection JSCommentMatchesSignature
/**
 * Provides a simple way to manage a single WordPress option that contains multiple values across multiple components.
 *
 * @param {string} optionName - The "option_name" used to "register_settings" on the server.
 * @param {object} defaults - The default values for the settings.
 * @returns {JSX.Element}
 * @constructor
 */
export const SettingsProvider = ({ optionName, defaults, children }) => {

    const settingsApi = useSettings( optionName, defaults );

    return (
        <SettingsContext.Provider value={ settingsApi }>
            { children }
        </SettingsContext.Provider>
    );
};