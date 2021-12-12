import "./settings-main.scss";

import { Fragment } from "@wordpress/element";
import { isArray } from "lodash";
import { Spinner } from "@wordpress/components";
import { ErrorBoundary, useSettingsContext } from "../../utils";
import {
    SettingsError,
    SettingsPanel,
    SettingsPanelRow,
    SettingsRadio,
    SettingsTabs,
    SettingsUnknown,
    SettingsText
} from "./components";

export default function SettingsMain({ components }){

    const [ { isLoaded } ] = useSettingsContext();

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
            <ErrorBoundary onError={ onError }>
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