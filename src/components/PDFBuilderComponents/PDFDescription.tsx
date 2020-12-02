import React, { FunctionComponent } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { convertFromRaw, convertToRaw, EditorState, RawDraftContentBlock } from "draft-js";

const styles = StyleSheet.create({
  container: {
    fontSize: 9,
  },
  block: {
    marginTop: 5,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  underline: {
    textDecoration: "underline",
  },
  italic: {
    fontFamily: "Times-Italic",
  },
  "unordered-list-item": {
    paddingLeft: 10,
    marginTop: 0,
  },
  "ordered-list-item": {
    paddingLeft: 10,
    marginTop: 0,
  }
});

interface PDFDescriptionProps {
  description: string;
}

export const PDFDescription: FunctionComponent<PDFDescriptionProps> = ({ description }) => {
  let richText;
  let counter = 0;
  
  const generateInlineStyle = (block: RawDraftContentBlock) => {
    const inlineStyleRanges = block.inlineStyleRanges;
    const text = block.text;
    let nestedTexts = [];
    let offset = 0;
  
    if (inlineStyleRanges.length === 0) return block.text;
  
    for (let i = 0; i < inlineStyleRanges.length; i++) {
      const inlineStyle = inlineStyleRanges[i];
      const extractUnstyledText = text.slice(offset, inlineStyle.offset);
      const extractStyledText = text.slice(
        inlineStyle.offset,
        inlineStyle.offset + inlineStyle.length
      );
  
      offset = inlineStyle.offset + inlineStyle.length;
      nestedTexts.push(<Text>{extractUnstyledText}</Text>);
  
      let styledText;
      switch (inlineStyle.style) {
        case "UNDERLINE":
          styledText = <Text style={styles.underline}>{extractStyledText}</Text>;
          break;
        case "ITALIC":
          styledText = <Text style={styles.italic}>{extractStyledText}</Text>;
          break;
        case "BOLD":
          styledText = <Text style={styles.bold}>{extractStyledText}</Text>;
          break;
        default:
          styledText = <Text></Text>;
          break;
      }
  
      nestedTexts.push(styledText);
    }
  
    return nestedTexts;
  };
  
  const generatePrefix = (block: RawDraftContentBlock, counter: number) => {
    if (block.type === "unordered-list-item") return "- ";
    if (block.type === "ordered-list-item") return `${counter}. `;
  };

  // Parse the description.
  try {
    const parsed = convertFromRaw(JSON.parse(description));
    const editor = EditorState.createWithContent(parsed);
    richText = convertToRaw(editor.getCurrentContent());
  } catch (err) { }

  if (!richText) return <Text style={styles.block}>{description}</Text>
  
  return (
    <View style={styles.container}>
      {richText.blocks.map((block, index) => {
        if (block.type === "ordered-list-item") counter += 1;
        else counter = 0;

        return (
          <Text key={`${index}`} style={[styles.block, styles[block.type]]}>
            {generatePrefix(block, counter)}
            {generateInlineStyle(block)}
          </Text>
        );
      })}
    </View>
  );
};
