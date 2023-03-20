import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers, setUser } from "../../state";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)({
  "&::WebkitBoxShadow": `0px 0px 25px -10px rgba(0, 0, 0, 0.38)`,
  "&::MozBoxShadow": `0px 0px 25px -10px rgba(0, 0, 0, 0.38)`,
  boxShadow: `0px 0px 25px -10px rgba(0, 0, 0, 0.38)`,
});

const Rightbar = () => {
  const Navigate = useNavigate()
  const allUsers = useSelector((state) => state.allUsers);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const userId = user._id;
  const dispatch = useDispatch();
  const [following, setFollowing] = useState([]);

  console.log(following, "--------");

  const handleFollow = (userIdToFollow) => {
    axios
      .put(
        `/api/users/follow`,
        { userIdToFollow, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        // console.log(response.data, "ithaan data ---------");
        dispatch(setUser({ user: response.data }));
        setFollowing(response.data.following);
      })
      .catch((error) => {
        // Handle error
        console.log("Error following user:", error);
      });
  };

  const handleUnFollow = (userIdToUnFollow) => {
    axios
      .put(
        `/api/users/unfollow`,
        { userIdToUnFollow, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        // console.log(response.data, "ithaan unfollowers ---------");
        dispatch(setUser({ user: response.data }));
        setFollowing(response.data.following);
      })
      .catch((error) => {
        // Handle error
        console.log("Error following user:", error);
      });
  };


  const createConversation = (friendId) =>{
    axios
    .post(
        `/api/converstation`,
        { friendId ,userId},
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        }
      )
    .then((response) => {
        const member = response.data.members
        Navigate(`/chat/${response.data._id}/${member[1]}`)
      })
    .catch((error) => {
        // Handle error
        console.log("Error following user:", error);
      });
  }

  useEffect(() => {
    axios.get(`/api/users/${userId}`).then((response) => {
      dispatch(setAllUsers({ allUsers: response.data }));
    });
  }, []);

  return (
    <Box flex={2} sx={{ display: { xs: "none", lg: "block" }}}>
      <Box position="fixed" sx={{ width: "300px" ,alignItems: "center",padding:"1%"}} fullWidth>
        {/* <Box> */}
          {/* <Box> */}
            <StyledCard
              sx={{
                paddingInline: "1rem",
              }}
            >
              <Typography margin={"0.5rem"} variant="h6">
                Suggestion For You
              </Typography>

              {allUsers?.map((user) => {
                return (
                  <Box margin={"0.5rem"} key={user._id}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box minWidth="max-content">
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Avatar src={user.profilePic} />
                          <Typography variant="span" margin={1}>
                            {user.username.length > 5?
                            `${user.username.substring(0,5)}..`:
                            user.username}
                          </Typography>
                        </Stack>
                      </Box>
                      <Box minWidth="max-content">
                        {following.includes(user._id) ? (
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleUnFollow(user._id)}
                          >
                            Unfollow
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleFollow(user._id)}
                          >
                            Follow
                          </Button>
                        )}
                        
                        <Button
                      variant="contained"
                      size="small"
                      color="success"
                      sx={{ marginLeft: "0.3rem" }}
                      onClick={()=>createConversation(user._id)}
                    >
                      Chat
                    </Button>
                      </Box>
                    </Stack>
                    <Box></Box>
                  </Box>
                );
              })}
            </StyledCard>
          {/* </Box> */}
        {/* </Box> */}

        {/* <Box>
          <Box>
            <StyledCard
              sx={{
                width:"100%",
                marginTop: "1rem",
                paddingInline: "1rem",
              }}
            >
              <Typography margin={"0.5rem"} variant="h6">
                Online Friends
              </Typography>
              <Box margin={"0.5rem"}>
                <Box>
                  <Stack direction="row">
                    <Badge
                      color="secondary"
                      overlap="circular"
                      badgeContent=" "
                    >
                      <Avatar />
                    </Badge>
                    <Typography variant="span" margin={1}>
                      User Name
                    </Typography>
                  </Stack>
                </Box>
                <Box></Box>
              </Box>
            </StyledCard>
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Rightbar;
