import "./index.scss";

import { noop } from "lodash";
import { TabPanel } from "@wordpress/components";
import classNames from "classnames";
import { useInstanceId } from "@wordpress/compose";
import { useUIState } from "../../index";

function SettingsTabs( {
                           className,
                           tabs = [],
                           initialTabName,
                           fp_ui,
                           fp_render = noop,
                           onSelect = noop,
                           ...props
                       } ) {

    // if we're not supplied a fp_ui key then use the instanceId, this is not ideal as if the page structure changes the instanceId may also
    const uiStateKey = useInstanceId( SettingsTabs, 'settings-tabs-active-', fp_ui );
    const [ activeTab, setActiveTab ] = useUIState( uiStateKey, initialTabName );

    return (
        <TabPanel
            initialTabName={ activeTab }
            className={ classNames( 'fp-settings-tabs', className ) }
            tabs={ tabs }
            onSelect={ ( tabName ) => {
                setActiveTab( tabName );
                onSelect( tabName );
            } }
            { ...props }
        >
            { ( tab ) => fp_render( tab?.fp_components ) }
        </TabPanel>
    );
}

export default SettingsTabs;