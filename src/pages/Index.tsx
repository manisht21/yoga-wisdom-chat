import { useState, useRef, useEffect } from "react";
import { ChatMessage, Message } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ThinkingIndicator } from "@/components/ThinkingIndicator";
import { AdminPanel } from "@/components/AdminPanel";
import { searchKnowledgeBase, KnowledgeItem } from "@/data/yogaKnowledgeBase";
import { classifyQuery, standardDisclaimer, mildConditionDisclaimer } from "@/lib/safetyClassifier";
import { logInteraction } from "@/lib/interactionLogger";
import { Settings, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/yoga-chat`;

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const buildContext = (items: KnowledgeItem[]): string => {
    if (items.length === 0) return "No relevant information found in the knowledge base.";
    return items.map(item => `
### ${item.title} (${item.type})
**Category:** ${item.category} | **Difficulty:** ${item.difficulty}
**Description:** ${item.description}
**Benefits:** ${item.benefits.join(", ")}
${item.contraindications.length > 0 ? `**Contraindications:** ${item.contraindications.join(", ")}` : ""}
${item.steps ? `**Steps:** ${item.steps.join(" → ")}` : ""}
    `.trim()).join("\n\n---\n\n");
  };

  const handleSend = async (query: string) => {
    const startTime = Date.now();
    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: query };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const safetyResult = classifyQuery(query);
    
    if (safetyResult.blocked) {
      const blockedMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: safetyResult.message || "I'm unable to respond to this query.",
        isBlocked: true,
      };
      setMessages(prev => [...prev, blockedMessage]);
      logInteraction(query, [], blockedMessage.content, safetyResult, startTime);
      setIsLoading(false);
      return;
    }

    const retrievedItems = searchKnowledgeBase(query);
    const context = buildContext(retrievedItems);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ query, context, safetyInfo: safetyResult }),
      });

      if (!resp.ok) {
        throw new Error(`Request failed: ${resp.status}`);
      }

      const reader = resp.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let assistantContent = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
                }
                return [...prev, { id: crypto.randomUUID(), role: "assistant", content: assistantContent, sources: retrievedItems }];
              });
            }
          } catch { /* ignore partial JSON */ }
        }
      }

      // Add disclaimer if needed
      let finalContent = assistantContent;
      if (safetyResult.classification === "serious_condition") {
        finalContent += `\n\n---\n\n${standardDisclaimer}`;
      } else if (safetyResult.classification === "mild_condition") {
        finalContent += `\n\n---\n\n${mildConditionDisclaimer}`;
      }

      setMessages(prev => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: finalContent } : m));
      logInteraction(query, retrievedItems, finalContent, safetyResult, startTime);
    } catch (error) {
      console.error("Chat error:", error);
      toast({ title: "Error", description: "Failed to get response. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="shrink-0 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
              Ask Me Anything About Yoga
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Poses • Breathing • Meditation</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowAdmin(true)} className="text-muted-foreground hover:text-foreground">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Disclaimer Banner */}
      <div className="bg-safety-banner border-b border-warning/20">
        <div className="container max-w-3xl mx-auto px-4 py-2 flex items-center gap-2 text-sm text-safety-banner-foreground">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>This app provides information only, not medical advice. Always consult a healthcare provider.</span>
        </div>
      </div>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-3xl mx-auto px-4 py-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🧘</div>
              <h2 className="text-xl font-serif text-foreground mb-2">Welcome to Your Yoga Guide</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Ask me about yoga poses, breathing techniques, meditation practices, or general wellness. I'm here to help you on your yoga journey.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["What's a good pose for beginners?", "How do I reduce stress?", "Tell me about breathing exercises"].map((q) => (
                  <button key={q} onClick={() => handleSend(q)} className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          {isLoading && <ThinkingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <footer className="shrink-0 border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </footer>

      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
}
