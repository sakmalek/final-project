import React from "react";
import {Box, Paper} from "@mui/material";

const Slack = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: "row",
                '& > :not(style)': {
                    m: 1,
                    height: '95vh',
                },
            }}
        >

            <Paper style={{width: '20%'}} elevation={3}>
                <h2>Channels</h2>
            </Paper>
            <Paper style={{width: '80%'}} elevation={3}>

            </Paper>
        </Box>
    );
}

export default Slack;