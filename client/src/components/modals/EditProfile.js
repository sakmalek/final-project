import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
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

export default function EditProfile({openEditProfileModel, setOpenEditProfileModel, submitted, setSubmitted}) {
    const {user} = useContext(AuthContext);
    const handleClose = () => setOpenEditProfileModel(false);
    const [profileForm, setProfileForm] = useState({});

    const storedToken = localStorage.getItem('authToken')

    useEffect(() => {
        axios.get(`/user/${user._id}`, {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(response => {
                setProfileForm(response.data.profile)
            })
            .catch(err => console.log(err))
    }, [openEditProfileModel]);

    const submitHandler = (e) => {
        e.preventDefault();
        const requestBody = {
            bio: profileForm.bio,
            lastname: profileForm.lastname,
            firstname: profileForm.firstname,
            username: profileForm.username,
            email: profileForm.email,
        }
        axios.post(`/profile/${profileForm._id}`, requestBody, {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(() => {
                setSubmitted(!submitted);
                handleClose();
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Modal
                open={openEditProfileModel}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openEditProfileModel}>

                    <Grid item xs={12} container sx={style} spacing={2} onSubmit={submitHandler}
                          component="form">

                        {profileForm.is_verified ?
                            <Grid item xs={2} sx={{alignSelf: "center"}}><img style={{
                                width: '60px',
                                borderRadius: '50%',
                                border: "3px solid blue"
                            }}
                                                                              alt=""
                                                                              src={profileForm.image_url}
                            /></Grid>
                            :
                            <Grid item xs={2} sx={{alignSelf: "center"}}><img style={{
                                width: '60px',
                                borderRadius: '50%',
                                border: "3px solid red"
                            }}
                                                                              alt=""
                                                                              src={profileForm.image_url}
                            /></Grid>
                        }

                        <Grid item xs={10}> <TextField style={{width: '100%'}}
                                                       sx={{m: 1}}
                                                       name="bio"
                                                       label="bio"
                                                       variant="outlined"
                                                       autoComplete="off"
                                                       value={profileForm.bio}
                                                       onChange={e => setProfileForm({
                                                           ...profileForm,
                                                           bio: e.target.value
                                                       })}
                        />
                        </Grid>
                        <Grid item xs={6}> <TextField style={{width: '100%'}}
                                                      sx={{m: 1}}
                                                      name="firstname"
                                                      label="firstname"
                                                      variant="outlined"
                                                      autoComplete="off"
                                                      value={profileForm.firstname}
                                                      onChange={e => setProfileForm({
                                                          ...profileForm,
                                                          firstname: e.target.value
                                                      })}
                        />
                        </Grid>

                        <Grid item xs={6}> <TextField style={{width: '100%'}}
                                                      sx={{m: 1}}
                                                      name="lastname"
                                                      label="lastname"
                                                      variant="outlined"
                                                      autoComplete="off"
                                                      value={profileForm.lastname}
                                                      onChange={e => setProfileForm({
                                                          ...profileForm,
                                                          lastname: e.target.value
                                                      })}
                        />
                        </Grid>


                        <Grid item xs={12}> <TextField style={{width: '100%'}}
                                                       sx={{m: 1}}
                                                       name="email"
                                                       label="email"
                                                       variant="outlined"
                                                       autoComplete="off"
                                                       value={profileForm.email}
                                                       onChange={e => setProfileForm({
                                                           ...profileForm,
                                                           email: e.target.value
                                                       })}
                        />
                        </Grid>

                        <Grid item xs={12} textAlign="center">
                            <Button sx={{ml: 3, mr: 3, mt: 1, mb: 1}} type="submit">Update profile</Button>
                        </Grid>
                    </Grid>
                </Fade>
            </Modal>
        </>
    );
}
