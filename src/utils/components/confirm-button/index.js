import "./index.scss";

import { noop } from "lodash";
import { Button, Modal } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import classNames from "classnames";
import { Fragment, useState } from "@wordpress/element";

function ConfirmButton( {
                            className,
                            children,
                            dialogTitle,
                            dialogMessage = __( 'Are you sure?', 'foopb' ),
                            showCancel = true,
                            cancelText = __( 'Cancel', 'foopb' ),
                            confirmText = __( 'Yes', 'foopb' ),
                            onClick = noop,
                            onConfirmClick = noop,
                            ...props
                        } ) {

    const [ isOpen, setOpen ] = useState( false );
    const openModal = () => setOpen( true );
    const closeModal = () => setOpen( false );

    const onConfirm = () => {
        onConfirmClick();
        closeModal();
    };

    const onInternalClick = () => {
        onClick();
        openModal();
    };

    return (
        <Fragment>
            <Button
                className={ classNames( 'fp-confirm-button', className ) }
                onClick={ onInternalClick }
                { ...props }
            >
                { children }
            </Button>
            { isOpen && (
                <Modal
                    className="fp-confirm-button__modal"
                    title={ dialogTitle }
                    onRequestClose={ closeModal }
                >
                    <p className="fp-confirm-button__modal-message">{ dialogMessage }</p>
                    <div className="fp-confirm-button__modal-actions">
                        <Button
                            isPrimary
                            onClick={ onConfirm }
                        >
                            { confirmText }
                        </Button>
                        { showCancel ? (
                            <Button
                                isSecondary
                                onClick={ closeModal }
                            >
                                { cancelText }
                            </Button>
                        ) : null }
                    </div>
                </Modal>
            ) }
        </Fragment>
    );
}

export default ConfirmButton;