import React from "react";
import styled from "styled-components";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

// types
import { Collection, Unit } from "@prisma/client";

// icons
import { BsFillCaretDownFill } from "react-icons/bs";
import { IoIosHelpCircle } from "react-icons/io";
import { useForm } from "react-hook-form";

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

const Label = styled.label``;

const LabelText = styled.div`
  width: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: medium;
  font-weight: 500;
  margin-left: 0.25rem;
`;

const NameInput = styled.input`
  width: 100%;
  min-height: 45px;
  font-weight: 400;
  font-size: large;
  padding: 0.5rem;
  border: 1px blueviolet solid;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ParentSelect = styled.select`
  width: 100%;
  min-height: 45px;
  font-weight: 400;
  font-size: large;
  padding: 0.5rem;
  border: 1px blueviolet solid;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Submit = styled.input`
  width: 100%;
  height: 3rem;
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

const Title = styled.div`
  font-size: x-large;
  font-weight: 600;
  margin-top: 1rem;
`;

// form component
type FormProps = {
  parents: (Collection | Unit)[] | undefined;
  title: string;
  handleSubmit: () => void;
};

const Form: React.FC<FormProps> = ({ parents, title, handleSubmit }) => {
  const onSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <Label title="name">
        <LabelText>
          Name
          <IoIosHelpCircle color={"blueviolet"} size={22} className="ml-2" />
        </LabelText>
        <NameInput placeholder="Name" />
      </Label>
      {parents ? (
        <Label title="parent">
          <LabelText>
            Parent
            <IoIosHelpCircle color={"blueviolet"} size={22} className="ml-2" />
          </LabelText>
          <ParentSelect>
            {parents.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </ParentSelect>
        </Label>
      ) : null}
      <Submit type="submit" value={`ADD ${title.toUpperCase()}`} />
    </StyledForm>
  );
};

export type CollectionInput = { name: string };
type CollectionFormProps = {
  title: string;
  onSubmit: (data: CollectionInput) => void;
};

const CollectionForm: React.FC<CollectionFormProps> = ({ title, onSubmit }) => {
  const { register, handleSubmit } = useForm<{ name: string }>();

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Label title="name">
        <LabelText>
          Name
          <IoIosHelpCircle color={"blueviolet"} size={22} className="ml-2" />
        </LabelText>
        <NameInput placeholder="Name" {...register("name")} />
      </Label>
      <Submit type="submit" value={`ADD ${title.toUpperCase()}`} />
    </StyledForm>
  );
};

// main component
type BottomDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  open,
  onClose,
  children,
}) => {
  // const getSubmitType = (parents: (Collection | Unit)[] | undefined) => {
  //   if (parents && parents[0]) {
  //     switch (parents[0].type) {
  //       case "COLLECTION":
  //         return "Unit";
  //       case "UNIT":
  //         return "Item";
  //       default:
  //         return "Collection";
  //     }
  //   }

  //   return "Collection";
  // };

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
          {/* <Title>New {formType.toLowerCase()}</Title>
          {formType === "Collection" && (
            <CollectionForm
              title={formType}
              onSubmit={handleSubmitCollection}
            />
          )} */}
          {children}
        </Container>
      </Drawer>
    </>
  );
};

export default BottomDrawer;
