import { supabase } from '@/integrations/supabase/client';

export interface RetrievedChunk {
  id: string;
  title: string;
  type: string;
  relevanceScore: number;
}

export interface InteractionLog {
  id: string;
  query: string;
  retrieved_chunks: RetrievedChunk[];
  response: string;
  safety_classification: string;
  risk_level: string;
  blocked: boolean;
  latency_ms: number;
  created_at: string;
}

export async function logInteraction(
  query: string,
  retrievedChunks: RetrievedChunk[],
  response: string,
  safetyClassification: string,
  riskLevel: string,
  blocked: boolean,
  latencyMs: number
): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('chat_interactions')
      .insert([{
        query,
        retrieved_chunks: JSON.parse(JSON.stringify(retrievedChunks)),
        response: response.substring(0, 5000),
        safety_classification: safetyClassification,
        risk_level: riskLevel,
        blocked,
        latency_ms: latencyMs
      }])
      .select('id')
      .single();

    if (error) {
      console.error('Failed to log interaction:', error);
      return null;
    }

    return data.id;
  } catch (error) {
    console.error('Failed to log interaction:', error);
    return null;
  }
}

export async function getLogs(): Promise<InteractionLog[]> {
  try {
    const { data, error } = await supabase
      .from('chat_interactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Failed to fetch logs:', error);
      return [];
    }

    return (data || []).map(d => ({
      ...d,
      retrieved_chunks: (d.retrieved_chunks as unknown as RetrievedChunk[]) || []
    })) as InteractionLog[];
  } catch (error) {
    console.error('Failed to fetch logs:', error);
    return [];
  }
}

export async function getLogStats() {
  const logs = await getLogs();
  const total = logs.length;
  const blocked = logs.filter(l => l.blocked).length;
  const avgLatency = logs.length > 0 
    ? Math.round(logs.reduce((sum, l) => sum + l.latency_ms, 0) / logs.length)
    : 0;
  
  const classificationCounts = logs.reduce((acc, log) => {
    acc[log.safety_classification] = (acc[log.safety_classification] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return { total, blocked, avgLatency, classificationCounts };
}

export async function submitFeedback(interactionId: string, feedbackType: 'positive' | 'negative'): Promise<boolean> {
  try {
    const { error } = await supabase.functions.invoke('feedback', {
      body: { interaction_id: interactionId, feedback_type: feedbackType }
    });

    if (error) {
      console.error('Failed to submit feedback:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to submit feedback:', error);
    return false;
  }
}
