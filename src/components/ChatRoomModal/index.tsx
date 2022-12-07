import Modal from "../Modal";
import React, { Dispatch } from "react";
import ChatRoom from "../ChatRoom";

interface Props {
  setShow: Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

const ChatRoomModal = ({ setShow, id }: Props) => {
  return (
    <Modal setShow={setShow}>
      <ChatRoom id={id} />
    </Modal>
  );
};

export default ChatRoomModal;
