import React, { useState } from 'react';
import { Tabs, Tab, AppBar } from '@mui/material';

import Customerlist from './Customerlist';
import Traininglist from './Trainingslist';
import Calendar from './CalendarPage';
import Statistics from './Statistics';

export default function Menu() {

    const [current, setCurrent] = useState('customers');

    return (
        <div>
            <AppBar position='static' sx={{ bgcolor: '#82ca9d' }}>
                <Tabs value={current} onChange={(_,value) => setCurrent(value)}>
                    <Tab value='customers' label='Customers' />
                    <Tab value='trainings' label='Trainings' />
                    <Tab value='calendar' label='Calendar' />
                    <Tab value='statistics' label='Statistics' />
                </Tabs>
            </AppBar>
            {current === 'customers' && <Customerlist />}
            {current === 'trainings' && <Traininglist />}
            {current === 'calendar' && <Calendar />}
            {current === 'statistics' && <Statistics />}
        </div>
    );
}