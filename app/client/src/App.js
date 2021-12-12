import './App.css';
import * as React from 'react';
import {Routes, Route} from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Slack from "./components/Slack";
import {Grid} from "@mui/material";


function App() {
    return (
        <Grid item xs={12} container spacing={2}>
            <Routes>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Slack/>}/>
            </Routes>
        </Grid>
    );
}

export default App;
