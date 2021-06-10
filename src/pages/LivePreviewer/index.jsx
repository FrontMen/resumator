import React from "react";
import useResume from "../../hooks/useResume";
import styled from "@emotion/styled";
import LivePreviewerTemplate from "../../components/LivePreviewerComponents/LivePreviewerTemplate";
import Skeleton from "@material-ui/lab/Skeleton";
import { Card } from "@material-ui/core";

const LivePreviewer = (props) => {
  const [data, loading, error] = useResume(props.match.params.id);

  if (!props.match.params.id) {
    return (
      <LivePreviewContainer>
        <Card>
          <h2 style={{ textAlign: "center" }}>No resume to show</h2>
        </Card>
      </LivePreviewContainer>
    );
  }

  if (error) {
    return <LivePreviewContainer>Something went wrong</LivePreviewContainer>;
  }

  if (loading || (data && data.id !== props.match.params.id && !data.isImport)) {
    return (
      <div>
        <StyledSkeleton animation="wave" variant="rect" width={1200} height={50} />
        <StyledSkeleton animation="wave" variant="rect" width={1200} height={200} />
        <StyledSkeleton animation="wave" variant="rect" width={1200} height={200} />

        <StyledSkeleton animation="wave" variant="rect" width={1200} height={300} />

        <StyledSkeleton animation="wave" variant="rect" width={1200} height={500} />
        <StyledSkeleton animation="wave" variant="rect" width={1200} height={500} />
      </div>
    );
  }
  if (data && (data.id === props.match.params.id || data.isImport)) {
    return (
      <LivePreviewContainer>
        <LivePreviewerTemplate data={{ ...data, id: props.match.params.id }} />
      </LivePreviewContainer>
    );
  }
  return null;
};
const StyledSkeleton = styled(Skeleton)`
  margin: 8px auto;
`;

const LivePreviewContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1200px;
`;

export default LivePreviewer;
