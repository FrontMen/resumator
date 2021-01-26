import React, { FunctionComponent } from "react";
import { Box } from "@material-ui/core";
import { formatDate } from "../../lib/date";
import { SectionItemHeader, useSectionItemHeaderStyles } from "./SectionItemHeader";
import { DetailWithIcon } from "./DetailWithIcon";
// Icons
import SchoolIcon from "@material-ui/icons/School";
import DateRangeIcon from "@material-ui/icons/DateRangeOutlined";

export interface EducationModel {
  name: string;
  institute: string;
  startDate: Date;
  endDate: Date;
}

interface EducationItemProps {
  educationItem: EducationModel;
  onDelete: () => void;
  onEdit: (item: EducationModel) => void;
}

export const EducationItem: FunctionComponent<EducationItemProps> = ({
  educationItem,
  onDelete,
  onEdit,
}) => {
  const sectionItemHeaderClasses = useSectionItemHeaderStyles();

  const getTimespan = () => {
    const start = educationItem.startDate;
    const end = educationItem.endDate;

    if (start && end) return `${formatDate(start)} - ${formatDate(end)}`;
    if (start && !end) return `${formatDate(start)} - present`;
    if (!start && end) return `somewhere in the past - ${formatDate(end)}`;
  };

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
        <DetailWithIcon icon={<SchoolIcon />}>
          {educationItem.institute}
        </DetailWithIcon>
        <DetailWithIcon icon={<DateRangeIcon />}>{getTimespan()}</DetailWithIcon>
      </Box>
    </Box>
  );
};
