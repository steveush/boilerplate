import "./index.scss";

import { __ } from '@wordpress/i18n';
import { Button, Icon, Placeholder, Spinner, TabPanel } from '@wordpress/components';
import {
    Fragment,
    render,
    Component,
} from '@wordpress/element';
import { isArray, get as obj_get, set as obj_set } from "lodash";
import FooRadio from "./radio";

const { api } = wp;

/**
 * @typedef {object} UIElement
 * @property {string} name
 * @property {string} type
 * @property {string} title
 * @property {string} description
 * @property {string} help
 * @property {*} default
 * @property {UIElement[]} children
 */

/**
 * @typedef {object} FOOPB_SETTINGS
 * @property {string} uid
 * @property {string} slug
 * @property {string} optionName
 * @property {UIElement[]} tabs
 */

const CONFIG = global.FOOPB_SETTINGS;

import { SnackbarList } from '@wordpress/components';

import {
    dispatch,
    useDispatch,
    useSelect,
} from '@wordpress/data';

import { store as noticesStore } from '@wordpress/notices';

const Notices = () => {
    const notices = useSelect(
        ( select ) =>
            select( noticesStore )
                .getNotices()
                .filter( ( notice ) => notice.type === 'snackbar' ),
        []
    );
    const { removeNotice } = useDispatch( noticesStore );
    return (
        <SnackbarList
            className="edit-site-notices"
            notices={ notices }
            onRemove={ removeNotice }
        />
    );
};

class Settings extends Component {
    constructor() {
        super( ...arguments );
        this.state = {
            options: {},
            isAPILoaded: false
        };
    }

    componentDidMount(){
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

        return (
            <Fragment>
                <div className={ CONFIG.uid + "__header" }>
                    <div className={ CONFIG.uid + "__container" }>
                        <div className={ CONFIG.uid + "__title" }>
                            <h1>{ CONFIG.title } <Icon icon="admin-plugins" /></h1>
                            <small>{ CONFIG.description }</small>
                        </div>
                    </div>
                </div>
                <div className={ CONFIG.uid + "__main" }>
                    <TabPanel tabs={ CONFIG.tabs }>
                        { ( tab ) => {
                            return this.renderUIElement( tab, options );
                        } }
                    </TabPanel>
                    <Button
                        isPrimary
                        isLarge
                        onClick={ () => this.onSave() }
                    >
                        { __( 'Save', 'foopb' ) }
                    </Button>
                </div>
                <div className={ CONFIG.uid + "__notices" }>
                    <Notices/>
                </div>
            </Fragment>
        );
    }

    onOptionChange( name, value ){
        console.log( 'settings_changed', name, value );
        const { options } = this.state;
        obj_set( options, name, value );
        this.setState({ options });
    }

    onSave(){
        const { options } = this.state;
        const settings = new api.models.Settings( {
            [ CONFIG.optionName ]: options
        } );
        settings.save();
        dispatch('core/notices').createNotice(
            'success',
            __( 'Settings Saved', 'foopb' ),
            {
                type: 'snackbar',
                isDismissible: true,
            }
        );
    }

    renderUIElement( element, options ){
        switch ( element?.type ){
            case 'tab':
                return (
                    <Fragment>
                        { this.renderUIElementChildren( element?.children, options ) }
                    </Fragment>
                );
            case 'radio':
                return (
                    <FooRadio
                        { ...element }
                        selected={ obj_get( options, element?.name ) }
                        onChange={ ( value ) => {
                            this.onOptionChange( element?.name, value );
                        } }
                    />
                );
            default:
                return;
        }
    }

    renderUIElementChildren( children, options ){
        if ( !isArray( children ) || children.length === 0 ){
            return;
        }
        return (
            <Fragment>
                { children.map( ( element ) => this.renderUIElement( element, options ) ) }
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