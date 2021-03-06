import { PanelRow } from "@wordpress/components";
import { noop } from "lodash/util";
import classNames from "classnames";

export default function SettingsPanelRow( {
                               className,
                               fp_components = [],
                               renderComponents = noop,
                               ...props
                           } ) {
    return (
        <PanelRow className={ classNames( 'fp-settings-panel-row', className ) } { ...props }>
            { renderComponents( fp_components ) }
        </PanelRow>
    );
}