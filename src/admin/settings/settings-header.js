import "./settings-header.scss";

import { useEffect, useRef } from "@wordpress/element";
import { startsWith } from "lodash";
import { Icon } from "@wordpress/components";

export default function SettingsHeader( {
                                            icon = "admin-plugins",
                                            title,
                                            description,
                                            version
                                        } ) {

    const spanRef = useRef();
    useEffect( () => {
        if ( startsWith( icon, '<svg ' ) ) {
            spanRef.current.innerHTML = icon;
        }
    }, [ icon ] );

    const isNamed = !startsWith( icon, '<svg ' );

    return (
        <div className="fp-settings-header">
            <div className="fp-settings-header__inner">
                <div className="fp-settings-header__title">
                    <h1>
                        <span className="fp-settings-header__icon" ref={ spanRef }>
                            { isNamed ? (<Icon icon={ icon }/>) : null }
                        </span>
                        { title }
                    </h1>
                    <span className="fp-settings-header__version">{ version }</span>
                </div>
                <small className="fp-settings-header__description">{ description }</small>
            </div>
        </div>
    );
}