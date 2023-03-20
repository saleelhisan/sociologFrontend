import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setLogout } from '../../state';

const LeftToggle = ({ state, setState }) => {

    const dispatch = useDispatch();
    const toggleDrawer = (open) => () => {
        setState(open);
    };
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user?._id);

    const list = () => (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem>
                    <ListItemButton onClick={() => navigate(`/profile/${userId}`)}>
                        <ListItemIcon>
                            <Avatar sx={{ width: 30, height: 30 }} />
                        </ListItemIcon>
                        <ListItemText primary="User" />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <Link to="/" style={{ textDecoration: 'none', color: "inherit" }}>
                        <ListItemButton >
                            <ListItemIcon>
                                <Home sx={{ color: "blue" }} />
                            </ListItemIcon>
                            <ListItemText primary="Homepage" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/pages" style={{ textDecoration: 'none', color: "inherit" }}>
                        <ListItemButton >
                            <ListItemIcon>
                                <ArticleIcon sx={{ color: "rgb(242, 182, 17)" }} />
                            </ListItemIcon>
                            <ListItemText primary="Pages" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/groups" style={{ textDecoration: 'none', color: "inherit" }}>
                        <ListItemButton  >
                            <ListItemIcon>
                                <GroupsIcon sx={{ color: "rgb(237, 113, 5)" }} />
                            </ListItemIcon>
                            <ListItemText primary="Groups" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/friends" style={{ textDecoration: 'none', color: "inherit" }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonIcon sx={{ color: "rgb(4, 191, 4)" }} />
                            </ListItemIcon>
                            <ListItemText primary="Friends" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem >
                    <Link to="/settings" style={{ textDecoration: 'none', color: "inherit" }}>
                        <ListItemButton >
                            <ListItemIcon>
                                <SettingsIcon sx={{ color: "rgb(219, 63, 24)" }} />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem >
                    <ListItemButton onClick={() => dispatch(setLogout())}>
                        <ListItemIcon>
                            <LogoutIcon sx={{ color: "rgb(176, 19, 11)" }} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
    return (
        <Drawer
            anchor="left"
            open={state}
            onClose={toggleDrawer(false)}
        >
            {list("Left")}
        </Drawer>
  )
}

export default LeftToggle
