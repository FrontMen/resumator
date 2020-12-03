import React, { useContext } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useDocument } from "react-firebase-hooks/firestore";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { PDFTemplate } from "../../components/PDFTemplate/PDFTemplate";

const PDFTemplateWrapper = React.memo(
  ({ resume }) => {
    return (
      <PDFViewer width="100%" height="100%">
        <PDFTemplate resume={resume} />
      </PDFViewer>
    );
  },
  () => true // This fixes a weird lib bug -> https://github.com/diegomura/react-pdf/issues/420
);

PDFTemplateWrapper.displayName = "PDFTemplateWrapper";

const PdfPreviewer = (props) => {
  const { firebase } = useContext(FirebaseAppContext);
  const resumeId = props.match.params.id;
  const [resumeData, loading, error] = useDocument(
    firebase.firestore().doc(`resumes/${resumeId}`)
  );

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Document: Loading...</span>}
      {resumeData && <PDFTemplateWrapper resume={resumeData.data()} />}
    </>
  );
};

export default PdfPreviewer;
