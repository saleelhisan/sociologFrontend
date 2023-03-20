import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Leftbar from '../../Components/Leftbar/Leftbar';
import Rightbar from '../../Components/Rightbar/Rightbar';
import ChatList from '../../Components/ChatList/ChatList';


const Chats = () => {
 

  return (
    <Box flex={4} spacing={3}>
      <Stack direction="row" justifyContent="space-between" p={1} spacing={2} >

        <Leftbar />
        <ChatList />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default Chats
