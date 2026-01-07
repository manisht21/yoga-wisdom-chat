export function ThinkingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-chat-bot border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-chat-thinking rounded-full animate-pulse-gentle" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-chat-thinking rounded-full animate-pulse-gentle" style={{ animationDelay: "200ms" }} />
            <span className="w-2 h-2 bg-chat-thinking rounded-full animate-pulse-gentle" style={{ animationDelay: "400ms" }} />
          </div>
          <span className="text-sm text-muted-foreground">Thinking...</span>
        </div>
      </div>
    </div>
  );
}
