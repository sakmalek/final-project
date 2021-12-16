import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import {Paper} from '@mui/material'
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {TextField} from "@mui/material";
import {useState, useContext, useEffect} from "react";
import {AuthContext} from "../../context/auth";
import axios from "axios";
import SuggestionList from "../SuggestionList";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-30%, -50%)',
    width: "50%",
    height: "50%",
    borderRadius: "10px",
    bgcolor: "#ffffffd6",
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddChannelModal({openAddChannelModel, setOpenAddChannelModel}) {
    const {user} = useContext(AuthContext);
    const handleClose = () => setOpenAddChannelModel(false);
    const [addChannelForm, setAddChannelForm] = useState({owner_id: user._id});
    const [users, setUsers] = useState({});
    const [submitted, setSubmitted] = useState(false)
    const [channelMembers, setChannelMembers] = useState([])

    useEffect(() => {
        axios.get('/user')
            .then(response => setUsers(response.data))
            .catch(err => console.log(err))
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        const requestBody = {...addChannelForm, member_ids: channelMembers}

        axios.put('/channel', requestBody)
            .then(() => {
                setSubmitted(!submitted);
                handleClose();
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <Modal
                open={openAddChannelModel}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openAddChannelModel}>

                    <Grid item xs={12} container sx={style} onSubmit={submitHandler}
                          component="form">

                        <Grid item xs={12} container direction="column"
                              alignItems="center"
                              justifyContent="center">
                            <Typography style={{textAlign: 'center'}}
                                        sx={{m: 1}}
                                        variant="h6"
                                        component="div"
                                        color="primary"
                                        gutterBottom>Create your channel</Typography>
                        </Grid>
                        <Grid item xs={12}> <TextField style={{width: '100%'}}
                                                       sx={{m: 1}}
                                                       name="name"
                                                       label="Name"
                                                       variant="outlined"
                                                       autoComplete="off"
                                                       onChange={e => setAddChannelForm({
                                                           ...addChannelForm,
                                                           name: e.target.value
                                                       })}
                        />
                        </Grid>
                        <Grid item xs={12}> <TextField style={{width: '100%'}} sx={{m: 1}}
                                                       name="description"
                                                       type="text"
                                                       label="Description"
                                                       variant="outlined"
                                                       autoComplete="off"
                                                       onChange={e => setAddChannelForm({
                                                           ...addChannelForm,
                                                           description: e.target.value
                                                       })}

                        />

                        </Grid>

                        <Grid item xs={12}>
                            <SuggestionList users={users}
                                            channelMembers={channelMembers}
                                            setChannelMembers={setChannelMembers}
                                            style={{width: '100%'}} sx={{m: 1}}
                            />

                        </Grid>
                        <Grid textAlign="center" item xs={12}>
                            <Button sx={{ml: 3, mr: 3, mt: 1, mb: 1}} type="submit">Create</Button>
                        </Grid>
                    </Grid>
                </Fade>
            </Modal>
        </div>
    );
}
