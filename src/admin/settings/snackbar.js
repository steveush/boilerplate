import {
    useDispatch,
    useSelect,
} from '@wordpress/data';
import { store as noticesStore } from "@wordpress/notices";
import { SnackbarList } from "@wordpress/components";

export function useSnackbar(){
    const notices = useSelect(
        ( select ) =>
            select( noticesStore )
                .getNotices()
                .filter( ( notice ) => notice.type === 'snackbar' ),
        []
    );
    const {
        createNotice,
        createInfoNotice,
        createErrorNotice,
        createSuccessNotice,
        createWarningNotice,
        removeNotice
    } = useDispatch( noticesStore );

    const createOptions = ( options ) => Object.assign( { isDismissible: true }, options, { type: "snackbar" } );

    return [
        {
            create: ( message, options ) => createNotice( message, createOptions( options ) ),
            info: ( message, options ) => createInfoNotice( message, createOptions( options ) ),
            error: ( message, options ) => createErrorNotice( message, createOptions( options ) ),
            success: ( message, options ) => createSuccessNotice( message, createOptions( options ) ),
            warning: ( message, options ) => createWarningNotice( message, createOptions( options ) ),
            remove: ( id ) => removeNotice( id )
        },
        () => (
            <SnackbarList
                className="edit-site-notices"
                notices={ notices }
                onRemove={ removeNotice }
            />
        )
    ];
}