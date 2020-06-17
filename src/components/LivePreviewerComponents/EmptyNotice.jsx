import React from "react";
import { Typography } from "@material-ui/core";

const EmptyNotice = ({ items, children, className }) => {
  return (
    <div className={className}>
      {items.length === 0 && (
        <Typography
          color={items.length > 0 ? "primary" : "secondary"}
          variant="body1"
        >
          {children ? children : "Click on the + icon to add new items"}
        </Typography>
      )}
    </div>
  );
};

export default EmptyNotice;
