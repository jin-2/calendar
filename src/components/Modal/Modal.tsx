"use client";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {createPortal(
        <StyledDim>
          <StyledModalContainer>
            <StyledModalContent>
              <button type="button" onClick={onClose}>
                닫기
              </button>
              {children}
            </StyledModalContent>
          </StyledModalContainer>
        </StyledDim>,
        document.body
      )}
    </>
  );
};

export default Modal;

const StyledModalContainer = styled.div`
  overflow-y: auto;
  max-height: 100vh;
  min-height: 100%;
`;

const StyledModalContent = styled.div`
  position: relative;
  z-index: 101;
  width: 750px;
  margin: 50px auto;
  min-height: calc(100vh - 100px);
  background: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
`;

const StyledDim = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;
