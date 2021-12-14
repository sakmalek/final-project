import React, {useEffect, useState} from "react";
import {
    CircularProgress, Typography,
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


const RightSplit = ({channelId, receiverId}) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get(`message/${channelId}/channel`)
            .then(response => {
                console.log(response.data)
                setMessages(response.data)
            })
            .catch(err => console.log(err))
    }, [channelId]);

    // useEffect(() => {
    //     axios.get(`message/${channelId}/channel`)
    //         .then(response => {
    //             setMessages(response.data)
    //         })
    //         .catch(err => console.log(err))
    // }, [receiverId]);

    if (messages.length === 0) return <CircularProgress color="inherit"/>
    return (
        <Timeline sx={{color: "white", m:0, p:0}} position="right">
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
                                <p>{message.sender_id && message.sender_id.username}</p>
                                <p>{message.updatedAt}</p>
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
    )
}

export default RightSplit;