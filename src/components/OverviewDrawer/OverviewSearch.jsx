import React, { useCallback } from "react";
import { Search } from "@material-ui/icons";
import { fade, makeStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import { debounce } from "debounce";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    paddingLeft: 50,
    border: "1px solid",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.1),
    },
    marginBottom: theme.spacing(2),
    width: "100%",
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
}));

export const OverviewSearch = ({ handleSearch }) => {
  const classes = useStyles();

  const delayedQuery = useCallback(
    debounce((searchValue) => {
      handleSearch(searchValue);
    }, 100),
    []
  );

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <InputBase
        variant="outlined"
        className={classes.input}
        onChange={(event) => {
          event.persist();
          const searchValue = event.target.value;

          delayedQuery(searchValue);
        }}
        placeholder="Search…"
      />
    </div>
  );
};
