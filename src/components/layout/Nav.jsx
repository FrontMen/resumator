import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Avatar,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import "firebase/firestore";
import "firebase/auth";
import frontmenLogo from "../../assets/svg/frontmen-logo.svg";
import { FirebaseAppContext } from "../../context/FirebaseContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  autocomplete: {
    paddingLeft: 50,
    width: "100%",
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
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const Nav = () => {
  const { firebase, user } = useContext(FirebaseAppContext);

  const history = useHistory();
  const goTo = (path) => history.push(path);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    goTo("/");
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
      <MenuItem onClick={signOut}>Sign out</MenuItem>
    </Menu>
  );

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
            <a href="/overview" title="Back to overview">
              <img className={classes.logo} src={frontmenLogo} alt="logo" />
            </a>
            <div className={[classes.grow, classes.sectionDesktop].join(" ")} />
            <div className={classes.grow} />
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
          </Toolbar>
        </AppBar>
      </div>
      {renderMenu}
    </div>
  );
};

export default Nav;
