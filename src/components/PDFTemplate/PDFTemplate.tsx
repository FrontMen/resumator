import React from "react";
import { Document, Font, Page, View } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import Stratum1 from "../../assets/fonts/Stratum1-Bold.ttf";
import Tillium from "../../assets/fonts/Titillium_Web/TitilliumWeb-Light.ttf";
import {
  PDFEducation,
  PDFHeader,
  PDFIntroduction,
  PDFProjects,
  PDFSkills,
  PDFWorkExperience,
} from "../PDFBuilderComponents";
import { PDFSideProjects } from "../PDFBuilderComponents/PDFSideProjects";
import Resume from "../../../types/Resume";

Font.register({ family: "Stratum", src: Stratum1 });
Font.register({
  family: "Titillium Web",
  format: "truetype",
  src: Tillium,
});

const CustomPage = styled(Page)`
  padding: 20px;
`;

const FlexView = styled(View)`
  display: flex;
  flex-direction: row;
`;

type Props = {
  resume: Resume;
};

const PDFTemplate: React.FC<Props> = React.memo(
  ({ resume }) => {
    return (
      <Document>
        <CustomPage size="A4">
          <PDFHeader
            avatar={resume.personalia.avatar}
            name={resume.personalia.firstName}
            city={resume.personalia.city}
            dateOfBirth={resume.personalia.dateOfBirth}
          />

          <FlexView>
            <View>
              <PDFIntroduction introduction={resume.introduction} />
              <PDFSkills skills={resume.skills} />
              <PDFEducation education={resume.education} />
              <PDFSideProjects
                type="openSource"
                sideProjects={resume.sideProjects}
              />
              <PDFSideProjects sideProjects={resume.publications} />
              <View style={{ width: "200px", height: "100vh" }}></View>
            </View>

            <View>
              <PDFProjects projects={resume.projects} />
              <PDFWorkExperience experience={resume.experience} />
            </View>
          </FlexView>
        </CustomPage>
      </Document>
    );
  },
  () => true // This fixes a weird lib bug -> https://github.com/diegomura/react-pdf/issues/420
);

PDFTemplate.displayName = "PDFTemplate";

export default PDFTemplate;
