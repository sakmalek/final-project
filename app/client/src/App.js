import './App.css';
import * as React from 'react';
import {Routes, Route} from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Slack from "./components/Slack";
import Verification from "./components/Verification";
import Reset from "./components/Reset";

import {Grid} from "@mui/material";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    return (
        <Grid item xs={12} container>
            <Routes>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/verification/:hash" element={<Verification/>}/>
                <Route path="/reset/:hash" element={<Reset/>}/>
                <Route
                    path='/'
                    element={
                        <ProtectedRoute redirectTo='/login'>
                            <Slack/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Grid>
    );
}

export default App;
