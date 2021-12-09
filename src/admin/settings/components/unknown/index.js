import "./index.scss";

import { Icon } from "@wordpress/components";

function SettingsUnknown( { component } ){
    const json = JSON.stringify( component, null, '\t' );
    return (
        <div className="fp-settings-unknown">
            <div className="fp-settings-unknown__title"><Icon icon="flag" /> An unknown component has been registered.</div>
            <pre className="fp-settings-unknown__component">{ json }</pre>
        </div>
    );
}

export default SettingsUnknown;