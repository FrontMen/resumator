import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import styled from "@emotion/styled";
import Modal from "@material-ui/core/Modal";
import { PDFTemplate } from "../PDFTemplate/PDFTemplate";

const PDFPreviewModal = ({ showPDFModal, setShowPDFModal, data }) => {
  if (showPDFModal && data) {
    return (
      <Modal
        open={showPDFModal}
        onClose={() => setShowPDFModal(false)}
        aria-labelledby="PDF Preview"
        aria-describedby="PDF Preview"
      >
        <ModalContent>
          <PDFViewer width="100%" height="100%">
            <PDFTemplate resume={data} />
          </PDFViewer>
        </ModalContent>
      </Modal>
    );
  }
  return null;
};

const ModalContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px;
  height: 100%;

  &:focus {
    outline: none;
  }
`;

export default PDFPreviewModal;
