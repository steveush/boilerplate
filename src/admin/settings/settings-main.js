import "./settings-main.scss";

import { Fragment } from "@wordpress/element";
import { isArray, isString } from "lodash";
import { Spinner } from "@wordpress/components";
import { ErrorBoundary, useSettingsContext } from "../../utils";
import {
    SettingsError,
    SettingsPanel,
    SettingsPanelRow,
    SettingsRadio,
    SettingsTabs,
    SettingsUnknown,
    SettingsText,
    SettingsToggle,
    SettingsSelect,
    SettingsRange
} from "./components";

export default function SettingsMain({ components }){

    const [ { isLoaded } ] = useSettingsContext();

    const hashCode = ( str ) => {
        let hash = 0;
        if (str.length === 0) {
            return hash;
        }
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

    const getUid = ( component ) => {
        return String( hashCode( JSON.stringify( component ) ) );
    };

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

        let key = component?.fp_key;
        if ( !isString( key ) ){
            key = getUid( component );
        }

        // create the props to pass to use for rendering
        const props = {
            ...component,
            key,
            renderComponents
        };

        const renderComponent = () => {
            switch ( component?.fp_type ){
                case "tabs":
                    return <SettingsTabs { ...props } />;
                case 'panel':
                    return <SettingsPanel { ...props } />;
                case 'panel-row':
                    return <SettingsPanelRow { ...props } />;
                case 'radio':
                    return <SettingsRadio { ...props } />;
                case 'text':
                    return <SettingsText { ...props } />;
                case 'toggle':
                    return <SettingsToggle { ...props } />;
                case 'select':
                    return <SettingsSelect { ...props } />;
                case 'range':
                    return <SettingsRange { ...props } />;
                default:
                    return <SettingsUnknown component={ component } />;
            }
        };

        const onError = ( error, errorInfo ) => {
            return (
                <SettingsError
                    component={ component }
                    error={ error }
                    errorInfo={ errorInfo }
                />
            );
        };

        return (
            <ErrorBoundary key={key} onError={ onError }>
                { renderComponent() }
            </ErrorBoundary>
        );
    };

    return (
        <div className="fp-settings-main">
            { !isLoaded ? (
                <div className="fp-settings-main__placeholder">
                    <Spinner />
                </div>
            ) : (
                <Fragment>
                    { renderComponents( components ) }
                </Fragment>
            ) }
        </div>
    );
};