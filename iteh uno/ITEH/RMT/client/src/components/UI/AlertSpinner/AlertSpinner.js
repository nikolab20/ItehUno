import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearQuery from '../LinearQuery/LinearQuery';

export default function AlertDialog() {
    const [open, setOpen] = React.useState(true);

    function handleClose() {
        setOpen(false);
    }

    return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Waiting for opponent"}</DialogTitle>
                <DialogContent>

                        <LinearQuery />

                </DialogContent>
            </Dialog>
    );
}