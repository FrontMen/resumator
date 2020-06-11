import React from "react";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import DropdownButton from "./DropdownButton";

const PreviewControls = ({ setShowPDFModal, goTo, onSaveClicked, id }) => {
  console.log(id);

  const onClickDropdown = (action) => {
    switch (action) {
      case "PDF": {
        window.open(`https://cryptic-ridge-60305.herokuapp.com/create?resume=${id}`);
        return;
      }
      case "DOCX": {
        window.open(`https://cryptic-ridge-60305.herokuapp.com/create?resume=${id}`);
        return;
      }
      default:
        return;
    }
  };
  return (
    <TopSide>
      <>
        <StyledButton
          onClick={() => goTo(`/overview`)}
          variant="contained"
          type="button"
        >
          Back to overview
        </StyledButton>
      </>

      <div>
        <DropdownButton
          label="Download as.."
          actions={["PDF", "DOCX"]}
          onClick={onClickDropdown}
        />
        <StyledButton
          onClick={() => {
            setShowPDFModal(true);
          }}
          variant="contained"
          type="button"
        >
          Preview
        </StyledButton>

        <StyledButton variant="contained" type="button">
          Share
        </StyledButton>
        <StyledButton
          onClick={onSaveClicked}
          variant="contained"
          type="button"
          color="primary"
        >
          Save
        </StyledButton>
      </div>
    </TopSide>
  );
};

const StyledButton = styled(Button)`
  margin: 0 8px;
`;

const TopSide = styled.div`
  display: flex;
  grid-gap: 8px;
  padding: 16px;
  justify-content: space-between;
`;

export default PreviewControls;
