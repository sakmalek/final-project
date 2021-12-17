import React from "react";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ChatIcon from '@mui/icons-material/Chat';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {Grid} from "@mui/material";


const actions = [
    {icon: <ChatIcon/>, name: 'Start Conversation', id: 1},
    {icon: <GroupAddIcon/>, name: 'Create Channel', id: 2},
];

export default function AddButton({
                                      openAddChannelModel,
                                      setOpenAddChannelModel,
                                      openStartConversationModel,
                                      setOpenStartConversationModel
                                  }) {
    return (
        <Grid item lg={2} md={2} xs={12}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{position: 'absolute', bottom: 16, right: 16}}
                icon={<SpeedDialIcon/>}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={(e) => {
                            action.id === 1 && setOpenAddChannelModel(!openAddChannelModel)
                            action.id === 2 && setOpenStartConversationModel(!openStartConversationModel)
                        }}
                    />
                ))}
            </SpeedDial>
        </Grid>
    );
}