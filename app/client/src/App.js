import './App.css';
import * as React from 'react';
import {Routes, Route} from "react-router-dom";

import Navigation from "./components/Navigation";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Slack from "./components/Slack";
import {Container} from "@mui/material";


function App() {
    return (
        <div className="App">
            <Container maxWidth="sm">
                <Navigation/>
                <Routes>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Slack/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
