-- Create chat interactions table (replaces localStorage logging)
CREATE TABLE public.chat_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT NOT NULL,
  retrieved_chunks JSONB NOT NULL DEFAULT '[]',
  response TEXT NOT NULL,
  safety_classification TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  blocked BOOLEAN NOT NULL DEFAULT false,
  latency_ms INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user feedback table
CREATE TABLE public.user_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  interaction_id UUID REFERENCES public.chat_interactions(id) ON DELETE CASCADE,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('positive', 'negative')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

-- Allow public access for this demo (no auth required)
CREATE POLICY "Allow public read on chat_interactions" 
ON public.chat_interactions FOR SELECT USING (true);

CREATE POLICY "Allow public insert on chat_interactions" 
ON public.chat_interactions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on user_feedback" 
ON public.user_feedback FOR SELECT USING (true);

CREATE POLICY "Allow public insert on user_feedback" 
ON public.user_feedback FOR INSERT WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX idx_chat_interactions_created_at ON public.chat_interactions(created_at DESC);
CREATE INDEX idx_user_feedback_interaction_id ON public.user_feedback(interaction_id);