import React from "react";
import { Box, Flex } from "rebass";
import data from "../../mock/mock.json";
import {
  ResumeHeader,
  ResumeAbout,
  ResumeExperience,
  ResumeSkills,
  ResumeEducation,
} from "../../components/ResumeComponents";

const HTMLPreviewer = () => {
  const [resume, SetResume] = React.useState();

  // Using an effect hook is now an assumption on how we will fetch data form API
  // Can be refactored later when real API comes in
  React.useEffect(() => {
    SetResume(data);
  }, []);

  const resumeView = () => {
    // TODO map data from api and create new data object
    if (resume) {
      // eslint-disable-next-line no-console
      console.log(resume.projects[0].stackAndTechniques.length - 1);
      // eslint-disable-next-line no-console
      console.log(resume.projects[2].stackAndTechniques.length - 1);
    }
    return resume ? (
      <>
        <ResumeHeader
          name={resume.personalia.firstName}
          city={resume.personalia.city}
        />
        <Flex>
          <Box minWidth={300}>
            <ResumeAbout width={1 / 4} text={resume.introduction} />
            <ResumeSkills skills={resume.skills} />
            <ResumeEducation />
          </Box>
          <ResumeExperience width={3 / 2} experience={resume.experience} />
        </Flex>
      </>
    ) : (
      <div>...loading</div>
    );
  };
  return (
    <Box>
      <Flex
        width={1000}
        justifyContent="center"
        p="2rem"
        color="white"
        bg="white"
        textAlign="left"
        mb={50}
      >
        <Box color="secondary" mb="3">
          <div id="printArea">{resumeView()}</div>
        </Box>
      </Flex>
    </Box>
  );
};

export default HTMLPreviewer;
