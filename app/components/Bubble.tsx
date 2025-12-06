import type { Message } from "ai/react";

interface BubbleProps {
  message: Message;
}

const Bubble = ({ message }: BubbleProps) => {
  return <div className={`${message.role} bubble`}>{message.content}</div>;
};

export default Bubble;
