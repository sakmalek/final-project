import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {Avatar, Chip} from "@mui/material";
import {useState, useContext, useEffect} from "react";
import {AuthContext} from "../../context/auth";
import axios from "axios";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-30%, -50%)',
    width: "50%",
    height: "50%",
    borderRadius: "10px",
    bgcolor: "white",
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function StartConversation({
                                              openStartConversationModel,
                                              setOpenStartConversationModel,
                                              submitted,
                                              setSubmitted
                                          }) {
    const {user} = useContext(AuthContext);
    const handleClose = () => setOpenStartConversationModel(false);
    const [users, setUsers] = useState([]);


    const storedToken = localStorage.getItem('authToken')

    useEffect(() => {
        axios.get('/user', {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(response => {
                console.log(response.data)
                setUsers(response.data)
            })
            .catch(err => console.log(err))
    }, [openStartConversationModel]);

    const handleClick = (id) => {

        const requestBody = {user_1_id: user._id, user_2_id: id}
        axios.put('/conversation', requestBody, {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(() => {
                setSubmitted(!submitted)
                handleClose();
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Modal
                open={openStartConversationModel}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openStartConversationModel}>

                    <Grid item xs={12} container sx={style}>

                        {users.length !== 0 && users.map(u => {
                            return user._id !== u._id && <Chip sx={{m: 1}} onClick={() => handleClick(u._id)}
                                                               avatar={<Avatar alt="user"
                                                                               src={u.profile.image_url}/>}
                                                               label={u.profile.username}
                                                               variant="outlined"
                            />
                        })}
                    </Grid>
                </Fade>
            </Modal>
        </>
    );
}
