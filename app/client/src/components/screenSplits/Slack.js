import React, {useEffect, useState, useContext} from "react";
import {Fab, Grid, Paper} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import LeftSplit from "./LeftSplit";
import RightSplit from "./RightSplit";
import Navigation from "../Navigation";
import AddButtom from "../AddButtom";
import {AuthContext} from "../../context/auth";
import axios from "axios";
import AddChannelModal from "../modals/AddChannelModal";


const Slack = () => {
    const {user} = useContext(AuthContext);
    let {innerWidth: width, innerHeight: height} = window;
    height -= 20;

    const [channels, setChannels] = useState(null);
    const [conversations, setConversations] = useState(null);
    const [channelId, setChannelId] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const [openAddChannelModel, setOpenAddChannelModel] = React.useState(false);
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
        <Grid item
              sx={{pl: 1, pr: 1, pt: 1, minHeight: height, maxHeight: height, height: "100%", position: "relative"}}
              xs={12} spacing={1}
              container>
            <Grid item lg={3} md={3} xs={12} sx={{height: height}}>
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
                    <AddButtom openAddChannelModel={openAddChannelModel}
                               setOpenAddChannelModel={setOpenAddChannelModel}
                               color="primary" aria-label="add"
                               sx={{
                                   backgroundColor: "#3861a4b5",
                                   position: "absolute",
                                   bottom: "1rem",
                                   ml: "10px",
                                   mt: "-10px",
                               }}>
                    </AddButtom>
                </Paper>
            </Grid>
            <Grid item lg={9} md={9} xs={12} sx={{height: height, position: "relative"}}>
                <Paper sx={{maxHeight: height, height: "100%", backgroundColor: "#032051db", overflowY: "overlay"}}
                       elevation={3}>
                    <RightSplit
                        channelId={channelId}
                        conversationId={conversationId}
                    />
                    <AddChannelModal openAddChannelModel={openAddChannelModel}
                                     setOpenAddChannelModel={setOpenAddChannelModel}/>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Slack;