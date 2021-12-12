import "./index.scss";

import { Icon } from "@wordpress/components";

export default function SettingsError( { component, error, errorInfo } ){
    const json = JSON.stringify( component, null, '\t' );
    return (
        <div className="fp-settings-error">
            <div className="fp-settings-error__title"><Icon icon="flag" />An error occurred rendering a component!</div>
            <pre className="fp-settings-error__component">{ json }</pre>
            <pre className="fp-settings-error__stack">{ error.stack }</pre>
            <pre className="fp-settings-error__react-stack">{ errorInfo.componentStack }</pre>
        </div>
    );
};