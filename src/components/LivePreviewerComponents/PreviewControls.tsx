import React, { FunctionComponent } from "react";
import { Box, Button } from "@material-ui/core";
import { DropdownButton, SpacedButton } from "../Material";
import downloadResume from "../../lib/downloadResume";
// Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";

interface PreviewControlsProps {
  resume: any;
  goTo: (path: string) => void;
  setShowPDFModal: (show: boolean) => void;
}

export const PreviewControls: FunctionComponent<PreviewControlsProps> = ({
  resume,
  goTo,
  setShowPDFModal,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      marginBottom={2}
    >
      {/* Back to overview */}
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => goTo(`/overview`)}
      >
        Back to overview
      </Button>
      <Box
        display="flex"
        justifyContent="flex-end"
        flexWrap="wrap"
        gridGap={8}
        marginLeft={2}
      >
        {/* Download as */}
        <DropdownButton
          variant="contained"
          actions={["PDF", "DOCX"]}
          startIcon={<GetAppIcon />}
          onClick={(action) => downloadResume(resume, action)}
        >
          Download as..
        </DropdownButton>
        {/* Preview */}
        <SpacedButton
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={() => setShowPDFModal(true)}
        >
          Preview
        </SpacedButton>
      </Box>
    </Box>
  );
};
