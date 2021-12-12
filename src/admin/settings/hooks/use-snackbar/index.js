import {
    useDispatch,
    useSelect,
} from '@wordpress/data';
import { store as noticesStore } from "@wordpress/notices";
import { SnackbarList } from "@wordpress/components";
import classNames from "classnames";

/**
 * React hook to use snackbar notifications from the `@wordpress/notices` package.
 *
 * @returns {snackbar}
 *
 * @see {@link https://github.com/WordPress/gutenberg/tree/trunk/packages/notices|GitHub - @wordpress/notices}
 * @see {@link https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/data/data-core-notices.md|Reference Guides - Data Core Notices}
 */
export function useSnackbar() {
    const notices = useSelect(
        ( select ) =>
            select( noticesStore )
                .getNotices()
                .filter( ( notice ) => notice.type === 'snackbar' ),
        []
    );

    // see https://github.com/WordPress/gutenberg/blob/trunk/packages/notices/src/store/actions.js
    const {
        createNotice,
        createInfoNotice,
        createErrorNotice,
        createSuccessNotice,
        createWarningNotice,
        removeNotice
    } = useDispatch( noticesStore );

    const createOptions = ( options ) => Object.assign( { isDismissible: true }, options, { type: "snackbar" } );

    return /** @type {snackbar} */ {
        actions: {
            createSnackbar: ( status, content, options ) => createNotice( status, content, createOptions( options ) ),
            createInfoSnackbar: ( content, options ) => createInfoNotice( content, createOptions( options ) ),
            createErrorSnackbar: ( content, options ) => createErrorNotice( content, createOptions( options ) ),
            createSuccessSnackbar: ( content, options ) => createSuccessNotice( content, createOptions( options ) ),
            createWarningSnackbar: ( content, options ) => createWarningNotice( content, createOptions( options ) ),
            removeSnackbar: ( id ) => removeNotice( id ),
            clearSnackbars: () => notices.map( ( notice ) => removeNotice( notice.id ) )
        },
        UIComponent: ( { className } ) => (
            <SnackbarList
                className={ classNames( "edit-site-notices", "fp-snackbar", className ) }
                notices={ notices }
                onRemove={ removeNotice }
            />
        )
    };
}

//region Type Definitions

/**
 * The object returned when calling the `useSnackbar` hook.
 *
 * @typedef {object} snackbar
 *
 * @property {object}                                       actions - An object containing the actions for snackbars.
 * @property {function(string=,string,object=):object}      actions.createSnackbar - Returns an action object used in signalling that a snackbar notice is to be created.
 * @property {function(string,object=):object}              actions.createInfoSnackbar - Returns an action object used in signalling that a snackbar info notice is to be created.
 * @property {function(string,object=):object}              actions.createErrorSnackbar - Returns an action object used in signalling that a snackbar error notice is to be created.
 * @property {function(string,object=):object}              actions.createSuccessSnackbar - Returns an action object used in signalling that a snackbar success notice is to be created.
 * @property {function(string,object=):object}              actions.createWarningSnackbar - Returns an action object used in signalling that a snackbar warning notice is to be created.
 * @property {function(string):object}                      actions.removeSnackbar - Returns an action object used in signalling that a notice is to be removed.
 * @property {function():object[]}                          actions.clearSnackbars - Returns an array of action objects used in signalling that all notices are to be removed.
 *
 * @property {function(...props):JSX.Element} UIComponent - A component that accepts only a `className` prop and renders all snackbars notices.
 *
 * @see {@link https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/data/data-core-notices.md|Reference Guides - Data Core Notices}
 */

//endregion