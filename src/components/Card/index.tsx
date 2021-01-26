import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

interface InternCardProps {
  className?: string;
}

const InternCard: FunctionComponent<InternCardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <CardContainer {...props} className={className}>
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

const CardContainer = styled(Card)`
  position: relative;
  margin: 6px 0;

  .MuiCardContent-root {
    padding-bottom: 16px;
  }
`;

export default InternCard;
