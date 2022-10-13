import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

// icons
import { MdDragHandle } from "react-icons/md";

// types
import { ItemType } from "./test-data";
import { FaPlusCircle } from "react-icons/fa";

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

const PlaceholderContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: white;
  z-index: 1000;
`;

const AddButton = styled.button`
  border: 2px solid orange;
  padding: 2px;
  background-color: white;
  border-radius: 50%;
  color: orange;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(rgba(0, 0, 0, 0.16) 0px 2px 4px);
`;

export const PlaceholderItem = () => {
  return (
    <PlaceholderContainer>
      <AddButton>
        <FaPlusCircle size={32} />
      </AddButton>
    </PlaceholderContainer>
  );
};

// main component
type ItemProps = {
  item: ItemType;
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
          {item.name}
        </Container>
      )}
    </Draggable>
  );
};

export default Item;
