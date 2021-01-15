import React, { useContext, useState, FunctionComponent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { PreviewControls } from "./PreviewControls";
import { TopSection, PersonaliaModel } from "./TopSection";
import { Experience } from "./Experience";
import { ExperienceModel } from "./ExperienceItem";
import { Skills, SkillModel } from "./Skills";
import { SideProjects } from "./SideProjects";
import { SideProjectModel } from "./SideProjectItem";
import { Education } from "./Education";
import { EducationModel } from "./EducationItem";
import PDFPreviewModal from "./PDFPreviewModal";

interface LivePreviewerTemplateProps {
  data: {
    id: string;
    personalia: PersonaliaModel;
    introduction: string;
    projects: ExperienceModel[];
    experience: ExperienceModel[];
    skills: SkillModel[];
    sideProjects: SideProjectModel[];
    publications: SideProjectModel[];
    education: EducationModel[];
  };
}

const LivePreviewerTemplate: FunctionComponent<LivePreviewerTemplateProps> = ({
  data,
}) => {
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [dataState, setDataState] = useState(data);
  const history = useHistory();
  const { firebase } = useContext(FirebaseAppContext);

  const goTo = (path: string) => history.push(path);

  const onSubmitSection = (sectionKey: string, values: any) => {
    console.log(sectionKey, values);
    setDataState((prevState) => ({
      ...prevState,
      [sectionKey]: values,
    }));
  };

  useEffect(() => {
    const storeResume = async () => {
      try {
        if (dataState.id) {
          const resumesRef = (firebase as any) // Remove this when typings are provided for the Firebase context.
            .firestore()
            .collection("resumes")
            .doc(dataState.id);
          await resumesRef.update({
            ...dataState,
            isImport: false, // explicitly remove database import flag, but only when saving to firestore
          });
        } else {
          const resumesRef = (firebase as any)
            .firestore()
            .collection("resumes")
            .doc();
          await resumesRef.set(dataState);
        }
      } catch (e) {
        alert(`Error writing document. ${e.message}`);
      }
    };
    storeResume();
  }, [dataState, firebase]);

  return (
    <>
      <PreviewControls
        goTo={goTo}
        setShowPDFModal={setShowPDFModal}
        resume={dataState}
      />
      <TopSection
        personalia={{
          ...dataState.personalia,
          introduction: dataState.introduction,
        }}
        onSubmit={(data) => {
          const { introduction, ...personalia } = data;
          onSubmitSection("personalia", personalia);
          onSubmitSection("introduction", introduction);
        }}
      />
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        marginTop={1}
        // gridGap does not use the material spacing system, so 8 is needed here for 8px.
        gridGap={8}
      >
        {/* Left column */}
        <Box display="flex" flexDirection="column" flex={2} gridGap={8}>
          <Experience
            type="Projects"
            experience={dataState.projects}
            onSubmit={(data) => onSubmitSection("projects", data)}
          />
          <Experience
            type="Work Experience"
            experience={dataState.experience}
            onSubmit={(data) => onSubmitSection("experience", data)}
          />
        </Box>
        {/* Right column */}
        <Box display="flex" flexDirection="column" flex={1} gridGap={8}>
          <Skills
            skills={dataState.skills}
            onSubmit={(data) => onSubmitSection("skills", data)}
          />
          <SideProjects
            type="Side projects"
            projects={dataState.sideProjects}
            onSubmit={(data) => onSubmitSection("sideProjects", data)}
          />
          <SideProjects
            type="Publications"
            projects={dataState.publications}
            onSubmit={(data) => onSubmitSection("publications", data)}
          />
          <Education
            education={dataState.education}
            onSubmit={(data) => onSubmitSection("education", data)}
          />
        </Box>
      </Box>

      <PDFPreviewModal
        data={dataState}
        setShowPDFModal={setShowPDFModal}
        showPDFModal={showPDFModal}
      />
    </>
  );
};

export default LivePreviewerTemplate;
