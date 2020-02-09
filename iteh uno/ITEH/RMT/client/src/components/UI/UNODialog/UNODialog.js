﻿import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import classes from '../UNODialog/UNODialog.css'

export default function AlertDialog() {
  const [open, setOpen] = React.useState(true);

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"UNO"}</DialogTitle>
        <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      <img className={classes.img} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/1200px-UNO_Logo.svg.png" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Awesome
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}