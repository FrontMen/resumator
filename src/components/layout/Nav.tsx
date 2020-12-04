import React, { useContext, FunctionComponent, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Avatar } from "@material-ui/core";
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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
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
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

interface FirebaseContext {
  firebase: {
    auth: () => any;
  }
  initializing: boolean;
  user: {
    photoURL: string;
    displayName: string;
  }
}

interface NavProps {
  handleSearch: (value: string) => void;
}

export const Nav: FunctionComponent<NavProps> = ({ handleSearch }) => {
  const { firebase, user } = (useContext(FirebaseAppContext) as FirebaseContext);

  const history = useHistory();
  const goTo = (path: string) => history.push(path);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: MouseEvent) => {
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
            <div className={classes.grow} />
            {/* <div className={classes.search}>
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
            </div> */}
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
