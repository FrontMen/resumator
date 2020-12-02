import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Experience } from "../../../types/Resume";
import { PDFProjectsExperienceCard } from "./PDFProjectsExperienceCard";

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginBottom: 15,
    fontSize: 9,
  },
  title: {
    color: "#ff450d",
    fontSize: 10,
  },
});

interface PDFWorkExperienceProps {
  experience: Experience[];
}

export const PDFWorkExperience: FunctionComponent<PDFWorkExperienceProps> = ({ experience }) => {
  return (
    <View style={styles.container} wrap={true}>
      <Text style={styles.title}>WORK EXPERIENCE</Text>
      {experience.map((project, index) => {
        return (
          <PDFProjectsExperienceCard key={index} project={project} />
        );
      })}
    </View>
  );
}
