import React, {useEffect, useState, useContext, useRef} from "react";
import {
    CircularProgress, Grid, Typography,
} from "@mui/material";
import axios from "axios";

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import MessagePost from "./MessagePost"
import {AuthContext} from "../context/auth";

const RightSplit = ({channelId, receiverId}) => {
    const {user} = useContext(AuthContext);

    const [messages, setMessages] = useState([]);
    const [post, setPost] = useState(false);

    const messagesEndRef = useRef(null);

    const changeDateFormat = (string) => {
        const parsed = Date.parse(string)
        const date = new Date(parsed)
        return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
    }

    useEffect(() => {
        axios.get(`message/${channelId}/channel`)
            .then(response => {
                setMessages(response.data)
                scrollToBottom()
            })
            .catch(err => console.log(err))
    }, [channelId, post]);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    };

    if (messages.length === 0) return (
        <>
            <Grid item xs={12} sx={{
                position: "fixed",
                bottom: "20px",
                width: "75%",
                pl: 2
            }}
            ><MessagePost channelId={channelId} receiverId={receiverId} post={post} setPost={setPost}
                          sx={{m: 0, p: 0}}/></Grid>
            <CircularProgress sx={{position: "relative", top: "50%", left: "50%"}} color="primary"/>
        </>
    )
    return (
        <>
            <Timeline sx={{color: "white", m: 0, p: 0}} position="right">
                {
                    messages.map(message => {
                        console.log(user._id, message.sender_id)
                        return <TimelineItem key={message._id}
                                             position={user._id === message.sender_id._id ? "right" : "left"}>
                            <TimelineOppositeContent
                                sx={{m: 'auto 0'}}
                                align="right"
                                variant="body2"
                                color="white"
                                fontWeight={"bold"}
                            >
                                <div>
                                    <p style={{color: "orange"}}>{message.sender_id && message.sender_id.username.toUpperCase()}</p>
                                </div>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector/>
                                <TimelineDot>
                                    <img style={{width: '40px', 'border-radius': '50%'}}
                                         src="https://lh3.googleusercontent.com/ffFwGD7OMmSsvlcJmpKd5l5Y-wLwgcp7cYr5OG1AruAicX9QwROjNB29m9XIBlhHqmyVk644QTjZgj-haJ7ModBZdkr79dpg9Adc8Y4"/>
                                </TimelineDot>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent sx={{py: '12px', px: 2}}>
                                <Typography variant="h6" component="span">
                                    {message.source}
                                </Typography>
                                <Typography sx={{
                                    fontSize: "12px",
                                    color: "orange"
                                }}>{changeDateFormat(message.updatedAt)}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    })
                }
                <div style={{height: "100px"}} ref={messagesEndRef}/>
            </Timeline>

            <Grid item xs={12} sx={{
                position: "fixed",
                bottom: "1rem",
                width: "75%",
                pl: 2
            }}
            ><MessagePost channelId={channelId} receiverId={receiverId} post={post} setPost={setPost}
                          sx={{m: 0, p: 0}}/></Grid>
        </>
    )
}

export default RightSplit;