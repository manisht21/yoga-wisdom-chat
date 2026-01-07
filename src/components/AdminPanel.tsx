import { getLogs, clearLogs, getLogStats, InteractionLog } from "@/lib/interactionLogger";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [logs, setLogs] = useState<InteractionLog[]>(getLogs());
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const stats = getLogStats();

  const handleClear = () => {
    clearLogs();
    setLogs([]);
  };

  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-serif font-semibold">Interaction Logs</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-3 p-4 bg-muted/50">
          <div className="text-center">
            <div className="text-2xl font-semibold text-primary">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-destructive">{stats.blocked}</div>
            <div className="text-xs text-muted-foreground">Blocked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold">{stats.avgLatency}ms</div>
            <div className="text-xs text-muted-foreground">Avg Latency</div>
          </div>
          <div className="text-center">
            <Button variant="outline" size="sm" onClick={handleClear} className="gap-1">
              <Trash2 className="w-3 h-3" /> Clear
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {logs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No interactions logged yet.</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{log.query}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString()} • {log.latencyMs}ms • {log.safety.inputClassification}
                    </p>
                  </div>
                  {expandedLog === log.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedLog === log.id && (
                  <div className="p-3 border-t border-border bg-muted/30 text-sm space-y-2">
                    <div>
                      <span className="font-medium">Sources:</span>
                      <span className="ml-2 text-muted-foreground">
                        {log.retrievedChunks.map(c => c.title).join(", ") || "None"}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Response:</span>
                      <p className="mt-1 text-muted-foreground">{log.response}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
