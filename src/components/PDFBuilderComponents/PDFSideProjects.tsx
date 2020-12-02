import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { SideProject } from "../../../types/Resume";

const styles = StyleSheet.create({
  container: {
    width: 200,
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#e0e0e0",
    fontSize: 9,
  },
  title: {
    color: "#ff450d",
    fontSize: 10,
  },
  sideProjectContainer: {
    margin: "5px 0",
  },
  sideProjectTitle: {
    marginBottom: 2,
    fontFamily: "Stratum",
    fontSize: 10,
  },
  sideProjectLink: {
    marginTop: 2,
    color: "#181626",
    fontSize: 8,
  },
});

interface PDFSideProjectsProps {
  sideProjects: SideProject[];
  type: string;
}

export const PDFSideProjects: FunctionComponent<PDFSideProjectsProps> = ({ sideProjects, type }) =>{
  if (sideProjects.length > 0) return (
    <View style={styles.container} wrap={false}>
      <Text style={styles.title}>{type === "openSource" ? "OPEN SOURCE" : "PUBLICATIONS"}</Text>
      {sideProjects.map((sideProjectItem, index) => (
        <View key={index} style={styles.sideProjectContainer}>
          <Text style={styles.sideProjectTitle}>{sideProjectItem.title}</Text>
          <Text>{sideProjectItem.description}</Text>
          <Text style={styles.sideProjectLink}>{sideProjectItem.link}</Text>
        </View>
      ))}
    </View>
  );

  return null;
}
