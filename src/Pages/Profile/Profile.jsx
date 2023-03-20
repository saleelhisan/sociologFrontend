// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import Leftbar from '../../Components/Leftbar/Leftbar';
// import Rightbar from '../../Components/Rightbar/Rightbar';
// import Button from '@mui/material/Button';
// import Fab from '@mui/material/Fab';
// import React, { useState } from 'react';
// import Post from '../../Components/Post/Post';
// import EditProfile from '../../Components/EditProfile/EditProfile';
// import AddPost from '../../Components/AddPost/AddPost';
// import Edit from '@mui/icons-material/Edit';
// import UploadImage from '../../Components/UploadImage/uploadImage';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from '../../utils/axios';
// import { setPosts } from '../../state';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';


// const CoverPhoto = styled("img")({
//   width: "95%",
//   height: "100%",
//   objectFit:"cover"
// });
// const ProfilePic = styled("img")({
//   width: "10rem",
//   height: "10rem",
//   borderRadius: "50%",
//   objectFit: "cover",
//   position: "absolute",
//   left: 0,
//   right: 0,
//   margin: "auto",
//   top: "10rem"
// });
// const EditCover = styled(Fab)(({ theme }) => ({
//   position: "absolute",
//   right: 20,
//   bottom: 0,
//   [theme.breakpoints.up("md")]: {
//     right: 40,
//   }
// }));
// const EditProfilepic = styled(Fab)(({ theme }) => ({
//   position: "absolute",
//   left: "65%",
//   [theme.breakpoints.up("sm")]: {
//     left:"57%"
//   },
//   [theme.breakpoints.up("xl")]: {
//     left: "53%"
//   }
// }));
// const UserInfoBox = styled(Box)({
//   "&::WebkitBoxShadow": `0px 0px 25px -10px rgba(0, 0, 0, 0.38)`,
//   "&::MozBoxShadow": `0px 0px 25px -10px rgba(0, 0, 0, 0.38)`,
//   boxShadow: `0px 0px 25px -10px rgba(0, 0, 0, 0.38)`,
//   borderRadius: "5%",
//   margin: "2rem",
//   padding: "1em 2rem",
// });

// const Profile = () => {

//   const [editProfile, setEditProfile] = useState(false);
//   const [openImageUpload, setImageUpload] = useState(false)
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts);
//   const token = useSelector((state) => state.token);
//   const user = useSelector((state) => state.user);
//   const { id } = useParams();
  


//   const getPosts = async () => {
//     const response = await axios.get(`api/user-post/${id}`, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Authorization': `Bearer ${token}`,
//       },
//     })
//     const postData = response.data;
//     dispatch(setPosts({ posts: postData }));
//   }

//   useEffect(() => {

//     getPosts()

//   }, [])

  

//   return (
//     <Box flex={4} spacing={3}>
//       <Stack direction="row" justifyContent="space-between"  >
//         <Leftbar />
//         <Box flex={4} >
//           <Box sx={{
//             width: "100%",
//             height: "15rem",
//             position: "relative",
//           }}>
//             <CoverPhoto src='https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='cover' />
//             {/* <EditCover onClick={e => setImageUpload(true)} size='small'>
//               <Edit/>
//             </EditCover> */}
//             <ProfilePic src={user?.profilePic} alt='profile' />
//             <Box sx={{
//               position: "relative",
//             }} >
//               <EditProfilepic onClick={e => setImageUpload(true)} size='small' >
//                 <Edit />
//               </EditProfilepic>
//               <UploadImage open={openImageUpload} setOpen={setImageUpload } />
//             </Box>
//           </Box>
//           <Box>
//             <UserInfoBox minHeight="max-content">
//                 <Box sx={{textAlign:"center", marginTop:"2rem"}}>
//                   <Box >
//                   <Typography component="h1" fontWeight={600}>{user?.username}</Typography>
//                 </Box>
//                 <Stack direction="row" justifyContent="center" spacing={2}>
//                   <Typography component="h1" fontWeight={500}>100 Posts</Typography>
//                   <Typography component="h1" fontWeight={500}>1k Followers</Typography>
//                   <Typography component="h1" fontWeight={500}>10k Following</Typography>
//                 </Stack>
//                   <Box sx={{marginTop:"1rem"}}>
//                     <Typography variant='p' >{user.bio}</Typography>
//                   </Box>
//                 <Button sx={{ margin: "1rem" }} onClick={e => setEditProfile(true)} variant='contained' size='small' >Edit</Button>
//                 <EditProfile open={editProfile} setOpen={setEditProfile} />
//                 </Box>
//             </UserInfoBox>
//           </Box>
//           {
//             posts.map(({
//               _id,
//               content,
//               author,
//               image,
//               likes,
//               comments,
//               createdAt,
//             }) => (
//               <Post
//                 key={_id}
//                 postId={_id}
//                 content={content}
//                 author={author}
//                 image={image}
//                 likes={likes}
//                 comments={comments}
//                 createdAt={createdAt}
//               />
//             ))
//           }
          
//           <AddPost/>
//         </Box>
//         <Rightbar />
//       </Stack>
//    </Box>
//   )
// }

// export default Profile
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Leftbar from '../../Components/Leftbar/Leftbar';
import Rightbar from '../../Components/Rightbar/Rightbar';
import ProfileComponent from '../../Components/ProfileComponent/ProfileComponent';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useSelector } from 'react-redux';




const Profile = () => {
  
  const { id } = useParams();
  const [user, setUser] = useState({});
  const token = useSelector(state => state.token);
  const getUser = async () => {
    try {
      const { data } = await axios.get(`api/user/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
      setUser(data);
    } catch (err) {
      
    }
  }
  
  useEffect(() => {
    getUser()
  },[id])

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={1} spacing={2} >
        <Leftbar />
          <ProfileComponent user={user}/>
        <Rightbar />
      </Stack>
   </Box>
  )
}

export default Profile