import React, {useEffect, useState} from "react";
import {Grid, Paper} from "@mui/material";
import LeftSplit from "./LeftSplit";
import RightSplit from "./RightSplit";

import axios from "axios";

const Slack = () => {
    let {innerWidth: width, innerHeight: height} = window;
    height -= 16;

    const [channels, setChannels] = useState(null);
    const [channelId, setChannelId] = useState(null);
    const [receiverId, setReceiverId] = useState(null);

    useEffect(() => {
        axios.get("/channel")
            .then(response => {
                setChannels(response.data)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <Grid item sx={{pl: 1, pr: 1, pt: 1}} xs={12} spacing={1}
              container>
            <Grid item lg={2} md={4} xs={6}>
                <Paper
                    sx={{height: height, backgroundColor: "#0000008c", overflowY: "overlay"}}
                    elevation={3}>
                    <LeftSplit
                        channels={channels} setReceiverId={setReceiverId} setChannelId={setChannelId}
                    />
                </Paper>
            </Grid>
            <Grid item lg={10} md={8} xs={6}>
                <Paper sx={{height: height, backgroundColor: "#0000008c"}} elevation={3}>
                    <RightSplit
                        channelId={channelId} receiverId={receiverId}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Slack;