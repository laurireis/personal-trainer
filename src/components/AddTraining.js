import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '', duration: 0, activity: '', customer: ''
      });

      const handleClickOpen = () => {
        if (!props.url) {
          alert('Select a customer first');
          return;
        }
        setTraining({
          ...training,
          customer: props.url,
          date: moment().format('yyyy-MM-DDTHH:mm')
        });
        setOpen(true);
      }

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        props.saveTraining(training);
        handleClose();
    }

    return (
        <div>
            <Button style={{ margin: '10px 10px 0px 10px' }} variant='outlined' color='primary' onClick={handleClickOpen}>Add Training</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New training for {props.name}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        name='date'
                        type='datetime-local'
                        value={training.date}
                        onChange={e => handleInputChange(e)}
                        label='Date'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='duration'
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label='Duration'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='activity'
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label='Activity'
                        fullWidth
                        variant='standard'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}