import React, {useState} from "react";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Login = () => {

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submit')
    }
    return (
        <Box onSubmit={submitHandler}
             component="form"
             sx={{
                 position: 'absolute',
                 left: '50%',
                 top: '50%',
                 transform: 'translate(-50%, -80%)',
                 '& > :not(style)': {
                     width: '30vw',
                     height: '50vh',
                 },
             }}
        >

            <Paper style={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "center",
                justifyContent: 'center',
                alignContent: 'center',
            }} elevation={3}>

                <Typography variant="h6" component="div" gutterBottom>Login</Typography>
                <TextField sx={{ml: 6, mr: 6, mt: 1, mb: 1}} id="outlined-basic" label="E-Mail" variant="outlined"/>
                <TextField sx={{ml: 6, mr: 6, mt: 1, mb: 1}} id="outlined-basic" type="password" label="Password"
                           variant="outlined"/>

                <Button sx={{ml: 6, mr: 6, mt: 2}} type="submit">Login</Button>

                <Typography variant="h7" component="div">Don't have an account? <Link
                    to="/signup">signup</Link></Typography>
                <Typography variant="h9" component="div">Forgot your Password? <Link
                    to="#password">password</Link></Typography>
            </Paper>
        </Box>
    );
}

export default Login;