import React, { FunctionComponent, useRef } from "react";
import { Chip, makeStyles } from "@material-ui/core";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";

interface FormSkillsSelectChipProps {
  label: string;
  index: number;
  onDrag: (sourceIndex: number, destinationIndex: number) => void;
  onDelete: (index: number) => void;
}

interface DragItem {
  type: string;
  index: number;
}

const DNDTYPE = "SkillsChip";
const useStyles = makeStyles({
  chip: {
    margin: "4px",
    backgroundColor: "#ffffff",
    cursor: "move",
    // Needed to keep the rounded edged when dragging
    transform: "translate(0, 0)",
  },
});

const FormSkillsSelectChip: FunctionComponent<FormSkillsSelectChipProps> = ({
  label,
  index,
  onDrag,
  onDelete,
}: FormSkillsSelectChipProps) => {
  const classes = useStyles();

  /**
   * Create a reference to attach to the Component used for dragging and dropping.
   */
  const ref = useRef(null);

  /**
   * Setup the chip drag handler.
   */
  const [, drag] = useDrag({
    item: { index, type: DNDTYPE },
  });

  /**
   * Setup the chip drop handler.
   */
  const [, drop] = useDrop({
    accept: DNDTYPE,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) return;

      const sourceIndex = item.index;
      const destinationIndex = index;

      // Don't replace items with themselves.
      if (sourceIndex === destinationIndex) return;

      const hoverBoundingRect = (ref.current! as Element).getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      // Take a % of the width and height.
      const hoverWidth = hoverBoundingRect.width * 0.3;
      const hoverHeight = hoverBoundingRect.height * 0.1;

      // Use the remaining % as hover hit box.
      const hoverTop = hoverBoundingRect.top + hoverHeight;
      const hoverRight = hoverBoundingRect.right - hoverWidth;
      const hoverBottom = hoverBoundingRect.bottom - hoverHeight;
      const hoverLeft = hoverBoundingRect.left + hoverWidth;

      // Only drag when the position matches the hover hit box.
      if (clientOffset.x < hoverLeft || clientOffset.x > hoverRight) return;
      if (clientOffset.y < hoverTop || clientOffset.y > hoverBottom) return;

      onDrag(sourceIndex, destinationIndex);
      item.index = destinationIndex;
    },
  });

  // Enable drag & drop.
  drag(drop(ref));

  return (
    <Chip
      size="small"
      variant="outlined"
      color="secondary"
      className={classes.chip}
      ref={ref}
      label={label}
      onDelete={() => onDelete(index)}
      // Stop propagation of the mouse event to avoid it being swallowed by the autocomplete.
      // If the event is swallowed, drag & drop doesn't work.
      onMouseDown={(event) => event.stopPropagation()}
    />
  );
};

export default FormSkillsSelectChip;
