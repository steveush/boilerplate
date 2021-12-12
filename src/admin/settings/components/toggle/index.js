import "./index.scss";

import { ToggleControl } from "@wordpress/components";
import classNames from "classnames";
import { useSettingsContext } from "../../../../utils";
import {noop} from "lodash/util";

export default function SettingsToggle( {
                            className,
                            fp_key,
                            renderComponents = noop,
                            initialChecked = false,
                            ...props
                        } ) {

    const [ { isLoaded }, { getValue, setValue } ] = useSettingsContext();

    if ( !isLoaded ) return null;

    return (
        <ToggleControl
            { ...props }
            className={ classNames( 'fp-settings-toggle', className ) }
            checked={ ( getValue( fp_key ) || initialChecked ) }
            onChange={ ( value ) => setValue( fp_key, value ) }
        />
    );
}