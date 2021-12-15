import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-30%, -50%)',
    width: "50%",
    height: "50%",
    borderRadius: "10px",
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddChannelModal({openAddChannelModel, setOpenAddChannelModel}) {
    const handleClose = () => setOpenAddChannelModel(false);

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
                    <Box sx={style}>


                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
