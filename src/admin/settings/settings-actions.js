import "./settings-actions.scss";

import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { ConfirmButton, useSettingsContext } from "../../utils";
import { useSnackbar } from "./hooks/use-snackbar";

export default function SettingsActions({ children }){

    const [ { hasChanges, canReset, isLoaded }, { save, reset, discard } ] = useSettingsContext();
    const { actions: { createSuccessSnackbar, createErrorSnackbar } } = useSnackbar();

    // If settings are still being loaded, then render nothing.
    if ( !isLoaded ) return null;

    const onDiscardClicked = () => {
        if ( discard() ){
            createSuccessSnackbar( __( "Discard successful...", "foobp" ) );
        } else {
            createErrorSnackbar( __( "Discard failed!", "foobp" ) );
        }
    };

    const onSaveClicked = () => {
        save()
            .then( ()=> createSuccessSnackbar( __( "Save successful...", "foobp" ) ) )
            .catch( ( reason ) => {
                console.error( reason.responseJSON );
                createErrorSnackbar( __( "Save failed!", "foobp" ) );
            } );
    };

    const onResetClicked = () => {
        reset()
            .then( ()=> createSuccessSnackbar( __( "Reset successful...", "foobp" ) ) )
            .catch( ( reason ) => {
                console.error( reason.responseJSON );
                createErrorSnackbar( __( "Reset failed!", "foobp" ) );
            } );
    };

    return (
        <div className="settings__actions">
            <Button
                disabled={ !hasChanges }
                isLarge
                isPrimary
                onClick={ () => onSaveClicked() }
            >
                { __( 'Save changes', 'foopb' ) }
            </Button>
            <Button
                disabled={ !hasChanges }
                isLarge
                isSecondary
                onClick={ () => onDiscardClicked() }
            >
                { __( 'Discard changes', 'foopb' ) }
            </Button>
            <ConfirmButton
                disabled={ !canReset }
                isLarge
                isDestructive
                dialogTitle={ __( 'Confirm reset', 'foopb' ) }
                dialogMessage={ __( 'Are you sure you want to reset all options back to their defaults?', 'foopb' ) }
                onConfirmClick={ () => onResetClicked() }
            >
                { __( 'Reset to defaults', 'foopb' ) }
            </ConfirmButton>
            { children }
        </div>
    );
};