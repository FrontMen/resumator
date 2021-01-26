import React, { FunctionComponent } from "react";
import { Box, Link } from "@material-ui/core";
import { SectionItemHeader, useSectionItemHeaderStyles } from "./SectionItemHeader";

export interface SideProjectModel {
  title: string;
  description: string;
  link: string;
}

interface SideProjectItemProps {
  type: string;
  projectItem: SideProjectModel;
  onDelete: () => void;
  onEdit: (item: SideProjectModel) => void;
}

export const SideProjectItem: FunctionComponent<SideProjectItemProps> = ({
  type,
  projectItem,
  onDelete,
  onEdit,
}) => {
  const sectionItemHeaderClasses = useSectionItemHeaderStyles();

  return (
    <Box className={sectionItemHeaderClasses.container}>
      <SectionItemHeader
        title={projectItem.title}
        type={type.toLowerCase()}
        classes={sectionItemHeaderClasses}
        onDelete={() => onDelete()}
        onEdit={() => onEdit(projectItem)}
      ></SectionItemHeader>
      <Box display="flex" flexDirection="column" gridGap={8}>
        {projectItem.description && <Box>{projectItem.description}</Box>}
        <Link
          rel="noreferrer noopener"
          target="_blank"
          color="secondary"
          href={projectItem.link}
        >
          {projectItem.link}
        </Link>
      </Box>
    </Box>
  );
};
