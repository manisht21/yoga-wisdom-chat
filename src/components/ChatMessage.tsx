import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, BookOpen, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { submitFeedback } from "@/lib/dbLogger";
import { useToast } from "@/hooks/use-toast";

export interface RetrievedChunk {
  id: string;
  title: string;
  type: string;
  relevanceScore: number;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: RetrievedChunk[];
  isBlocked?: boolean;
  interactionId?: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [showSources, setShowSources] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'positive' | 'negative' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isUser = message.role === "user";
  const { toast } = useToast();

  const handleFeedback = async (type: 'positive' | 'negative') => {
    if (!message.interactionId || feedbackGiven || isSubmitting) return;
    
    setIsSubmitting(true);
    const success = await submitFeedback(message.interactionId, type);
    setIsSubmitting(false);

    if (success) {
      setFeedbackGiven(type);
      toast({
        title: "Thank you!",
        description: "Your feedback helps us improve.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

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
        
        {!isUser && (
          <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
            {/* Sources section */}
            {message.sources && message.sources.length > 0 && (
              <div>
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
                        <span className="text-muted-foreground ml-2">• {Math.round(source.relevanceScore * 100)}% match</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Feedback section */}
            {message.interactionId && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Was this helpful?</span>
                <button
                  onClick={() => handleFeedback('positive')}
                  disabled={!!feedbackGiven || isSubmitting}
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    feedbackGiven === 'positive' 
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                      : "hover:bg-secondary text-muted-foreground hover:text-foreground",
                    (feedbackGiven && feedbackGiven !== 'positive') && "opacity-50"
                  )}
                  aria-label="Helpful"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleFeedback('negative')}
                  disabled={!!feedbackGiven || isSubmitting}
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    feedbackGiven === 'negative' 
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" 
                      : "hover:bg-secondary text-muted-foreground hover:text-foreground",
                    (feedbackGiven && feedbackGiven !== 'negative') && "opacity-50"
                  )}
                  aria-label="Not helpful"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
