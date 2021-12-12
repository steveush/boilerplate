import "./index.scss";

import { Panel, PanelBody } from "@wordpress/components";
import { noop } from "lodash/util";
import classNames from "classnames";
import { useUIState } from "../../index";
import { useInstanceId } from "@wordpress/compose";

function SettingsPanel( {
                            header,
                            className,
                            initialOpen,
                            iconPosition = 'left',
                            fp_ui,
                            fp_components = [],
                            renderComponents = noop,
                            onToggle = noop,
                            ...props
                        } ) {


    // if we're not supplied a fp_ui key then use the instanceId, this is not ideal as if the page structure changes the instanceId may also
    const uiStateKey = useInstanceId( SettingsPanel, 'settings-panel-is-open-', fp_ui );
    const [ isOpen, setIsOpen ] = useUIState( uiStateKey, initialOpen );

    const bodyProps = {
        ...props,
        initialOpen: isOpen,
        onToggle: () => {
            setIsOpen( !isOpen );
            onToggle();
        },
        className: classNames( 'fp-settings-panel__body', 'icon-' + iconPosition, { [ className ]: !header } )
    };

    if ( !header ) {
        return (
            <PanelBody { ...bodyProps }>
                { renderComponents( fp_components ) }
            </PanelBody>
        );
    }
    return (
        <Panel className={ classNames( 'fp-settings-panel', className ) } header={ header }>
            <PanelBody { ...bodyProps }>
                { renderComponents( fp_components ) }
            </PanelBody>
        </Panel>
    );
}

export default SettingsPanel;