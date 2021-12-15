import React, {useEffect, useState, useContext} from "react";
import {Grid, Paper} from "@mui/material";
import LeftSplit from "./LeftSplit";
import RightSplit from "./RightSplit";
import Navigation from "./Navigation";
import {AuthContext} from "../context/auth";
import axios from "axios";

const Slack = () => {
    const {user} = useContext(AuthContext);
    let {innerWidth: width, innerHeight: height} = window;
    height -= 20;

    const [channels, setChannels] = useState(null);
    const [conversations, setConversations] = useState(null);
    const [channelId, setChannelId] = useState(null);
    const [conversationId, setConversationId] = useState(null);

    useEffect(() => {
        axios.get(`/channel/${user._id}`)
            .then(response => {
                setChannels(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`/conversation/${user._id}`)
            .then(response => {
                setConversations(response.data)
            })
            .catch(err => console.log(err))
    }, []);


    return (
        <Grid item sx={{pl: 1, pr: 1, pt: 1, minHeight: height, maxHeight: height, height: "100%"}} xs={12} spacing={1}
              container>
            <Grid item lg={2} md={2} xs={4} sx={{height: height}}>
                <Paper
                    sx={{maxHeight: height, height: "100%", backgroundColor: "#032051db", overflowY: "overlay"}}
                    elevation={3}>
                    <Navigation/>
                    <LeftSplit
                        channels={channels}
                        conversations={conversations}
                        setConversationId={setConversationId}
                        setChannelId={setChannelId}
                    />
                </Paper>
            </Grid>
            <Grid item lg={10} md={10} xs={8} sx={{height: height}}>
                <Paper sx={{maxHeight: height, height: "100%", backgroundColor: "#032051db", overflowY: "overlay"}}
                       elevation={3}>
                    <RightSplit
                        channelId={channelId}
                        conversationId={conversationId}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Slack;