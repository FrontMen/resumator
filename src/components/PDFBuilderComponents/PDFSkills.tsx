import React, { FunctionComponent } from "react";
import { Image, View, Text, StyleSheet } from "@react-pdf/renderer";
import { Skill } from "../../../types/Resume";
import angularBadge from "../../assets/images/angularBadge.png";
import nodeBadge from "../../assets/images/nodeBadge.png";
import cssBadge from "../../assets/images/cssBadge.png";

const styles = StyleSheet.create({
  container: {
    width: 200,
    padding: 20,
    marginBottom: 15,
    backgroundColor: "#181626",
    color: "#ffffff",
    fontSize: 9,
  },
  title: {
    color: "#19c3c0",
    fontSize: 10,
  },
  badgeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "10px 0",
  },
  badge: {
    width: "22%",
  },
  subtitle: {
    fontSize: 7.5,
    marginBottom: 10,
  },
  skillContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  skillDot: {
    width: 4,
    height: 4,
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: "#ff450d",
  }
});

interface PDFSkillsProps {
  skills: Skill[];
}

export const PDFSkills: FunctionComponent<PDFSkillsProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SKILLS</Text>
      <View style={styles.badgeContainer}>
        {/* TODO: Badges based on skills? */}
        <Image style={styles.badge} src={angularBadge} />
        <Image style={styles.badge} src={nodeBadge} />
        <Image style={styles.badge} src={cssBadge} />
      </View>
      <Text style={styles.subtitle}>LANGUAGES - FRAMEWORKS - LIBRARIES</Text>
      {skills.map((skill) => {
        return (
          <View key={skill.name} style={styles.skillContainer}>
            <View style={styles.skillDot} />
            <Text>{skill.name}</Text>
          </View>
        );
      })}
    </View>
  );
}
