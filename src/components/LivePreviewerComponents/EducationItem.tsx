import React, { FunctionComponent } from "react";
import { Box } from "@material-ui/core";
import { getTimespan } from "../../lib/date";
import { SectionItemHeader, useSectionItemHeaderStyles } from "./SectionItemHeader";
import { DetailWithIcon } from "./DetailWithIcon";
import { Education as EducationModel } from "../../../types/Resume";
// Icons
import SchoolIcon from "@material-ui/icons/School";
import DateRangeIcon from "@material-ui/icons/DateRangeOutlined";

interface EducationItemProps {
  educationItem: EducationModel;
  onDelete: () => void;
  onEdit: (item: EducationModel) => void;
}

export const EducationItem: FunctionComponent<EducationItemProps> = ({ educationItem, onDelete, onEdit }) => {
  const sectionItemHeaderClasses = useSectionItemHeaderStyles();

  return (
    <Box className={sectionItemHeaderClasses.container}>
      <SectionItemHeader
        type="education"
        title={educationItem.name}
        classes={sectionItemHeaderClasses}
        onDelete={() => onDelete()}
        onEdit={() => onEdit(educationItem)}
      ></SectionItemHeader>
      <Box display="flex" flexDirection="column" gridGap={8}>
        <DetailWithIcon icon={<SchoolIcon />}>{educationItem.institute}</DetailWithIcon>
        <DetailWithIcon icon={<DateRangeIcon />}>{getTimespan(educationItem.startDate, educationItem.endDate)}</DetailWithIcon>
      </Box>
    </Box>
  );
};
