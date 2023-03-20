import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import Modal from '@mui/material/Modal';
import Stories from 'react-insta-stories';
import React from 'react';


const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const StoryView = ({open, setOpen, stories, index}) => {
  return (
      <Box>
          <StyledModal
              open={open}
              onClose={e => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={{
                  height: "80vh", width: { sm: '100vw', md: "50vw" }
              }} bgcolor={"background.default"} color={"text.primary"} p={3} borderRadius={5}>
                    
                  <Stories
                      stories={stories}
                      defaultInterval={1500}
                      height="80vh"
                      width="100%"
                  />
              </Box>
                  
          </StyledModal>
      </Box>
  )
}

export default StoryView
