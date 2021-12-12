import React, {useState} from "react";
import {Button, Grid, Paper, TextField, Typography, useMediaQuery} from "@mui/material";
import {Link} from "react-router-dom";


const Login = () => {

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submit')
    }
    return (
        <Grid item xs={12} container onSubmit={submitHandler}
              component="form"
              direction="column"
              alignItems="center"
              justifyContent="center"
              minHeight="100vh"
              minWidth="100vw"
        >

            <Paper style={{minWidth: "19rem"}} elevation={5}>

                <Grid item xs={12} direction="column"
                      alignItems="center"
                      justifyContent="center"> <Typography style={{textAlign: 'center'}} sx={{ml: 3, mr: 3, mt: 1, mb: 1}}
                                                           variant="h6"
                                                           component="div"
                                                           gutterBottom>Login</Typography>
                </Grid>
                <Grid item xs={12}> <TextField style={{width: '16rem'}} sx={{ml: 3, mr: 3, mt: 1, mb: 1}}
                                               id="outlined-basic"
                                               name="email"
                                               label="E-Mail"
                                               variant="outlined"
                /> </Grid>
                <Grid item xs={12}> <TextField style={{width: '16rem'}} sx={{ml: 3, mr: 3, mt: 1, mb: 1}}
                                               id="outlined-basic"
                                               name="password"
                                               type="password"
                                               label="Password"
                                               variant="outlined"/>
                </Grid>

                <Grid textAlign="center" item xs={12}>
                    <Button sx={{ml: 3, mr: 3, mt: 1, mb: 1}} type="submit">Login</Button>
                </Grid>

                <Grid item xs={12}>
                    <Typography style={{textAlign: 'center'}} sx={{ml: 3, mr: 3, mt: 1, mb: 1}}variant="h7" component="div">Don't have an account? <Link
                        to="/signup">signup</Link>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{textAlign: 'center'}} sx={{ml: 3, mr: 3, mt: 1, mb: 1}} variant="h9" component="div">Forgot your Password? <Link
                    to="#password">reset</Link></Typography>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default Login;