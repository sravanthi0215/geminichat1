interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

const ChatMessage = ({ role, content, isStreaming }: ChatMessageProps) => {
  const prefix = role === "user" ? "USR>" : "GEM>";
  const textClass = role === "user" ? "text-user-text font-bold" : "text-foreground";

  return (
    <div className="flex gap-3">
      <span className="text-muted-foreground shrink-0 select-none">{prefix}</span>
      <div className={`${textClass} whitespace-pre-wrap break-words min-w-0`}>
        {content}
        {isStreaming && role === "assistant" && (
          <span className="cursor-blink text-cursor-gold">█</span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
