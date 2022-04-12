import { CSSProperties, ReactNode } from 'react';
import { Draggable } from 'react-beautiful-dnd';

type CustomDraggableType = {
  children: ReactNode;
  id: string;
  index: number;
  classes?: string;
  styles?: CSSProperties;
  testId?: string;
  isDragDisabled?: boolean;
};

const CustomDraggable = ({
  children,
  id,
  index,
  classes,
  styles,
  testId,
  isDragDisabled = false,
}: CustomDraggableType) => {
  return (
    <Draggable isDragDisabled={isDragDisabled} draggableId={id} index={index}>
      {(draggableProvided) => (
        <div
          data-testid={testId}
          className={classes}
          style={styles}
          {...draggableProvided.dragHandleProps}
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export { CustomDraggable as Draggable };
