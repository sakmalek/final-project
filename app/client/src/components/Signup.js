import React from "react";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Signup = () => {
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
                 transform: 'translate(-50%, -70%)',
                 '& > :not(style)': {
                     width: '30vw',
                     height: '60vh',
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

                <Typography variant="h6" component="div" gutterBottom>Signup</Typography>
                <TextField sx={{ml: 6, mr: 6, mt: 1, mb: 1}} id="outlined-basic" label="Username" variant="outlined"/>
                <TextField sx={{ml: 6, mr: 6, mt: 1, mb: 1}} id="outlined-basic" label="E-Mail" variant="outlined"/>
                <TextField sx={{ml: 6, mr: 6, mt: 1, mb: 1}} id="outlined-basic" type="password" label="Password"
                           variant="outlined"/>
                <Button sx={{ml: 6, mr: 6, mt: 2}} type="submit">Signup</Button>

                <Typography variant="h7" component="div">Do you have an account? <Link
                    to="/login">login</Link></Typography>
            </Paper>
        </Box>
    );
}

export default Signup;