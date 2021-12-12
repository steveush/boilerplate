import "./index.scss";

import { RadioControl } from "@wordpress/components";
import classNames from "classnames";
import { useSettingsContext } from "../../../../utils";
import {noop} from "lodash/util";

export default function SettingsRadio( {
                            className,
                            orientation = "horizontal",
                            fp_key,
                            renderComponents = noop,
                            ...props
                        } ) {

    const [ { isLoaded }, { getValue, setValue } ] = useSettingsContext();

    if ( !isLoaded ) return null;

    return (
        <RadioControl
            { ...props }
            className={ classNames( 'fp-settings-radio', className, orientation ) }
            selected={ getValue( fp_key ) }
            onChange={ ( value ) => setValue( fp_key, value ) }
        />
    );
}