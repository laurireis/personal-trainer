import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import Snackbar from '@mui/material/Snackbar';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import CSVExporter from "./CSVExporter";

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [selection, setSelection] = useState({});

    useEffect(() => fetchCustomers(), []);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            body: JSON.stringify(customer),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => fetchCustomers())
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchCustomers())
            .catch(err => console.error(err))
            setSnackMessage('Customer deleted');
            handleClick();
        }   
    }

    const editCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            body: JSON.stringify(customer),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => fetchCustomers())
        .catch(err => console.error(err))
    }

    const saveTraining = (training) => {
        console.log(training);
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            body: JSON.stringify(training),
            headers: { 'Content-type': 'application/json' }
          })
          .then(res => {
            setSnackMessage("Training added");
            setOpen(true);
          })
          .catch(err => console.error(err))
      }

    const fullName = (params) => {
        return params.data.firstname + ' ' + params.data.lastname;
    }

    const fullAddress = (params) => {
        return params.data.city + ', ' + params.data.postcode + ', ' + params.data.streetaddress;
    }

    const sizeToFit = () => {
        gridOptions.api.sizeColumnsToFit();
      }

    const columns = [
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
            headerName: 'Address',
            field: 'address',
            valueGetter: fullAddress,
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true
        },
        {
            headerName: 'Email',
            field: 'email',
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true
        },
        {
            headerName: 'Phone number',
            field: 'phone',
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true
        },
        {
            headerName: '',
            width: 70,
            valueGetter: (params) => params.data.links[0].href,
            cellRenderer: params =>
                <EditCustomer customer={params.data} url={params.value} editCustomer={editCustomer} />
        },
        {
            headerName: '',
            field: 'link',
            width: 70,
            valueGetter: (params) => params.data.links[0].href,
            cellRenderer: params =>
                <IconButton color="secondary" onClick={() => deleteCustomer(params.value)}>
                    <DeleteIcon />
                </IconButton>

        }
    ]

    const gridOptions = {
        columnDefs: columns,
        animateRows: true,
        rowSelection: 'single',
        onGridReady: _ => sizeToFit(),
        onRowClicked: event => setSelection(event.data)
    }

    return (
        <div>
            <CSVExporter customers={customers} />
            <AddCustomer saveCustomer={saveCustomer} />
            <AddTraining
                url={selection.links?.[0].href}
                name={selection.firstname + ' ' + selection.lastname}
                saveTraining={saveTraining}
            />
            <div
                className='ag-theme-material'
                style={{
                    height: '900px',
                    width: 'auto',
                    margin: 'auto'}}
            >
                <AgGridReact
                    rowData={customers}
                    gridOptions={gridOptions}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={snackMessage}
                action={deleteCustomer}
            />
        </div>
    );
}