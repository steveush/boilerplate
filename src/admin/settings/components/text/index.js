import "./index.scss";

import { TextControl } from "@wordpress/components";
import classNames from "classnames";
import { useSettingsContext } from "../../../../utils";

export default function SettingsText( {
                            className,
                            fp_key,
                            ...props
                        } ) {

    const [ { isLoaded }, { getValue, setValue } ] = useSettingsContext();

    if ( !isLoaded ) return null;

    return (
        <TextControl
            { ...props }
            className={ classNames( 'fp-settings-text', className ) }
            value={ getValue( fp_key ) }
            onChange={ ( value ) => setValue( fp_key, value ) }
        />
    );
}