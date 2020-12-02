import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDFDescription } from "./PDFDescription";
import { getTimespan } from "../../lib/date";
import { Project, Skill } from "../../../types/Resume";

const styles = StyleSheet.create({
  container: {
    width: 300,
    margin: "6px 0",
    fontSize: 9,
  },
  title: {
    marginBottom: 2,
    fontFamily: "Stratum",
    fontSize: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  skillsContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 4,
    paddingRight: 30,
    marginTop: 6,
    backgroundColor: "#e0e0e0",
    color: "#5a5b5e",
    fontSize: 8,
  },
});

interface PDFProjectsExperienceCardProps {
  project: Project;
}

export const PDFProjectsExperienceCard: FunctionComponent<PDFProjectsExperienceCardProps> = ({ project }) => {
  const renderSkills = (skills: Skill[]) => {
    if (skills && skills.length > 0) return (
      <View style={styles.skillsContainer}>
        <Text>Skills: </Text>
        <Text>{skills.map(skill => skill.name).join(", ")}</Text>
      </View>
    );

    return null;
  }

  return (
    <View style={styles.container} wrap={false}>
      <Text style={styles.title}>{project.role}</Text>
      <View style={styles.row}>
        <Text>{project.company}</Text>
        <Text>{getTimespan(project.startDate, project.endDate, "MMMM yyyy")}</Text>
      </View>
      <PDFDescription description={project.description} />
      {renderSkills(project.stackAndTechniques)}
    </View>
  );
}
