import React, {useEffect, useState} from "react";
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

const LeftSplit = ({channels, setReceiverId, setChannelId}) => {

    if (!channels) return <CircularProgress color="inherit"/>
    return (
        <>
            <Accordion sx={{m: .5, backgroundColor: "#000000cf", color: "orange"}}>
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
                                                    setReceiverId(null)
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

            <Accordion sx={{m: .5, backgroundColor: "#000000cf", color: "yellow"}}
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
                            {channels && channels.map(channel => {
                                return (
                                    <Tooltip key={channel._id} title={channel.description} placement="top">
                                        <Button sx={{color: "yellow"}}
                                                onClick={() => {
                                                    setChannelId(null)
                                                    setReceiverId(channel._id)
                                                }
                                                }>
                                            {` - ${channel.name}`}
                                        </Button>
                                    </Tooltip>
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