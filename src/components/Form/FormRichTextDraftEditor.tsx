import React, {
  FunctionComponent,
  MouseEvent,
  ReactNode,
  useRef,
  useState,
} from "react";
import { Box, Divider, makeStyles } from "@material-ui/core";
import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { TooltipIconButton } from "../Material";
// Icons
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";

interface FormRichTextDraftEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const useStyles = makeStyles({
  editor: {
    "& .DraftEditor-root": {
      padding: "4.5px",
      height: "unset",
      overflow: "auto",
    },
    "& ul, ol": {
      margin: 0,
    },
  },
  verticalDivider: {
    margin: "0 4px",
    height: "80%",
  },
});

export const FormRichTextDraftEditor: FunctionComponent<FormRichTextDraftEditorProps> = ({
  value,
  onChange,
}) => {
  const classes = useStyles();
  let content;

  // Setup the editor.
  try {
    content = convertFromRaw(JSON.parse(value));
  } catch (err) {
    // If parsing fails, treat it as a raw text string.
    const { contentBlocks, entityMap } = convertFromHTML(value);
    content = ContentState.createFromBlockArray(contentBlocks, entityMap);
  }

  const editorRef = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(content)
  );

  const handleFocus = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    editorRef?.current?.focus();
  };

  /**
   * Save the changes to the form when focus is lost.
   */
  const handleBlur = () => {
    const raw = convertToRaw(editorState.getCurrentContent());
    onChange(JSON.stringify(raw));
  };

  const renderBlockTypeButton = (type: string, tooltip: string, icon: ReactNode) => (
    <TooltipIconButton
      tooltip={tooltip}
      active={hasBlockType(type)}
      onClick={() => toggleBlockType(type)}
      onMouseDown={(event) => event.preventDefault()}
    >
      {icon}
    </TooltipIconButton>
  );

  /**
   * Set a block type on the current cursor location or selected text.
   */
  const toggleBlockType = (type: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };

  const hasBlockType = (type: string) => {
    const selection = editorState.getSelection();
    const block = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey());
    return block.getType() === type;
  };

  const renderStyleButton = (style: string, tooltip: string, icon: ReactNode) => (
    <TooltipIconButton
      tooltip={tooltip}
      active={hasStyle(style)}
      onClick={() => toggleStyle(style)}
      onMouseDown={(event) => event.preventDefault()}
    >
      {icon}
    </TooltipIconButton>
  );

  /**
   * Set a style on the current cursor location or selected text.
   */
  const toggleStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const hasStyle = (style: string) => editorState.getCurrentInlineStyle().has(style);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gridGap={4}
      className={classes.editor}
      paddingX={1}
      paddingY={1}
      height={400}
      flex={1}
      onClick={handleFocus}
      onBlur={handleBlur}
    >
      {/* Styling options */}
      <Box display="flex" flexDirection="row" alignItems="center">
        {/* Unordered list */}
        {renderBlockTypeButton(
          "unordered-list-item",
          "Unordered List",
          <FormatListBulletedIcon fontSize="small" />
        )}
        {/* Ordered list */}
        {renderBlockTypeButton(
          "ordered-list-item",
          "Ordered List",
          <FormatListNumberedIcon fontSize="small" />
        )}
        <Divider orientation="vertical" className={classes.verticalDivider} />
        {/* Bold */}
        {renderStyleButton("BOLD", "Bold", <FormatBoldIcon fontSize="small" />)}
        {/* Italic */}
        {renderStyleButton(
          "ITALIC",
          "Italic",
          <FormatItalicIcon fontSize="small" />
        )}
        {/* Underlined */}
        {renderStyleButton(
          "UNDERLINE",
          "Underlined",
          <FormatUnderlinedIcon fontSize="small" />
        )}
      </Box>
      <Divider />
      <Editor
        spellCheck
        ref={editorRef}
        editorState={editorState}
        onChange={(state) => setEditorState(state)}
      />
    </Box>
  );
};
