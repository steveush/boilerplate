import "./index.scss";

import { SelectControl } from "@wordpress/components";
import classNames from "classnames";
import { useSettingsContext } from "../../../../utils";
import {noop} from "lodash/util";

export default function SettingsSelect( {
                            className,
                            fp_key,
                            renderComponents = noop,
                            ...props
                        } ) {

    const [ { isLoaded }, { getValue, setValue } ] = useSettingsContext();

    if ( !isLoaded ) return null;

    return (
        <SelectControl
            { ...props }
            className={ classNames( 'fp-settings-select', className ) }
            value={ ( getValue( fp_key ) || '') }
            onChange={ ( value ) => setValue( fp_key, value ) }
        />
    );
}