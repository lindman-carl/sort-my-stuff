import React from "react";
import styled from "styled-components";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

// icons
import { BsFillCaretDownFill } from "react-icons/bs";
import { Collection, Unit } from "@prisma/client";

// styled components
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  font-size: large;
`;

const CloseButton = styled.button`
  width: 6rem;
  height: 3rem;
  background-color: blueviolet;
  border-radius: 0 0 0.5rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 80vw;
`;

const Label = styled.label`
  font-weight: 600;
`;

const NameInput = styled.input`
  width: 100%;
  font-weight: 400;
  padding: 0.5rem;
`;

const ParentSelect = styled.select`
  width: 100%;
  font-weight: 400;
  padding: 0.5rem;
`;

const Submit = styled.input`
  width: 100%;
  height: 3rem;
  border: 1px solid purple;
  border-radius: 0.5rem;
  background-color: blueviolet;
  color: white;
  font-weight: 700;
  font-size: large;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  cursor: pointer;
`;

// form component

type FormProps = {
  parents: (Collection | Unit)[] | undefined;
};

const Form: React.FC<FormProps> = ({ parents }) => {
  return (
    <StyledForm>
      <Label title="name">
        Name
        <NameInput placeholder="Name" />
      </Label>
      {parents ? (
        <Label title="parent">
          Parent
          <ParentSelect>
            {parents.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </ParentSelect>
        </Label>
      ) : null}
      <Submit type="submit" value="ADD" />
    </StyledForm>
  );
};

// main component
type AddDrawerProps = {
  open: boolean;
  onClose: () => void;
  parents: (Collection | Unit)[] | undefined;
};

const AddDrawer: React.FC<AddDrawerProps> = ({ open, onClose, parents }) => {
  return (
    <>
      <Drawer
        open={open}
        direction={"bottom"}
        onClose={onClose}
        duration={150}
        zIndex={100000}
        size={"min-content"}
      >
        <Container>
          <CloseButton onClick={onClose}>
            <BsFillCaretDownFill size={28} color={"#fff"} />
          </CloseButton>
          <Form parents={parents} />
        </Container>
      </Drawer>
    </>
  );
};

export default AddDrawer;
