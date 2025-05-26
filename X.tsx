"use client";

import { useRef, useState, type FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Paperclip, X } from "lucide-react";

interface ChatInputProps {
  value: string;
  onValueChange: (value: string) => void;
  onSendMessage: (message: string, file?: File | null) => Promise<void>;
  isLoading: boolean;
}

export function ChatInput({ value, onValueChange, onSendMessage, isLoading }: ChatInputProps) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim() && !file) return;

    await onSendMessage(value.trim(), file);
    onValueChange("");
    setFile(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const form = event.currentTarget.closest("form");
      if (form) {
        handleSubmit(new Event("submit", { cancelable: true, bubbles: true }) as unknown as FormEvent<HTMLFormElement>);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-2 p-4 border-t border-border bg-background">
      <div className="flex items-start gap-2">
        <Textarea
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 resize-none bg-card border-input focus:ring-ring focus:ring-offset-0 pr-12"
          rows={file ? 2 : 1}
          disabled={isLoading}
          aria-label="Chat input"
        />

        <div className="flex flex-col items-center justify-between gap-2 mt-1">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip size={18} />
            <span className="sr-only">Attach file</span>
          </Button>

          <Button
            type="submit"
            size="icon"
            disabled={isLoading || (!value.trim() && !file)}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
            variant="ghost"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send size={18} />}
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>

      {file && (
        <div className="flex items-center justify-between text-sm px-2 py-1 rounded bg-muted text-muted-foreground border border-border">
          <span className="truncate">{file.name}</span>
          <button
            type="button"
            onClick={() => setFile(null)}
            className="ml-2 text-muted-foreground hover:text-red-500"
            aria-label="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="*"
        onChange={handleFileChange}
        className="hidden"
      />
    </form>
  );
}
