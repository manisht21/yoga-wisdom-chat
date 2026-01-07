import { KnowledgeItem } from '@/data/yogaKnowledgeBase';
import { SafetyResult } from './safetyClassifier';

export interface RetrievedChunk {
  id: string;
  title: string;
  type: string;
  relevanceScore: number;
}

export interface InteractionLog {
  id: string;
  timestamp: string;
  query: string;
  retrievedChunks: RetrievedChunk[];
  response: string;
  safety: {
    inputClassification: string;
    riskLevel: string;
    blocked: boolean;
  };
  latencyMs: number;
}

const STORAGE_KEY = 'yoga_assistant_logs';
const MAX_LOGS = 100;

export function logInteraction(
  query: string,
  retrievedItems: KnowledgeItem[],
  response: string,
  safety: SafetyResult,
  startTime: number
): InteractionLog {
  const log: InteractionLog = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    query,
    retrievedChunks: retrievedItems.map((item, index) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      relevanceScore: Math.round((1 - index * 0.15) * 100) / 100
    })),
    response: response.substring(0, 500) + (response.length > 500 ? '...' : ''),
    safety: {
      inputClassification: safety.classification,
      riskLevel: safety.riskLevel,
      blocked: safety.blocked
    },
    latencyMs: Date.now() - startTime
  };
  
  saveLog(log);
  return log;
}

function saveLog(log: InteractionLog): void {
  try {
    const existingLogs = getLogs();
    const updatedLogs = [log, ...existingLogs].slice(0, MAX_LOGS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
  } catch (error) {
    console.error('Failed to save interaction log:', error);
  }
}

export function getLogs(): InteractionLog[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to read interaction logs:', error);
    return [];
  }
}

export function clearLogs(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getLogStats() {
  const logs = getLogs();
  const total = logs.length;
  const blocked = logs.filter(l => l.safety.blocked).length;
  const avgLatency = logs.length > 0 
    ? Math.round(logs.reduce((sum, l) => sum + l.latencyMs, 0) / logs.length)
    : 0;
  
  const classificationCounts = logs.reduce((acc, log) => {
    acc[log.safety.inputClassification] = (acc[log.safety.inputClassification] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return { total, blocked, avgLatency, classificationCounts };
}
