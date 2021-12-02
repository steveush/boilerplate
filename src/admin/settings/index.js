import "./index.scss";

import { Icon } from '@wordpress/components';
import {
    Fragment,
    render,
    Component,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * @typedef {object} BOILERPLATE_SETTINGS
 * @property {string} handle
 * @property {string} textDomain
 */

const CONFIG = global.BOILERPLATE_SETTINGS;

class Settings extends Component {
    constructor() {
        super( ...arguments );
    }

    render() {
        return (
            <Fragment>
                <div className={ CONFIG.handle + "__header" }>
                    <div className={ CONFIG.handle + "__container" }>
                        <div className={ CONFIG.handle + "__title" }>
                            <h1>{ __( 'Boilerplate Settings', CONFIG.textDomain ) } <Icon icon="admin-plugins" /></h1>
                        </div>
                    </div>
                </div>
                <div className={ CONFIG.handle + "__main" }>

                </div>
            </Fragment>
        )
    }
}

document.addEventListener( 'DOMContentLoaded', () => {
    const htmlOutput = document.getElementById( CONFIG.handle );

    if ( htmlOutput ) {
        render(
            <Settings />,
            htmlOutput
        );
    }
});