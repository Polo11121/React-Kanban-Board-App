import { CSSProperties, ReactNode } from 'react';
import { Droppable } from 'react-beautiful-dnd';

type CustomDroppableType = {
  children: ReactNode;
  id: string;
  isDisabled?: boolean;
  classes?: string;
  styles?: CSSProperties;
  testId?: string;
};

const CustomDroppable = ({
  children,
  id,
  isDisabled = false,
  styles,
  classes,
  testId,
}: CustomDroppableType) => (
  <Droppable isDropDisabled={isDisabled} key={id} droppableId={id}>
    {(droppableProvided) => (
      <div
        data-testid={testId}
        className={classes}
        style={styles}
        {...droppableProvided.droppableProps}
        ref={droppableProvided.innerRef}
      >
        {children}
        {droppableProvided.placeholder}
      </div>
    )}
  </Droppable>
);

export { CustomDroppable as Droppable };
