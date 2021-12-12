import React from "react";
import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Signup = () => {
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
                      justifyContent="center"> <Typography style={{textAlign: 'center'}}
                                                           sx={{ml: 3, mr: 3, mt: 1, mb: 1}}
                                                           variant="h6"
                                                           component="div"
                                                           gutterBottom>Signup</Typography>
                </Grid>
                <Grid item xs={12}> <TextField style={{width: '16rem'}} sx={{ml: 3, mr: 3, mt: 1, mb: 1}}
                                               id="outlined-basic"
                                               name="username"
                                               label="Username"
                                               variant="outlined"
                /> </Grid>
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
                    <Button sx={{ml: 3, mr: 3, mt: 1, mb: 1}} type="submit">Signup</Button>
                </Grid>

                <Grid item xs={12}>
                    <Typography style={{textAlign: 'center'}} sx={{ml: 3, mr: 3, mt: 1, mb: 1}} variant="h7"
                                component="div">Do you have an
                        account? <Link
                            to="/login">login</Link>
                    </Typography>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default Signup;