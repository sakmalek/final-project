import React, {useEffect, useState, useContext} from "react";
import {Grid, Paper} from "@mui/material";
import LeftSplit from "./LeftSplit";
import RightSplit from "./RightSplit";
import Navigation from "../Navigation";
import AddButton from "../AddButton";
import {AuthContext} from "../../context/auth";
import axios from "axios";
import AddChannel from "../modals/AddChannel";
import StartConversation from "../modals/StartConversation";
import EditProfile from "../modals/EditProfile";

const Slack = () => {
    const {user} = useContext(AuthContext);
    let {innerWidth: width, innerHeight: height} = window;
    height -= 20;

    const [channels, setChannels] = useState(null);
    const [conversations, setConversations] = useState(null);
    const [channelId, setChannelId] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const [openAddChannelModel, setOpenAddChannelModel] = useState(false);
    const [openStartConversationModel, setOpenStartConversationModel] = useState(false);
    const [openEditProfileModel, setOpenEditProfileModel] = useState(false);
    const [submitted, setSubmitted] = useState(false)

    const storedToken = localStorage.getItem('authToken')
    useEffect(() => {
        axios.get(`/channel/${user._id}`, {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(response => {
                setChannels(response.data)
            })
            .catch(err => console.log(err))
    }, [submitted])

    useEffect(() => {
        axios.get(`/conversation/${user._id}`, {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(response => {
                setConversations(response.data)
            })
            .catch(err => console.log(err))
    }, [submitted]);


    return (
        <Grid item
              sx={{pl: 1, pr: 1, pt: 1, minHeight: height, maxHeight: height, height: "100%", position: "relative"}}
              xs={12} spacing={1}
              container>
            <Grid item lg={3} md={3} xs={12} sx={{height: height}}>
                <Paper
                    sx={{maxHeight: height, height: "100%", backgroundColor: "#032051db", overflowY: "overlay"}}
                    elevation={3}>
                    <Navigation
                        openEditProfileModel={openEditProfileModel}
                        setOpenEditProfileModel={setOpenEditProfileModel}
                    />
                    <LeftSplit
                        channels={channels}
                        conversations={conversations}
                        setConversationId={setConversationId}
                        setChannelId={setChannelId}
                    />
                    <AddButton openAddChannelModel={openAddChannelModel}
                               setOpenAddChannelModel={setOpenAddChannelModel}
                               openStartConversationModel={openStartConversationModel}
                               setOpenStartConversationModel={setOpenStartConversationModel}
                               color="primary" aria-label="add"
                               sx={{
                                   backgroundColor: "#3861a4b5",
                                   position: "absolute",
                                   bottom: "1rem",
                                   ml: "10px",
                                   mt: "-10px",
                               }}>
                    </AddButton>
                </Paper>
            </Grid>
            <Grid item lg={9} md={9} xs={12} sx={{height: height, position: "relative"}}>
                <Paper sx={{maxHeight: height, height: "100%", backgroundColor: "#032051db", overflowY: "overlay"}}
                       elevation={3}>
                    <RightSplit
                        channelId={channelId}
                        conversationId={conversationId}
                    />
                    <AddChannel openAddChannelModel={openAddChannelModel}
                                setOpenAddChannelModel={setOpenAddChannelModel}
                                submitted={submitted} setSubmitted={setSubmitted}/>

                    <StartConversation openStartConversationModel={openStartConversationModel}
                                       setOpenStartConversationModel={setOpenStartConversationModel}
                                       submitted={submitted} setSubmitted={setSubmitted}/>

                    <EditProfile openEditProfileModel={openEditProfileModel}
                                       setOpenEditProfileModel={setOpenEditProfileModel}
                                       submitted={submitted} setSubmitted={setSubmitted}/>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Slack;