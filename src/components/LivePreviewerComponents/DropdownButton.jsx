import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Menu, MenuItem } from "@material-ui/core";
import styled from "@emotion/styled";

const DropdownButton = ({ label, actions, onClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    handleClose();
    onClick(action);
  };

  return (
    <>
      <StyledButton variant="contained" onClick={handleClick}>
        {label}
      </StyledButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {actions.map((action) => (
          <MenuItem key={action} onClick={() => handleAction(action)}>{action}</MenuItem>
        ))}
      </Menu>
    </>
  );
};

const StyledButton = styled(Button)`
  margin: 0 8px;
`;

DropdownButton.propTypes = {
  label: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DropdownButton;
