import React, { useState } from "react";
import { Tabs, Tab, AppBar } from "@mui/material";
import Customerlist from './Customerlist';
import Traininglist from "./Trainingslist";

export default function Menu() {

    const [current, setCurrent] = useState('customers');

    return (
        <div>
            <AppBar position="static" sx={{bgcolor: "lightgray"}}>
                <Tabs value={current} onChange={(_,value) => setCurrent(value)}>
                    <Tab value="customers" label="Customers" />
                    <Tab value="trainings" label="Trainings" />
                </Tabs>
            </AppBar>
            {current === "customers" && <Customerlist />}
            {current === "trainings" && <Traininglist />}
        </div>
    );
}