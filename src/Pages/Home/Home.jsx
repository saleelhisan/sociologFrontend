import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Feed from '../../Components/Feed/Feed';
import Leftbar from '../../Components/Leftbar/Leftbar';
import Rightbar from '../../Components/Rightbar/Rightbar';
import React from 'react';
import AddPost from '../../Components/AddPost/AddPost';

const Home = () => {
  return (
    <Box flex={4} spacing={3}>
      <Stack direction="row" justifyContent="space-between" p={1} spacing={2} >
        <Leftbar />
        <Feed />
        <Rightbar/>
      </Stack> 
      <AddPost />
    </Box>
  )
}

export default Home
