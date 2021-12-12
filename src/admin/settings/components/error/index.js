import "./index.scss";

import { Icon } from "@wordpress/components";
import { has as hasProperty, isObject } from "lodash";

export default function SettingsError( { error, errorInfo, component } ){
    let componentOutput = null;
    if ( isObject( component ) ){
        const json = JSON.stringify( component, null, '\t' );
        componentOutput = <pre className="fp-settings-error__component">{ json }</pre>;
    }
    let componentStackOutput = null;
    if ( isObject( errorInfo ) && hasProperty( errorInfo, 'componentStack' ) ){
        componentStackOutput = <pre className="fp-settings-error__react-stack">{ errorInfo.componentStack }</pre>;
    }
    return (
        <div className="fp-settings-error">
            <div className="fp-settings-error__title"><Icon icon="flag" />An unexpected error occurred!</div>
            { componentOutput }
            <pre className="fp-settings-error__stack">{ error.stack }</pre>
            { componentStackOutput }
        </div>
    );
};