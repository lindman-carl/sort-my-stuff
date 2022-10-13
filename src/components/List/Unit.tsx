import React, { useState } from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";

// icons
import { FaBox, FaBoxOpen } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdDragHandle } from "react-icons/md";
import { TbArrowsDownUp } from "react-icons/tb";

// components
import Item, { PlaceholderItem } from "./Item";

// types
import { UnitType, ItemType } from "./test-data";

const Container = styled.div`
  background-color: rgba(242, 205, 151, 1);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  width: 90vw;
`;

const TitleContainer = styled.div`
  align-items: center;
  background-color: orange;
  color: rgba(102, 52, 38, 1);
  display: flex;
  flex-direction: row;
  font-size: 16pt;
  font-weight: bold;
  justify-content: start;
  padding: 1rem;
`;

const Title = styled.div`
  flex-grow: 1;
  padding-left: 1rem;
`;

const TitleButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: end;
  gap: 4px;
  padding: 0 1rem;
`;

const TitleButton = styled.button<{
  wide?: boolean;
  left?: boolean;
  right?: boolean;
}>`
  padding: 6px ${(props) => (props.wide ? "2rem" : "6px")};
  background-color: orange;
  border: 2px solid white;
  border-top-left-radius: ${(props) => (props.left ? "0.35rem" : 0)};
  border-bottom-left-radius: ${(props) => (props.left ? "0.35rem" : 0)};
  border-top-right-radius: ${(props) => (props.right ? "0.35rem" : 0)};
  border-bottom-right-radius: ${(props) => (props.right ? "0.35rem" : 0)};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  transition: transform 0.2s ease-in-out;

  &:active {
    scale: 0.95;
  }
`;

const DragHandle = styled.div`
  padding: 0 1rem 0 0;
`;

const ItemList = styled.div<{ isDraggingOver: boolean }>`
  background-color: ${(props) =>
    props.isDraggingOver ? "lightgrey" : "inherit"};
  border-bottom: 0;
  border-top: 0;
  border: lightgrey solid 1px;
  flex-grow: 1;
  margin: 0 1rem;
  transition: background-color ease 0.2s;
`;

// main component
type UnitProps = {
  unit: UnitType;
  items: ItemType[];
  index: number;
};

const Unit: React.FC<UnitProps> = ({ unit, items, index }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  if (!items) {
    return <>no items in unit</>;
  }

  return (
    <Draggable draggableId={unit.id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <TitleContainer>
            <DragHandle {...provided.dragHandleProps}>
              <MdDragHandle />
            </DragHandle>
            <Title>{unit.name}</Title>
            <TitleButtons>
              <TitleButton left>
                <TbArrowsDownUp size={28} />
              </TitleButton>
              <TitleButton>
                <IoMdSettings size={28} />
              </TitleButton>
              <TitleButton
                right
                wide
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {isOpen ? <FaBox size={28} /> : <FaBoxOpen size={28} />}
              </TitleButton>
            </TitleButtons>
          </TitleContainer>
          {isOpen && (
            <Droppable droppableId={unit.id} type="item">
              {(provided, snapshot) => (
                <ItemList
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {items.map((item, index) => (
                    <Item key={item.id} item={item} index={index} />
                  ))}
                  {provided.placeholder}
                  <PlaceholderItem />
                </ItemList>
              )}
            </Droppable>
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default Unit;
