import { PanelRow } from "@wordpress/components";
import { noop } from "lodash/util";
import classNames from "classnames";

function SettingsPanelRow( {
                               className,
                               fp_components = [],
                               fp_render = noop,
                               ...props
                           } ) {
    return (
        <PanelRow className={ classNames( 'fp-settings-panel-row', className ) }>
            { fp_render( fp_components ) }
        </PanelRow>
    );
}

export default SettingsPanelRow;