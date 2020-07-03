import React from "react";
import useResume from "../../utils/useResume";
import styled from "@emotion/styled";
import LivePreviewerTemplate from "../../components/LivePreviewerComponents/LivePreviewerTemplate";
import Skeleton from "@material-ui/lab/Skeleton";
import Experience from "../../components/LivePreviewerComponents/Experience";

const Evaluation = (props) => {
    return (
        <EvaluationContainer>
            <label>scsd</label>
        {/* <Experience
            type="Projects"
            // onEditHandler={(values) => onEditSectionItem("projects", values)}
            // onDeleteHandler={(values) => onDeleteSectionItem("projects", values)}
            // onSubmit={(values) => onAddNewItemForSectionHandler("projects", values)}
            experience={[]}
          /> */}
        </EvaluationContainer>
    );
    };
const StyledSkeleton = styled(Skeleton)`
  margin: 8px auto;
`;

const EvaluationContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1440px;
`;

export default Evaluation;
