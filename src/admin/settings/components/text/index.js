import "./index.scss";

import { TextControl } from "@wordpress/components";
import classNames from "classnames";
import { useSettingsContext } from "../../../../utils";
import {noop} from "lodash/util";

export default function SettingsText( {
                            className,
                            fp_key,
                            renderComponents = noop,
                            ...props
                        } ) {

    const [ { isLoaded }, { getValue, setValue } ] = useSettingsContext();

    if ( !isLoaded ) return null;

    return (
        <TextControl
            { ...props }
            className={ classNames( 'fp-settings-text', className ) }
            value={ ( getValue( fp_key ) || '') }
            onChange={ ( value ) => setValue( fp_key, value ) }
        />
    );
}