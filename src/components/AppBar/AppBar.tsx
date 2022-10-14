import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  position: sticky;
  top: 0;
  background-color: slategray;
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const Title = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  grid-column: 2;
  width: 100%;
  color: white;
  font-weight: 800;
  font-size: x-large;
`;

const SaveButton = styled.button`
  border: 2px solid white;
  border-radius: 0.35rem;
  background-color: blueviolet;
  padding: 0.75rem 1rem;
  grid-column: 3;
  justify-self: end;
  margin-right: 2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: smaller;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  transition: all ease-in-out 0.1s;
  &:active {
    scale: 0.95;
  }
`;

const AppBar = () => {
  return (
    <Container>
      <Title>
        Sort my&nbsp;<del className="text-slate-300">&nbsp;shit&nbsp;</del>
        &nbsp;stuff
      </Title>
      <SaveButton>Save Changes</SaveButton>
    </Container>
  );
};

export default AppBar;
