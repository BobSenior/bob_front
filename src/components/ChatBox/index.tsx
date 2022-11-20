import { ChatBoxContainer, ChatInputArea, Form, SendButton } from "./styles";
import React, {
  ChangeEvent,
  FormEvent,
  forwardRef,
  KeyboardEvent,
  useCallback,
} from "react";
import { AnimatePresence } from "framer-motion";
import SendSvg from "../../assets/icons/send-sharp.svg";
import { HandleVariant } from "../../pages/Compose/style";

interface Props {
  chat: string;
  onKeyDownChat?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmitForm: (e: FormEvent) => void;
  onChangeChat: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}
const ChatBox = forwardRef<HTMLTextAreaElement, Props>(
  (
    { chat, onKeyDownChat, onSubmitForm, onChangeChat, placeholder },
    textareaRef
  ) => {
    const onKeydownChat = useCallback(
      (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          if (chat?.trim()) onSubmitForm(e);
        }
      },
      [onSubmitForm]
    );

    return (
      <AnimatePresence>
        <ChatBoxContainer>
          <Form onSubmit={onSubmitForm}>
            <ChatInputArea
              value={chat}
              ref={textareaRef}
              placeholder={placeholder}
              onKeyPress={onKeydownChat}
              onChange={onChangeChat}
            />
            <SendButton
              aria-label="Send message"
              type="submit"
              disabled={!chat?.trim()}
              animate={!chat?.trim() ? "off" : "on"}
              variants={HandleVariant}
              transition={{ duration: 0.1 }}
            >
              <img src={SendSvg} width={"22px"} height={"22px"} alt={"send"} />
            </SendButton>
          </Form>
        </ChatBoxContainer>
      </AnimatePresence>
    );
  }
);

export default ChatBox;
