import React, { FunctionComponent } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import styled from "@emotion/styled";
import { Modal, makeStyles, Box } from "@material-ui/core";
import { PDFTemplate } from "../PDFTemplate/PDFTemplate";
import Resume from "../../../types/Resume";

const useStyles = makeStyles({
  wrapper: {
    height: "100%",
    maxWidth: 1440,
    padding: 32,
    margin: "0 auto",

    "&:focus": {
      outline: "none",
    },
  },
});

interface PDFPreviewModalProps {
  showPDFModal: boolean;
  setShowPDFModal: (show: boolean) => void;
  data: Resume;
}

export const PDFPreviewModal: FunctionComponent<PDFPreviewModalProps> = ({ showPDFModal, setShowPDFModal, data }) => {
  const classes = useStyles();

  if (!showPDFModal || !data) return null;

  return (
    <Modal
      open={showPDFModal}
      onClose={() => setShowPDFModal(false)}
      aria-labelledby="PDF Preview"
      aria-describedby="PDF Preview"
    >
      <Box className={classes.wrapper}>
        <PDFViewer width="100%" height="100%">
          <PDFTemplate resume={data} />
        </PDFViewer>
      </Box>
    </Modal>
  );
};
