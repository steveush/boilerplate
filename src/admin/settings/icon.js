import { useEffect, useRef } from "@wordpress/element";
import { startsWith } from "lodash";
import { Icon } from "@wordpress/components";

function SettingsIcon( {
                           icon = "admin-plugins"
                       } ) {
    // const spanRef = useRef();
    // if ( startsWith( icon, '<svg ' ) ) {
    //     useEffect( () => {
    //         spanRef.current.innerHTML = icon;
    //     }, [ icon ] );
    //     return ( <span className="settings__icon" ref={ spanRef }/> );
    // }
    return (
        <span className="settings__icon">
            <Icon icon={ icon }/>
        </span>
    );
}

export default SettingsIcon;