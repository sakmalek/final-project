import React, {useContext} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    CircularProgress,
    Tooltip,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
import {AuthContext} from "../../context/auth";

const LeftSplit = ({channels, conversations, setConversationId, setChannelId}) => {
    const {user} = useContext(AuthContext);

    if (!channels) return <CircularProgress sx={{position: "relative", top: "50%", left: "50%"}} color="primary"/>
    return (
        <>
            <Accordion sx={{m: .5, backgroundColor: "#032051db", color: "orange"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "orange"}}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Channels</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <>
                            {channels.map(channel => {
                                return (
                                    <Tooltip key={channel._id} title={channel.description} placement="top">
                                        <Button sx={{color: "orange"}}
                                                onClick={() => {
                                                    setChannelId(channel._id)
                                                    setConversationId(null)
                                                }}>
                                            {`# - ${channel.name}`}
                                        </Button>
                                    </Tooltip>
                                );
                            })
                            }
                        </>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{m: .5, backgroundColor: "#032051db", color: "yellow"}}
                       defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "yellow"}}/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography> Conversations</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <>
                            {conversations && conversations.map(conversation => {
                                return (
                                    <Box sx={{display: "flex", width: "100%", pb: 1}}>
                                        <img style={{width: '40px', 'border-radius': '50%'}}
                                             src="https://lh3.googleusercontent.com/ffFwGD7OMmSsvlcJmpKd5l5Y-wLwgcp7cYr5OG1AruAicX9QwROjNB29m9XIBlhHqmyVk644QTjZgj-haJ7ModBZdkr79dpg9Adc8Y4"/>
                                        <Button sx={{color: "yellow"}}
                                                onClick={() => {
                                                    setChannelId(null)
                                                    setConversationId(conversation.user_1_id._id)
                                                }
                                                }>
                                            {(user._id !== conversation.user_1_id._id) && `${conversation.user_1_id.username}` || `${conversation.user_2_id.username}`}
                                        </Button>
                                    </Box>
                                );
                            })
                            }
                        </>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default LeftSplit;