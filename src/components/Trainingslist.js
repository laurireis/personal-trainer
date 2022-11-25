import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import moment from 'moment';
import 'moment-timezone';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

export default function Trainingslist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => fetchTrainings(), []);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining  = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {method: 'DELETE'})
            .then(res => fetchTrainings())
            .catch(err => console.error(err))
            handleClick();
        }
    }

    const dateFormatter = (params) => {
        return moment(params.value).utcOffset('-0000').format('DD/MM/YYYY HH:mm');
    }

    const fullName = (params) => {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }

    const sizeToFit = () => {
        gridOptions.api.sizeColumnsToFit();
      }

    const columns = [
        {
            headerName: 'Date',
            field: 'date',
            sortable: true,
            filter: true,
            floatingFilter: true,
            valueFormatter: dateFormatter,
            resizable: true
        },
        {
            headerName: 'Duration (min)',
            field: 'duration',
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true
        },
        {
            headerName: 'Activity',
            field: 'activity',
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true
        },
        {
            headerName: 'Customer',
            field: 'customer',
            valueGetter: fullName,
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true
        },
        {
            headerName: '',
            field: 'id',
            width: 70,
            cellRenderer: params =>
                <IconButton color="secondary" onClick={() => deleteTraining(params.value)}>
                    <DeleteIcon />
                </IconButton>

        }
    ]

    const gridOptions = {
        columnDefs: columns,
        animateRows: true,
        onGridReady: _ => sizeToFit()
    }

    return (
        <div>
            <div
                className='ag-theme-material'
                style={{
                    height: '900px',
                    width: 'auto',
                    margin: 'auto'}}
            >
                <AgGridReact
                    rowData={trainings}
                    gridOptions={gridOptions}
                />
            </div>  
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message='Training deleted'
                action={deleteTraining}
            />
        </div>
    );
}