import React from "react";
import styled from "styled-components";

// icons
import { FaPlusCircle } from "react-icons/fa";

// styled components
const AddItemContainer = styled.div`
  padding: 0.5rem;
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

// main component
type AddItemProps = {
  onClick?: () => void;
};

const AddItem: React.FC<AddItemProps> = ({ onClick }) => {
  return (
    <AddItemContainer>
      <AddButton onClick={onClick}>
        <FaPlusCircle size={32} />
      </AddButton>
    </AddItemContainer>
  );
};

export default AddItem;
