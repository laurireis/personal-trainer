import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchCustomers(), []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
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
                    rowData={customers}
                    gridOptions={gridOptions}
                />
            </div>
        </div>
    );
}