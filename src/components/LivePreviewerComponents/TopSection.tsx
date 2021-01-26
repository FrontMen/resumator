import React, { FunctionComponent, useState } from "react";
import { Box, Card, Hidden, Typography } from "@material-ui/core";
import { formatDate } from "../../lib/date";
import getAvatarDataUri from "../../lib/getAvatarDataUri";
import { TooltipIconButton } from "../Material";
import { SectionHeader } from "./SectionHeader";
import { SectionEditDialog } from "./SectionEditDialog";
import { DetailWithIcon } from "./DetailWithIcon";
import {
  FormAvatarSelect,
  FormColumn,
  FormDatePicker,
  FormRow,
  FormTextField,
} from "../Form";
// Icons
import CakeIcon from "@material-ui/icons/CakeOutlined";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import EditIcon from "@material-ui/icons/Edit";
import PlaceIcon from "@material-ui/icons/PlaceOutlined";

export interface PersonaliaModel {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  dateOfBirth: Date;
  introduction: string;
}
interface TopSectionProps {
  personalia: PersonaliaModel;
  onSubmit: (value: PersonaliaModel) => void;
}

export const TopSection: FunctionComponent<TopSectionProps> = ({
  personalia,
  onSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Get first and last name.
   * Will return John / Jane Doe if the name is not filled in.
   */
  const getFirstName = () =>
    personalia.firstName || (+personalia.avatar > 4 ? "John" : "Jane");
  const getLastName = () => personalia.lastName || "Doe";

  return (
    // We use a card directly here instead of a section because this is a custom full width section.
    <Card>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
        <Box display="flex" flexDirection="row" padding={1} flex={1}>
          <Box
            display="flex"
            alignItems="center"
            // As we have a button in mobile mode on the right, 5.5 gives us 44px, the same as the button.
            marginLeft={{ xs: 5.5, sm: 0 }}
            flexDirection={{ xs: "column", sm: "row" }}
            padding={1}
            gridGap={16}
            flex={1}
          >
            {/* Avatar */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              overflow="hidden"
              width={160}
              height={160}
              border={2}
              flexShrink={0}
            >
              <img
                alt="Avatar"
                height="90%"
                // Drop shadow for the avatar, only works if all avatars have a transparent background.
                style={{
                  marginTop: "10%",
                  filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.7))",
                }}
                src={getAvatarDataUri(personalia.avatar)}
              />
            </Box>
            {/* Personalia */}
            <Box display="flex" flexDirection="column" marginBottom={1} gridGap={8}>
              <Typography variant="h3" align="left">
                {getFirstName()} {getLastName()}
              </Typography>
              <DetailWithIcon icon={<EmailIcon />}>
                {personalia.email}
              </DetailWithIcon>
              <DetailWithIcon icon={<PlaceIcon />}>{personalia.city}</DetailWithIcon>
              <DetailWithIcon icon={<CakeIcon />}>
                {formatDate(personalia.dateOfBirth)}
              </DetailWithIcon>
            </Box>
          </Box>
          {/* Edit button in mobile view */}
          <Hidden mdUp>
            <Box>
              <TooltipIconButton
                color="inherit"
                tooltip={"Edit personal details"}
                onClick={() => setIsEditing(true)}
              >
                <EditIcon fontSize="small" />
              </TooltipIconButton>
            </Box>
          </Hidden>
        </Box>

        <Box display="flex" flexDirection="column" flex={1}>
          {/* Have the ability to edit the personalia when in normal view. */}
          <Hidden smDown>
            <SectionHeader
              title={`About ${getFirstName()}`}
              action="edit"
              actionTooltip="Edit personal details"
              actionOnClick={() => setIsEditing(true)}
            />
          </Hidden>
          {/* Only show about in mobile view, the edit option will be somewhere else. */}
          <Hidden mdUp>
            <SectionHeader title={`About ${getFirstName()}`} />
          </Hidden>
          {/* Introduction text. */}
          <Box padding={2} paddingTop={0}>
            <Typography variant="body2">
              {personalia.introduction ||
                `${getFirstName()} has nothing to tell you.`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <SectionEditDialog
        title="Personal details"
        data={personalia}
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onSave={(data) => {
          setIsEditing(false);
          onSubmit(data);
        }}
      >
        <FormColumn>
          <FormRow>
            <FormTextField required name="firstName" label="First name" />
            <FormTextField required name="lastName" label="Last name" />
          </FormRow>
          <FormRow>
            <FormTextField required name="email" label="Email" />
          </FormRow>
          <FormRow>
            <FormTextField name="city" label="City" />
            <FormDatePicker name="dateOfBirth" label="Date of birth" />
          </FormRow>
          <FormRow>
            <FormTextField
              multiline
              name="introduction"
              label="Introduction"
              rows={8}
            />
          </FormRow>
          <FormRow>
            <FormAvatarSelect name="avatar" label="Avatar" />
          </FormRow>
        </FormColumn>
      </SectionEditDialog>
    </Card>
  );
};
