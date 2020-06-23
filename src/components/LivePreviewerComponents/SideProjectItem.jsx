import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import ActionButtons from "./ActionButtons";

const SideProjectItem = ({ projectItem, onClickEdit, onDeleteHandler }) => {
  return (
    <ExperienceItemContainer id={projectItem.id}>
      <Typography variant="h6">{projectItem.title}</Typography>
      <Typography gutterBottom variant="body1">
        {projectItem.description}
      </Typography>

      <Link
        rel="noreferrer noopener"
        target="_blank"
        color="secondary"
        href={projectItem.link}
      >
        {projectItem.link}
      </Link>

      <ActionButtonsWrapper className="action-buttons">
        <ActionButtons
          onEditClick={() => onClickEdit(projectItem)}
          onDeleteClick={() => onDeleteHandler(projectItem)}
          tooltipTextLabel="side project"
        />
      </ActionButtonsWrapper>
    </ExperienceItemContainer>
  );
};

const ExperienceItemContainer = styled.div`
  position: relative;
  margin: 24px 0;

  &:hover .action-buttons {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ActionButtonsWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  opacity: 0;
  transform: translateX(3px);
  transition: opacity 225ms ease-out, transform 225ms ease-out;
`;

export default SideProjectItem;
