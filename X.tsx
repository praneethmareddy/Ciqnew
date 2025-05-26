"use client";

import type { FormEvent, ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Loader2, Paperclip } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onValueChange: (value: string) => void;
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  onUploadFiles?: (files: FileList) => void; // Optional upload handler
}

export function ChatInput({
  value,
  onValueChange,
  onSendMessage,
  isLoading,
  onUploadFiles,
}: ChatInputProps) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim() || isLoading) return;
    await onSendMessage(value.trim());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const form = event.currentTarget.closest('form');
      if (form) {
        handleSubmit(new Event('submit', { cancelable: true, bubbles: true }) as unknown as FormEvent<HTMLFormElement>);
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && onUploadFiles) {
      onUploadFiles(files);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2 p-4 border-t border-border bg-background">
      <div className="relative flex items-center gap-2 flex-1">
        <Textarea
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 resize-none bg-card border-input focus:ring-ring focus:ring-offset-0 pr-12"
          rows={1}
          disabled={isLoading}
          aria-label="Chat input"
        />
        <input
          type="file"
          id="chat-file-input"
          onChange={handleFileChange}
          multiple
          hidden
        />
        <label htmlFor="chat-file-input" className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-primary">
          <Paperclip size={18} />
        </label>
      </div>
      <Button
        type="submit"
        size="icon"
        disabled={isLoading || !value.trim()}
        className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
        variant="ghost"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send size={18} />}
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
