import React, { FunctionComponent } from "react";
import { Box, Chip, makeStyles } from "@material-ui/core";
import { convertFromRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { formatDate } from "../../lib/date";
import { SectionItemHeader, useSectionItemHeaderStyles } from "./SectionItemHeader";
import { DetailWithIcon } from "./DetailWithIcon";
// Icons
import BusinessIcon from "@material-ui/icons/Business";
import DateRangeIcon from "@material-ui/icons/DateRangeOutlined";

export interface ExperienceModel {
  role: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string;
  stackAndTechniques: { name: string }[];
}

interface ExperienceItemProps {
  type: string;
  experienceItem: ExperienceModel;
  onDelete: () => void;
  onEdit: (item: ExperienceModel) => void;
}

const useStyles = makeStyles({
  description: {
    "& p": {
      margin: 0,
    },
    "& ul, ol": {
      margin: 0,
    },
  },
});

export const ExperienceItem: FunctionComponent<ExperienceItemProps> = ({
  type,
  experienceItem,
  onDelete,
  onEdit,
}) => {
  const classes = useStyles();
  const sectionItemHeaderClasses = useSectionItemHeaderStyles();
  let description;

  // Parse the description.
  try {
    const parsed = convertFromRaw(JSON.parse(experienceItem.description));
    const editor = EditorState.createWithContent(parsed);
    description = stateToHTML(editor.getCurrentContent());
  } catch (err) {
    // If parsing fails, we just use the string description.
    description = experienceItem.description;
  }

  const getTimespan = () => {
    const start = experienceItem.startDate;
    const end = experienceItem.endDate;

    if (start && end) return `${formatDate(start)} - ${formatDate(end)}`;
    if (start && !end) return `${formatDate(start)} - present`;
    if (!start && end) return `somewhere in the past - ${formatDate(end)}`;
  };

  return (
    <Box className={sectionItemHeaderClasses.container}>
      <SectionItemHeader
        title={experienceItem.role}
        type={type.toLowerCase()}
        classes={sectionItemHeaderClasses}
        onDelete={() => onDelete()}
        onEdit={() => onEdit(experienceItem)}
      ></SectionItemHeader>
      <Box display="flex" flexDirection="column" gridGap={8}>
        <DetailWithIcon icon={<BusinessIcon />}>
          {experienceItem.company}
        </DetailWithIcon>
        <DetailWithIcon icon={<DateRangeIcon />}>{getTimespan()}</DetailWithIcon>
        <Box
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {experienceItem.stackAndTechniques && (
          <Box display="flex" flexWrap="wrap" gridGap={8}>
            {experienceItem.stackAndTechniques.map((skill) => (
              <Chip
                key={skill.name}
                label={skill.name}
                size="small"
                variant="outlined"
                color="secondary"
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
