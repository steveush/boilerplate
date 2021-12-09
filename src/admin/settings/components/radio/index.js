import "./index.scss";

import { RadioControl } from "@wordpress/components";
import classNames from "classnames";
import { noop } from "lodash/util";

function SettingsRadio( {
                            className,
                            orientation = "horizontal",
                            fp_key,
                            fp_get = noop,
                            fp_set = noop,
                            ...props
                        } ) {
    return (
        <RadioControl
            { ...props }
            className={ classNames( 'fp-settings-radio', className, orientation ) }
            selected={ fp_get( fp_key ) }
            onChange={ ( value ) => fp_set( fp_key, value ) }
        />
    );
}

export default SettingsRadio;