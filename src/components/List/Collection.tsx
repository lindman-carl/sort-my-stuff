import React, { useState } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

// components
import Unit from "./Unit";

// icons
import { FaBoxOpen, FaBox } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { MdDragHandle } from "react-icons/md";

// types
import { CollectionType, ItemType, UnitType } from "./test-data";

// styled components
const Container = styled.div`
  min-width: 90vw;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  background-color: rgba(164, 189, 151, 1);
  /* background-color: white; */
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const TitleContainer = styled.div`
  padding: 1rem;
  color: white;
  background-color: green;
  font-weight: 700;
  font-size: 20pt;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div``;

const BoxButton = styled.button`
  padding: 0.5rem;
  background-color: transparent;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
`;

const AddUnit = styled.div`
  margin: 2rem auto;
  min-height: 6rem;
  width: 75%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.5);
  border: 3px dashed rgba(255, 255, 255, 0.5);
`;

const Icon = styled.div`
  /* border: 2px dashed rgba(255, 255, 255, 0.5); */
  border-radius: 50%;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DragHandle = styled.div`
  padding: 0 1rem 0 0;
`;

const UnitList = styled.div``;

// main component
type CollectionProps = {
  collection: CollectionType;
  units: UnitType[];
  items: ItemType[];
  index: number;
};

const Collection: React.FC<CollectionProps> = ({
  collection,
  units,
  items,
  index,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Draggable draggableId={collection.id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <TitleContainer>
            <DragHandle {...provided.dragHandleProps}>
              <MdDragHandle />
            </DragHandle>
            <Title>{collection.name}</Title>
            <BoxButton onClick={() => setIsOpen((prev) => !prev)}>
              {isOpen ? <FaBox size={24} /> : <FaBoxOpen size={24} />}
            </BoxButton>
          </TitleContainer>

          {isOpen && (
            <Droppable droppableId={collection.id} type="unit">
              {(provided) => (
                <UnitList
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  // isDraggingOver={snapshot.isDraggingOver}
                >
                  {units && units.length > 0 ? (
                    units.map((unit, index) => {
                      const unitItems = items
                        .filter((el) => unit.itemIds.includes(el.id))
                        .sort(
                          (a, z) =>
                            unit.itemIds.indexOf(a.id) -
                            unit.itemIds.indexOf(z.id)
                        );

                      return (
                        <Unit
                          key={unit.id}
                          unit={unit}
                          index={index}
                          items={unitItems}
                        />
                      );
                    })
                  ) : (
                    <AddUnit>
                      <Icon>
                        <BiImport size={48} />
                      </Icon>
                    </AddUnit>
                  )}
                  {provided.placeholder}
                </UnitList>
              )}
            </Droppable>
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default Collection;
