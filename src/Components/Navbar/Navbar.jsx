import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Mail from "@mui/icons-material/Mail";
import Pets from "@mui/icons-material/Pets";
import Notification from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import LeftToggle from "../LeftToggle/LeftToggle";
import { setAllUsers, setMode } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../../state";
import { useTheme, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../../utils/axios";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "10px",
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "2rem",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const MobileIcons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const allUsers = useSelector((state) => state.allUsers);

  const user = useSelector((state) => state.user);
  const userId = user._id;

  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [state, setState] = useState(false);
  const toggleDrawer = (open) => () => {
    setState(open);
  };
  const dispatch = useDispatch();

  // const getAllUsers = async () => {
  //   const { data } = await getDataAPI("/users", token);
  //   setUsers(data);
  // };

  // useEffect(() => {
  //   getAllUsers();
  // }, []); // eslint-disable-line

  useEffect(() => {
    axios.get(`/api/users/${userId}`).then((response) => {
      dispatch(setAllUsers({ allUsers: response.data }));
    });
  }, []);

  return (
    <AppBar sx={{ backgroundColor: "#111" }} position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", md: "block" } }}>
          Sociolog
        </Typography>
        <Pets
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={toggleDrawer(true)}
        />
        <LeftToggle state={state} setState={setState} />
        <Search sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
          <InputBase
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
        </Search>
        {/* <IconButton>
              <Search />
            </IconButton> */}
        {search !== "" || searchOpen === true ? (
          <Box
            display="flex"
            flexDirection="column"
            position="absolute"
            backgroundColor="white"
            alignContent="center"
            marginTop="10rem"
            borderRadius="10px"
            width="300px"
            boxShadow={4}
            p={1}
            left="25%"
            transform="translateX(-50%)"
          >
            <IconButton
              onClick={() => [setSearchOpen(false), setSearch("")]}
              style={{ alignSelf: "flex-end" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            {allUsers?.length > 0 ? (
              <Box>
                {allUsers.map((user1) =>
                  user1.firstName.toLowerCase().includes(search) |
                    user1.lastName.toLowerCase().includes(search) &&
                  user._id !== user1.id ? (
                    <Link
                      key={user1._id}
                      style={{ textDecoration: "none" }}
                      to={`/profile/${user1._id}`}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        p={1} // add some padding
                        borderRadius="5px"
                        _hover={{
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          cursor: "pointer",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            alt="userImage"
                            src={`${user1.profilePic}`}
                            sx={{ marginRight: 1 }}
                          />
                          <Typography
                            onClick={() => [
                              setSearchOpen(false),
                              setSearch(""),
                            ]}
                            variant="subtitle2"
                            sx={{ color: "black" }}
                          >
                            {user1.firstName} {user1.lastName}
                          </Typography>
                        </Box>
                      </Box>
                    </Link>
                  ) : null
                )}
              </Box>
            ) : (
              <Typography>User not found.</Typography>
            )}
          </Box>
        ) : null}
        <Typography sx={{ display: { md: "none" } }}>Sociolog</Typography>
        <Icons>
          <DarkModeIcon onClick={() => dispatch(setMode())} color="white" />
          <Link to="/chats" style={{ color: "white" }}>
            <Badge color="error">
              <Mail color="white" />
            </Badge>
          </Link>
          <Link to="/notifications" style={{ color: "white" }}>
            <Badge color="error">
              <Notification color="white" />
            </Badge>
          </Link>
          <Avatar
            src={user.profilePic}
            sx={{ width: 30, height: 30 }}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <MobileIcons>
          <DarkModeIcon color="white" />
          <Link to="/chats" style={{ color: "white" }}>
            <Badge color="error">
              <Mail color="white" />
            </Badge>
          </Link>
          <Link to="/notificatios" style={{ color: "white" }}>
            <Badge color="error">
              <Notification color="white" />
            </Badge>
          </Link>
          <Avatar
            src={user.profilePic}
            sx={{ width: 30, height: 30 }}
            onClick={(e) => setOpen(true)}
          />
        </MobileIcons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
