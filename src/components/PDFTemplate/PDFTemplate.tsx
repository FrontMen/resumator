import React, { FunctionComponent } from "react";
import { Document, Font, Page, View, StyleSheet } from "@react-pdf/renderer";
import { PDFEducation, PDFHeader, PDFIntroduction, PDFProjects, PDFSkills, PDFSideProjects, PDFWorkExperience } from "../PDFBuilderComponents";
import Stratum1 from "../../assets/fonts/Stratum1-Bold.ttf";
import Tillium from "../../assets/fonts/Titillium_Web/TitilliumWeb-Light.ttf";
import Resume from "../../../types/Resume";

Font.register({ family: "Stratum", src: Stratum1 });
Font.register({
  family: "Titillium Web",
  format: "truetype",
  src: Tillium,
});
Font.registerHyphenationCallback(word => [word]);

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
});

interface PDFTemplateProps {
  resume: Resume;
}

export const PDFTemplate: FunctionComponent<PDFTemplateProps> = ({ resume }) => {
  return (
    <Document>
      <Page size="A4" style={styles.container}>
        <PDFHeader
          avatar={resume.personalia.avatar}
          name={resume.personalia.firstName}
          city={resume.personalia.city}
          dateOfBirth={resume.personalia.dateOfBirth}
        />

        <View style={styles.row}>
          <View>
            <PDFIntroduction introduction={resume.introduction} />
            <PDFSkills skills={resume.skills} />
            <PDFEducation education={resume.education} />
            <PDFSideProjects type="openSource" sideProjects={resume.sideProjects} />
            <PDFSideProjects type="publications" sideProjects={resume.publications} />
          </View>

          <View>
            <PDFProjects projects={resume.projects} />
            <PDFWorkExperience experience={resume.experience} />
          </View>
        </View>
      </Page>
    </Document>
  );
};
