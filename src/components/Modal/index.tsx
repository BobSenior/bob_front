import { ModalContainer } from "./styles";
import { FC, useCallback, useState } from "react";

interface Props {
  show: boolean;
  children: any;
  onCloseModal: () => void;
}

const Modal: FC<Props> = ({ show, onCloseModal, children }) => {
  const stopPropagation = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  }, []);
  if (!show) {
    return null;
  }
  return (
    <ModalContainer onClick={onCloseModal}>
      <div className="modalBody" onClick={stopPropagation}>
        <button onClick={onCloseModal}>&times;</button>
        {children}
      </div>
    </ModalContainer>
  );
};

export default Modal;
