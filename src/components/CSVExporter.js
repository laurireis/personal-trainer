import { CSVLink } from 'react-csv';
import Button from '@mui/material/Button';

export default function CSVExporter(props) {
    const headers = [
        {label: 'firstname', key: 'firstname'},
        {label: 'lastname', key: 'lastname'},
        {label: 'email', key: 'email'},
        {label: 'phone', key: 'phone'},
        {label: 'streetaddress', key: 'streetaddress'},
        {label: 'postcode', key: 'postcode'},
        {label: 'city', key: 'city'},
    ]

    return (
        <div>
            <CSVLink
                data={props.customers}
                headers={headers}
                filename={'customers.csv'}
                target='_blank'
            >
                <Button style={{ margin: '10px 10px 0px 10px' }} variant='outlined'>Download .CSV</Button>
            </CSVLink>
        </div>
    );
}