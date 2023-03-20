import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ImageIcon from '@mui/icons-material/Image';
import { Card, CardMedia, styled } from '@mui/material';
import Add from '@mui/icons-material/Add';
import React from 'react';
import { useState } from 'react';
import { useDropzone } from "react-dropzone";
import axios from '../../utils/axios';
import { submitStory } from '../../utils/Constants';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from "../../state/index";


const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});



const AddStory = () => {
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();


    const handleSubmit = async () => {
        setLoading(true);
        const formData = new FormData();
        if (files.length > 0) {
            formData.append('file', files[0]);
            formData.append('fileType',fileType)
        }
        const response = await axios.post(submitStory, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        })
        const post = await response.data;

        dispatch(setPosts({ posts: [post, ...posts] }));
        setLoading(false);
        setOpen(false);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
            'video/*': [],
        },
        multiple: false,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });
    const fileType = files[0]?.type.slice(0, 5);

    return (
        <>
            <Tooltip onClick={e => setOpen(true)}
                title="Add story" sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 90
                }}>
                <Fab color="primary" size='small' aria-label="add">
                    <Add />
                </Fab>
            </Tooltip>
            <StyledModal
                open={open}
                onClose={e => { setOpen(false); setFiles([]) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={400} height={ 280} bgcolor={"background.default"} color={"text.primary"} p={3} borderRadius={5}>
                    
                    {
                        !files[0] &&
                        <Box {...getRootProps({ className: 'dropzone' })}
                            
                        >
                            <input {...getInputProps()} />
                            <Box
                                border={"2px dashed "}
                                sx={{
                                    padding: "3rem",
                                    marginTop: "1rem",
                                    textAlign: "center",
                                    "&:hover": { cursor: "pointer" }
                                }}>
                                <p>Add your story here</p>
                            </Box>
                        </Box>
                    }

                    {files[0] && (fileType === 'image' ? (
                        <Box sx={{ width: "100%", height: '95%' }}>
                            <img
                                src={files[0].preview}
                                alt=''
                                style={{ width: "95%", height: "95%", objectFit: "cover" }}
                                onLoad={() => { URL.revokeObjectURL(files[0].preview) }}
                            />
                        </Box>
                    ) : (
                        <Card>
                            <CardMedia
                                sx={{ width: "95%", height: "95%" }}
                                component='video'
                                image={files[0].preview}
                                autoPlay
                                controls
                                onLoad={() => { URL.revokeObjectURL(files[0].preview) }}
                            />
                        </Card>
                    ))}
                    {
                        files[0] &&
                        <LoadingButton
                            size="small"
                            fullWidth
                            onClick={handleSubmit}
                            loading={loading}
                            variant="contained"
                        >
                            <span>Upload</span>
                        </LoadingButton>
                    }
                </Box>
            </StyledModal>
        </>
    );
};

export default AddStory
