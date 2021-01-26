import React, { FunctionComponent, useState } from "react";
import { Button, ButtonProps } from "@material-ui/core";
import { Menu, MenuItem } from "@material-ui/core";

interface DropdownButtonProps extends Omit<ButtonProps, "onClick"> {
  actions: string[];
  onClick: (action: string) => void;
}

export const DropdownButton: FunctionComponent<DropdownButtonProps> = ({
  actions,
  children,
  onClick,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  /**
   * Set the target for the menu to bind to.
   */
  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Remove the target for the menu.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handle a menu item click.
   */
  const handleAction = (action: string) => {
    handleClose();
    onClick(action);
  };

  return (
    <>
      {/* Trigger button with added properties from this component. */}
      <Button onClick={handleClick} {...props}>
        {children}
      </Button>
      {/* The menu with possible actions. */}
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {actions.map((action) => (
          <MenuItem key={action} onClick={() => handleAction(action)}>
            {action}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
