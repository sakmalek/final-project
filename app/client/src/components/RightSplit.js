import React, {useEffect, useState} from "react";
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
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import MessagePost from "./MessagePost"

const RightSplit = ({channelId, receiverId}) => {
    console.log({receiverId, channelId})
    const [messages, setMessages] = useState([]);
    const [post, setPost] = useState(false);

    const changeDateFormat = (date) => `${date}`
        useEffect(() => {
            axios.get(`message/${channelId}/channel`)
                .then(response => {
                    setMessages(response.data)
                })
                .catch(err => console.log(err))
        }, [channelId, post]);

    if (messages.length === 0) return (
        <>
            <Grid item xs={12} sx={{
                position: "fixed",
                bottom: "1rem",
                width: "75%",
                pl: 2
            }}
            ><MessagePost channelId={channelId} receiverId={receiverId} post={post} setPost={setPost}
                          sx={{m: 0, p: 0}}/></Grid>
            <CircularProgress sx={{position: "relative", top: "50%", left: "50%"}} color="inherit"/>
        </>
    )
    return (
        <>
            <Timeline sx={{color: "white", m: 0, p: 0}} position="right">
                {
                    messages.map(message => {
                        return <TimelineItem key={message._id}>
                            <TimelineOppositeContent
                                sx={{m: 'auto 0'}}
                                align="right"
                                variant="body2"
                                color="white"
                                fontWeight={"bold"}
                            >
                                <div>
                                    <p style={{color: "orange"}}>{message.sender_id && message.sender_id.username}</p>
                                    <p>{changeDateFormat(message.updatedAt)}</p>
                                </div>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector/>
                                <TimelineDot>
                                    <TextsmsOutlinedIcon/>
                                </TimelineDot>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent sx={{py: '12px', px: 2}}>
                                <Typography variant="h6" component="span">
                                    {message.source}
                                </Typography>
                                <Typography>Because you need strength</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    })
                }
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