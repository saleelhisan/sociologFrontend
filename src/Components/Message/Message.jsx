import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import { useSelector } from 'react-redux';
import TimeAgo from 'timeago.js';


const Message = ({msg}) => {
  const userId = useSelector((state) => state.user._id);
  const timeago = new TimeAgo()
  const formatDate = (date) => {
    const diffInMillis = Date.now() - date.getTime();
    // check if difference is greater than 24 hours in milliseconds
    if (diffInMillis > 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString(); // show date if older than 24 hours
    } else {
      return timeago.format(date); // show time if less than 24 hours old
    }
  };

 

  return (
    
          < Box sx={{
            display: "flex",
            ...(msg?.sender === userId && {
              alignItems: "flex-end",
            }),
            flexDirection: "column"
          }}>
            <Box sx={{
              maxWidth: "75%",
              width:"max-content",
              minHeight: "max-content",
              marginTop: "1rem",
              ...(msg?.sender === userId && {
                backgroundColor: "#b1c9ad",
              }),
        ...(msg?.sender !== userId && {
                backgroundColor: "white",
              }),
              borderRadius: "0px 10px 10px 10px",
              padding: "1rem"
            }}>
              <Typography variant='p' component='p'>
               {msg?.text}
              </Typography>
              
            </Box>
            <Typography variant='subtitle1'>
                {/* {timeago.format(msg?.createdAt)} */}
                {formatDate(new Date(msg?.createdAt))}
              </Typography>
            {/* <Card sx={{
              width: "75%",
              marginTop: "1rem"
            }}>
              <CardMedia
                component='img'
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq0W2Devh5khkgIF3t-2T2zCm95r71Bc9n1g&usqp=CAU"
              />
              <CardContent sx={{
          ...(msg.sender === userId && {
                  backgroundColor: "#b1c9ad",
                }),
          ...(msg.sender !== userId && {
                  backgroundColor: "white",
                }),
              }}>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal to cook
                  together with your guests. Add 1 cup of frozen peas along with the mussels,
                  if you like.
                </Typography>
              </CardContent>
            </Card> */}
          </Box >
    
  );
}

export default Message
