import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (msg: string) => void;
  disabled: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled) ref.current?.focus();
  }, [disabled]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <div className="border-t border-border bg-background p-3 flex gap-2 items-end">
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder="Enter prompt..."
        disabled={disabled}
        rows={1}
        className="flex-1 bg-secondary text-user-text placeholder:text-muted-foreground border border-border p-3 resize-none focus:outline-none focus:border-primary font-mono text-sm"
      />
      <button
        onClick={submit}
        disabled={disabled || !value.trim()}
        className="text-primary font-bold px-4 py-3 border border-border hover:bg-secondary disabled:opacity-30 transition-opacity font-mono text-sm shrink-0"
      >
        SEND
      </button>
    </div>
  );
};

export default ChatInput;
