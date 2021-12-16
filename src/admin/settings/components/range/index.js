import "./index.scss";

import { RangeControl } from "@wordpress/components";
import classNames from "classnames";
import { useSettingsContext } from "../../../../utils";
import {noop} from "lodash/util";

export default function SettingsRange( {
                            className,
                            fp_key,
                            renderComponents = noop,
                            ...props
                        } ) {

    const [ { isLoaded }, { getValue, setValue } ] = useSettingsContext();

    if ( !isLoaded ) return null;

    return (
        <RangeControl
            { ...props }
            className={ classNames( 'fp-settings-range', className ) }
            value={ ( getValue( fp_key ) || '') }
            onChange={ ( value ) => setValue( fp_key, value ) }
        />
    );
}