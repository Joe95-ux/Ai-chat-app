/* eslint-disable react/prop-types */
import { usePostAiCodeMutation } from "@/state/api";
import  { useState } from "react";
import MessageFormUI from "./MessageFormUI";

const AiCode = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [triggerCode] = usePostAiCodeMutation();

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    triggerCode(form);
    setMessage("");
    setAttachment("");
  };
  const handleKeyPress = (e) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === 'Enter') {
      handleSubmit();
      e.preventDefault();
    }
  };

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleKeyDown={handleKeyPress}
    />
  );
};

export default AiCode;
