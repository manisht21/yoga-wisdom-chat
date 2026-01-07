import { cn } from "@/lib/utils";
import { KnowledgeItem } from "@/data/yogaKnowledgeBase";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { useState } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: KnowledgeItem[];
  isBlocked?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [showSources, setShowSources] = useState(false);
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full animate-fade-in", isUser ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
        isUser 
          ? "bg-chat-user text-chat-user-foreground rounded-br-md" 
          : "bg-chat-bot text-chat-bot-foreground rounded-bl-md border border-border"
      )}>
        <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
          {message.content}
        </div>
        
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <button
              onClick={() => setShowSources(!showSources)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{message.sources.length} source{message.sources.length > 1 ? 's' : ''}</span>
              {showSources ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            
            {showSources && (
              <div className="mt-2 space-y-1.5">
                {message.sources.map((source) => (
                  <div key={source.id} className="bg-source text-source-foreground rounded-lg px-3 py-2 text-xs">
                    <span className="font-medium">{source.title}</span>
                    <span className="text-muted-foreground ml-2">• {source.type}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
