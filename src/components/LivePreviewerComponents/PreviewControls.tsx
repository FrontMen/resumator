import React, { FunctionComponent } from "react";
import { Box } from "@material-ui/core";
import { DropdownButton, SpacedButton } from "../Material";
import downloadResume from "../../lib/downloadResume";
// Icons
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";

interface PreviewControlsProps {
  resume: any;
  goTo: (path: string) => void;
  setShowPDFModal: (show: boolean) => void;
  showBackToLive?: boolean;
}

export const PreviewControls: FunctionComponent<PreviewControlsProps> = ({
  resume,
  setShowPDFModal,
  showBackToLive,
}) => {
  const history = useHistory();

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      marginBottom={2}
    >
      {showBackToLive && (
        <Box>
          <SpacedButton
            color="primary"
            variant="contained"
            onClick={() => history.push("/live/")}
          >
            Go to overview
          </SpacedButton>
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="flex-end"
        flexWrap="wrap"
        gridGap={15}
        marginLeft={2}
      >
        {/* Download as */}
        <DropdownButton
          variant="contained"
          actions={["PDF", "DOCX"]}
          startIcon={<GetAppIcon />}
          onClick={(action) => downloadResume(resume, action)}
          color="primary"
        >
          Download as..
        </DropdownButton>
        {/* Preview */}
        <SpacedButton
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={() => setShowPDFModal(true)}
          color="primary"
        >
          Preview
        </SpacedButton>
      </Box>
    </Box>
  );
};
