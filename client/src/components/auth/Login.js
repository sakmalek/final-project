import React, {useContext, useState} from "react";
import {Alert, Button, Grid, Paper, Snackbar, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from '../../context/auth'

const Login = () => {
    const navigate = useNavigate();
    const {loginUser} = useContext(AuthContext);

    const [loginForm, setLoginForm] = useState({});
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [open, setOpen] = React.useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('/auth/login', loginForm)
            .then(response => {
                console.log(response.data.authToken)
                const token = response.data.authToken
                loginUser(token)
                navigate('/')
            })
            .catch(err => {
                setErrorMessage(err.response.data.message)
                setOpen(true);
            })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
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

                <Grid item xs={12} container direction="column"
                      alignItems="center"
                      justifyContent="center"> <Typography style={{textAlign: 'center'}}
                                                           sx={{ml: 3, mr: 3, mt: 1, mb: 1}}
                                                           variant="h6"
                                                           component="div"
                                                           gutterBottom>Login</Typography>
                </Grid>
                <Grid item xs={12}> <TextField style={{width: '16rem'}} sx={{ml: 3, mr: 3, mt: 1, mb: 1}}
                                               name="email"
                                               label="E-Mail"
                                               variant="outlined"
                                               onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                />
                </Grid>
                <Grid item xs={12}> <TextField style={{width: '16rem'}} sx={{ml: 3, mr: 3, mt: 1, mb: 1}}
                                               name="password"
                                               type="password"
                                               label="Password"
                                               variant="outlined"
                                               onChange={e => setLoginForm({...loginForm, password: e.target.value})}

                />
                </Grid>

                <Grid item xs={12} textAlign="center">
                    <Button sx={{ml: 3, mr: 3, mt: 1, mb: 1}} type="submit">Login</Button>
                </Grid>

                <Grid item xs={12}>
                    <Typography style={{textAlign: 'center'}} sx={{ml: 3, mr: 3, mt: 1, mb: 1}} variant="h7"
                                component="div">Don't have an account? <Link
                        to="/signup">signup</Link>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{textAlign: 'center'}} sx={{ml: 3, mr: 3, mt: 1, mb: 1}} variant="h9"
                                component="div">Forgot your Password? <Link
                        to="#password">reset</Link></Typography>
                </Grid>
            </Paper>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>

        </Grid>
    );
}

export default Login;