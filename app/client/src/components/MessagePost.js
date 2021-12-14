import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import {useContext, useState} from "react";
import {AuthContext} from "../context/auth";
import axios from "axios";

export default function MessagePost({receiverId, channelId, post, setPost}) {

    console.log({receiverId, channelId})
    const {user} = useContext(AuthContext);
    const [message, setMessage] = useState("")

    const submitHandler = (e) => {
        e.preventDefault();

        const requestBody = {
            sender_id: user._id,
            receiver_user_id: receiverId,
            receiver_channel_id: channelId,
            type: "text",
            source: message
        }
        console.log(requestBody)
        axios.put(`/message`, requestBody)
            .then(response => {
                console.log(response.data)
                setPost(!post)
                setMessage("")
            })
            .catch(err => console.log(err))
    }

    return (
        <Paper
            component="form"
            sx={{display: 'flex', alignItems: 'center', height: "75px", width: "100%", backgroundColor: "#ffffffab"}}
            onSubmit={submitHandler}
        >
            <IconButton sx={{p: '10px'}} aria-label="menu">
                <MenuIcon/>
            </IconButton>
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Message"
                name="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
            <IconButton type={"submit"} color="primary" sx={{p: '10px'}}>
                <SendIcon/>
            </IconButton>
        </Paper>
    );
}
