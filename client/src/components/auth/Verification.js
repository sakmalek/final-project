import React, {useEffect, useState} from "react";
import {Grid, Paper} from "@mui/material";
import {useParams} from "react-router-dom";
import axios from "axios";


const Verification = () => {
    const {hash} = useParams();

    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        axios.get(`/auth/verification/${hash}`)
            .then((response) => setMessage(response.data.message))
            .catch(err => setErrorMessage('Unknown path'))
    }, []);

    return (
        <Grid item xs={12}>
            <Grid item sx={{m: 2}} alignSelf={"center"}>
                {message && <Paper sx={{backgroundColor: "#008000eb", color: "white"}}><h1>{message}</h1></Paper>}
                {errorMessage && <Paper sx={{backgroundColor: "red", color: "white"}}><h1>{errorMessage}</h1></Paper>}
            </Grid>
        </Grid>
    );
}

export default Verification;