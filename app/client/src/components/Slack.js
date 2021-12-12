import React from "react";
import {Grid, Paper} from "@mui/material";

const Slack = () => {

    return (
        <Grid sx={{m: 1, p: 1}} item xs={12}
              spacing={2}
              container
              minHeight="100vh"
              minWidth="100vw">

            <Grid item xs={4}>
                <Paper elevation={3}>
                    <h2>Channels</h2>
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Paper elevation={3}>
                    <h2>Chat</h2>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Slack;