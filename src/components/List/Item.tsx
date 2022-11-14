import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

// icons
import { MdDragHandle } from "react-icons/md";

// types
import { Item } from "@prisma/client";

// styled componets
const Container = styled.div<{ isDragDisabled: boolean; isDragging: boolean }>`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  background-color: ${(props) =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
`;

const DragHandle = styled.div`
  padding: 0 1rem 0 0;
`;

// main component
type ItemProps = {
  item: Item;
  index: number;
  isDragDisabled?: boolean;
};

const Item: React.FC<ItemProps> = ({ item, index, isDragDisabled = false }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragDisabled={isDragDisabled}
          isDragging={snapshot.isDragging}
        >
          <DragHandle {...provided.dragHandleProps}>
            <MdDragHandle />
          </DragHandle>
          {item.name} - {item.id}
        </Container>
      )}
    </Draggable>
  );
};

export default Item;
