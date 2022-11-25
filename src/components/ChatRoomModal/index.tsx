import Modal from "../Modal";
import React, { Dispatch } from "react";
import ChatRoom from "../ChatRoom";

interface Props {
  setShow: Dispatch<React.SetStateAction<boolean>>;
}

const ChatRoomModal = ({ setShow }: Props) => {
  return (
    <Modal setShow={setShow}>
      <ChatRoom />
    </Modal>
  );
};

export default ChatRoomModal;
