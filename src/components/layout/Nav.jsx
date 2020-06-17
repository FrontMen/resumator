import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Badge,
  Drawer,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Avatar,
} from "@material-ui/core";
import {
  AccountCircle,
  Menu as MenuIcon,
  Notifications,
  People,
  Search,
  Web,
  ExitToApp,
} from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import frontmenLogo from "../../assets/svg/frontmen-logo.svg";
import { skillsConstants } from "../../config/skills.constants";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { FirebaseAppContext } from "../../context/FirebaseContext";

const drawerWidth = 80;
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  autocomplete: {
    paddingLeft: 50,
    width: "100%",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  grow: {
    flexGrow: 1,
  },
  iconList: {
    padding: 0,
  },
  inputInput: {
    color: "#FFF",
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create("width"),
    // Autocomplete additions
    width: 0,
    minWidth: 30,
    flexGrow: 1,
    textOverflow: "ellipsis",
  },
  listItem: {
    justifyContent: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navContainer: {
    display: "flex",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3),
      display: "flex",
      flex: 2,
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const Nav = ({ handleSearch }) => {
  const history = useHistory();
  const goTo = (path) => history.push(path);
  const location = useLocation();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={() => goTo("/")}>Sign out</MenuItem>
    </Menu>
  );

  const signOutUser = async function () {
    firebase
      .auth()
      .signOut()
      .then(function () {
        goTo("/");
      })
      .catch(function () {
        console.log("logout failed");
      });
  };

  const { user } = useContext(FirebaseAppContext);
  const avatarComponent =
    user && user.photoURL ? (
      <Avatar alt={user.displayName} src={user.photoURL} />
    ) : (
      <AccountCircle />
    );

  return (
    <div className={classes.navContainer}>
      <div className={classes.grow}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <img className={classes.logo} src={frontmenLogo} alt="logo" />
            <div className={[classes.grow, classes.sectionDesktop].join(" ")} />
            <div className={classes.search}>
              <Autocomplete
                id="overview-searcher"
                multiple
                limitTags={3}
                options={skillsConstants}
                getOptionLabel={(option) => option}
                freeSolo
                onChange={(data, newValue) => {
                  handleSearch(newValue);
                }}
                className={classes.autocomplete}
                renderInput={(params) => (
                  <>
                    <div className={classes.searchIcon}>
                      <Search />
                    </div>
                    <TextField
                      {...params}
                      ref={params.InputProps.ref}
                      placeholder="Search…"
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      inputProps={{
                        ...params.inputProps,
                        "aria-label": "search",
                        className: classes.inputInput,
                      }}
                    />
                  </>
                )}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {avatarComponent}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {renderMenu}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List className={classes.iconList}>
          <ListItem
            button
            key={"overview"}
            className={classes.listItem}
            selected={location.pathname === "/overview"}
          >
            <IconButton aria-label="overview" onClick={() => goTo("/overview")}>
              <People />
            </IconButton>
          </ListItem>
          <ListItem button key={"preview"} className={classes.listItem}>
            <IconButton aria-label="preview" onClick={() => goTo("/")}>
              <Web />
            </IconButton>
          </ListItem>
          <ListItem button key={"logout"}>
            <IconButton aria-label="logout" onClick={() => signOutUser()}>
              <ExitToApp />
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Nav;
