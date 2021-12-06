import "./index.scss";

import { Icon, Placeholder, Spinner } from '@wordpress/components';
import {
    Fragment,
    render,
    Component,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { select, subscribe } from '@wordpress/data';

const { api } = wp;

/**
 * @typedef {object} BOILERPLATE_SETTINGS
 * @property {string} uid
 * @property {string} slug
 * @property {string} optionName
 * @property {string} textDomain
 */

const CONFIG = global.BOILERPLATE_SETTINGS;

class Settings extends Component {
    constructor() {
        super( ...arguments );
        this.state = {
            options: {},
            isAPILoaded: false
        };
    }

    componentDidMount(){
        subscribe( () => {
            const { options } = this.state;

            const isSavingPost = select('core/editor').isSavingPost();
            const isAutosavingPost = select('core/editor').isAutosavingPost();

            if ( isAutosavingPost ) {
                return;
            }

            if ( ! isSavingPost ) {
                return;
            }

            const settings = new api.models.Settings( {
                [ CONFIG.optionName ]: options,
            } );
            settings.save();
        });

        api.loadPromise.then( () => {
            this.settings = new api.models.Settings();

            const { isAPILoaded } = this.state;

            if ( isAPILoaded === false ) {
                this.settings.fetch().then( ( response ) => {
                    this.setState( {
                        options: response[ CONFIG.optionName ],
                        isAPILoaded: true
                    } );
                } );
            }
        } );
    }

    render() {
        const { options, isAPILoaded } = this.state;

        if ( ! isAPILoaded ) {
            return (
                <Placeholder>
                    <Spinner />
                </Placeholder>
            );
        }

        console.log( 'OPTIONS_LOADED', options );

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
        );
    }
}

document.addEventListener( 'DOMContentLoaded', () => {
    const htmlOutput = document.getElementById( CONFIG.uid );

    if ( htmlOutput ) {
        render(
            <Settings />,
            htmlOutput
        );
    }
});