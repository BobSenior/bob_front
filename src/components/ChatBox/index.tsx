import { ChatArea } from "../ChatBox/styles";
import React, { FormEvent, useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router";

interface Props {
  chat: string;
  onSubmitForm: (e: FormEvent) => void;
  onChangeChat: (e: any) => void;
  placeholder?: string;
}
const ChatBox = ({ chat, onSubmitForm, onChangeChat, placeholder }: Props) => {
  const { workspace } = useParams<{ workspace: string }>();
  // const { data: memberData } = useWorkspaceMemberData<IUser[]>(workspace);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      // autosize(textareaRef.current);
    }
  }, []);

  const onKeydownChat = useCallback(
    (e: any) => {
      if (e.key === "Enter") {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitForm(e);
        }
      }
    },
    [onSubmitForm]
  );

  // const renderSuggestion = useCallback(
  //   (
  //     suggestion: SuggestionDataItem,
  //     search: string,
  //     highlightedDisplay: React.ReactNode,
  //     index: number,
  //     focus: boolean
  //   ): React.ReactNode => {
  //     if (!memberData) return;
  //     return (
  //       <EachMention focus={focus}>
  //         <img
  //           src={gravatar.url(memberData[index].email, {
  //             s: "20px",
  //             d: "retro",
  //           })}
  //           alt={memberData[index].nickname}
  //         />
  //         <span>{highlightedDisplay}</span>
  //       </EachMention>
  //     );
  //   },
  //   [memberData]
  // );

  return (
    <ChatArea>
      <form onSubmit={onSubmitForm}>
        <textarea />
        {/*<MentionsTextarea*/}
        {/*  id="editor-chat"*/}
        {/*  value={chat}*/}
        {/*  onChange={onChangeChat}*/}
        {/*  onKeyPress={onKeydownChat}*/}
        {/*  placeholder={placeholder}*/}
        {/*  inputRef={textareaRef}*/}
        {/*  allowSuggestionsAboveCursor*/}
        {/*>*/}
        {/*<Mention*/}
        {/*  appendSpaceOnAdd*/}
        {/*  trigger="@"*/}
        {/*  data={*/}
        {/*    memberData?.map((v: any) => ({*/}
        {/*      id: v.id,*/}
        {/*      display: v.nickname,*/}
        {/*    })) || []*/}
        {/*  }*/}
        {/*  renderSuggestion={renderSuggestion}*/}
        {/*/>*/}
        {/*</MentionsTextarea>*/}
        <div>
          <button
            className={
              "c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send" +
              (chat?.trim() ? "" : " c-texty_input__button--disabled")
            }
            data-qa="texty_send_button"
            aria-label="Send message"
            data-sk="tooltip_parent"
            type="submit"
            disabled={!chat?.trim()}
          >
            <i
              className="c-icon c-icon--paperplane-filled"
              aria-hidden="true"
            />
          </button>
        </div>
      </form>
    </ChatArea>
  );
};

export default ChatBox;
