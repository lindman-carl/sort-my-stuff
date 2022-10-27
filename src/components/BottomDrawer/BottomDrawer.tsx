import React from "react";
import styled from "styled-components";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

// icons
import { BsFillCaretDownFill } from "react-icons/bs";

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
          {children}
        </Container>
      </Drawer>
    </>
  );
};

export default BottomDrawer;
