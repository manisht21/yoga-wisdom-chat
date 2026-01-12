import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Knowledge base with pre-computed semantic embeddings (simulated via keywords + categories)
const knowledgeBase = [
  {
    id: "asana_1",
    type: "asana",
    title: "Mountain Pose (Tadasana)",
    category: "standing",
    description: "The foundation of all standing poses, focusing on alignment and grounding.",
    benefits: ["Improves posture", "Strengthens thighs and ankles", "Increases awareness"],
    contraindications: ["Low blood pressure", "Headache"],
    difficulty: "beginner",
    steps: ["Stand with feet together", "Distribute weight evenly", "Engage thighs", "Lengthen spine", "Relax shoulders"],
    tags: ["beginner", "standing", "foundation", "posture", "alignment", "grounding", "balance"],
    semanticVector: [0.9, 0.1, 0.2, 0.8, 0.3, 0.1, 0.7]
  },
  {
    id: "asana_2",
    type: "asana",
    title: "Downward-Facing Dog (Adho Mukha Svanasana)",
    category: "inversion",
    description: "A foundational pose that stretches and strengthens the entire body.",
    benefits: ["Stretches hamstrings and calves", "Strengthens arms and legs", "Calms the mind", "Relieves stress"],
    contraindications: ["Carpal tunnel syndrome", "High blood pressure", "Late-term pregnancy"],
    difficulty: "beginner",
    steps: ["Start on hands and knees", "Lift hips up and back", "Straighten legs", "Press hands firmly", "Relax head between arms"],
    tags: ["beginner", "inversion", "stretch", "strength", "hamstrings", "full-body", "stress-relief", "calming"],
    semanticVector: [0.8, 0.3, 0.7, 0.6, 0.5, 0.4, 0.6]
  },
  {
    id: "asana_3",
    type: "asana",
    title: "Warrior I (Virabhadrasana I)",
    category: "standing",
    description: "A powerful standing pose that builds strength and stamina.",
    benefits: ["Strengthens legs and arms", "Opens hips and chest", "Improves focus", "Builds confidence"],
    contraindications: ["High blood pressure", "Heart problems", "Shoulder injuries"],
    difficulty: "beginner",
    steps: ["Step one foot back", "Bend front knee to 90 degrees", "Raise arms overhead", "Square hips forward", "Gaze up"],
    tags: ["beginner", "standing", "strength", "power", "legs", "hips", "confidence", "warrior"],
    semanticVector: [0.7, 0.8, 0.5, 0.3, 0.6, 0.7, 0.4]
  },
  {
    id: "asana_4",
    type: "asana",
    title: "Child's Pose (Balasana)",
    category: "resting",
    description: "A gentle resting pose that calms the mind and relieves tension.",
    benefits: ["Relieves back pain", "Calms the nervous system", "Stretches hips and thighs", "Reduces stress"],
    contraindications: ["Knee injuries", "Pregnancy (modified version recommended)"],
    difficulty: "beginner",
    steps: ["Kneel on the floor", "Sit back on heels", "Fold forward", "Extend arms or rest by sides", "Rest forehead on mat"],
    tags: ["beginner", "resting", "relaxation", "stress-relief", "back-pain", "calming", "gentle", "recovery"],
    semanticVector: [0.3, 0.2, 0.9, 0.4, 0.2, 0.1, 0.9]
  },
  {
    id: "asana_5",
    type: "asana",
    title: "Cobra Pose (Bhujangasana)",
    category: "backbend",
    description: "A gentle backbend that opens the chest and strengthens the spine.",
    benefits: ["Strengthens spine", "Opens chest and lungs", "Improves flexibility", "Stimulates organs"],
    contraindications: ["Back injuries", "Pregnancy", "Carpal tunnel syndrome"],
    difficulty: "beginner",
    steps: ["Lie face down", "Place hands under shoulders", "Press into hands", "Lift chest gently", "Keep elbows close"],
    tags: ["beginner", "backbend", "spine", "chest-opener", "flexibility", "gentle"],
    semanticVector: [0.5, 0.6, 0.4, 0.7, 0.8, 0.3, 0.5]
  },
  {
    id: "asana_6",
    type: "asana",
    title: "Tree Pose (Vrksasana)",
    category: "standing",
    description: "A balancing pose that improves focus and stability.",
    benefits: ["Improves balance", "Strengthens legs", "Opens hips", "Increases focus"],
    contraindications: ["Low blood pressure", "Insomnia"],
    difficulty: "beginner",
    steps: ["Stand on one leg", "Place foot on inner thigh or calf", "Bring hands to heart", "Find a focal point", "Hold steady"],
    tags: ["beginner", "standing", "balance", "focus", "concentration", "stability", "one-legged"],
    semanticVector: [0.6, 0.4, 0.3, 0.9, 0.7, 0.5, 0.6]
  },
  {
    id: "asana_7",
    type: "asana",
    title: "Corpse Pose (Savasana)",
    category: "resting",
    description: "The final relaxation pose, essential for integrating practice benefits.",
    benefits: ["Deep relaxation", "Reduces blood pressure", "Calms the mind", "Integrates practice"],
    contraindications: ["Back discomfort (use props)", "Pregnancy (side-lying recommended)"],
    difficulty: "beginner",
    steps: ["Lie flat on back", "Spread arms and legs", "Close eyes", "Relax completely", "Breathe naturally"],
    tags: ["beginner", "resting", "relaxation", "final-pose", "meditation", "stress-relief", "deep-rest"],
    semanticVector: [0.2, 0.1, 1.0, 0.3, 0.1, 0.0, 1.0]
  },
  {
    id: "asana_8",
    type: "asana",
    title: "Headstand (Sirsasana)",
    category: "inversion",
    description: "An advanced inversion known as the king of all poses.",
    benefits: ["Increases blood flow to brain", "Strengthens core and shoulders", "Improves focus", "Builds confidence"],
    contraindications: ["Neck injuries", "High blood pressure", "Heart conditions", "Glaucoma", "Pregnancy", "Menstruation"],
    difficulty: "advanced",
    steps: ["Interlace fingers", "Place crown of head down", "Walk feet in", "Lift legs slowly", "Engage core"],
    tags: ["advanced", "inversion", "strength", "core", "shoulders", "focus", "challenging"],
    semanticVector: [0.9, 0.9, 0.2, 0.5, 0.8, 0.9, 0.3]
  },
  {
    id: "pranayama_1",
    type: "pranayama",
    title: "Deep Belly Breathing (Diaphragmatic Breathing)",
    category: "breathing",
    description: "The foundation of all breathing techniques, using the diaphragm fully.",
    benefits: ["Reduces stress", "Lowers blood pressure", "Improves oxygen intake", "Calms nervous system"],
    contraindications: [],
    difficulty: "beginner",
    steps: ["Sit or lie comfortably", "Place hand on belly", "Inhale deeply through nose", "Feel belly rise", "Exhale slowly"],
    tags: ["beginner", "breathing", "stress-relief", "relaxation", "foundation", "calming", "anxiety"],
    semanticVector: [0.4, 0.2, 0.8, 0.3, 0.2, 0.1, 0.9]
  },
  {
    id: "pranayama_2",
    type: "pranayama",
    title: "Alternate Nostril Breathing (Nadi Shodhana)",
    category: "breathing",
    description: "A balancing breath technique that harmonizes the left and right brain hemispheres.",
    benefits: ["Balances nervous system", "Reduces anxiety", "Improves focus", "Prepares for meditation"],
    contraindications: ["Cold or blocked sinuses"],
    difficulty: "intermediate",
    steps: ["Sit comfortably", "Use right thumb to close right nostril", "Inhale through left", "Close left, open right", "Exhale through right", "Alternate"],
    tags: ["intermediate", "breathing", "balance", "focus", "meditation-prep", "anxiety-relief", "calming"],
    semanticVector: [0.5, 0.3, 0.7, 0.6, 0.4, 0.2, 0.8]
  },
  {
    id: "pranayama_3",
    type: "pranayama",
    title: "Cooling Breath (Sitali Pranayama)",
    category: "breathing",
    description: "A cooling breath technique that reduces body heat and calms the mind.",
    benefits: ["Cools the body", "Reduces anger", "Calms the mind", "Lowers blood pressure"],
    contraindications: ["Low blood pressure", "Respiratory conditions", "Cold weather practice"],
    difficulty: "beginner",
    steps: ["Sit comfortably", "Curl tongue into tube", "Inhale through curled tongue", "Close mouth", "Exhale through nose"],
    tags: ["beginner", "breathing", "cooling", "calming", "anger-management", "summer", "heat"],
    semanticVector: [0.3, 0.2, 0.6, 0.4, 0.3, 0.1, 0.7]
  },
  {
    id: "pranayama_4",
    type: "pranayama",
    title: "Ujjayi Breath (Victorious Breath)",
    category: "breathing",
    description: "An oceanic sounding breath that builds internal heat and focus.",
    benefits: ["Builds internal heat", "Improves concentration", "Calms the mind", "Enhances yoga practice"],
    contraindications: ["Low blood pressure"],
    difficulty: "intermediate",
    steps: ["Constrict back of throat slightly", "Inhale through nose", "Create ocean sound", "Exhale with same constriction", "Maintain steady rhythm"],
    tags: ["intermediate", "breathing", "heat-building", "focus", "concentration", "yoga-practice", "vinyasa"],
    semanticVector: [0.6, 0.5, 0.5, 0.7, 0.6, 0.4, 0.6]
  },
  {
    id: "meditation_1",
    type: "meditation",
    title: "Mindfulness Meditation",
    category: "meditation",
    description: "Present-moment awareness practice focusing on breath and sensations.",
    benefits: ["Reduces anxiety", "Improves focus", "Increases self-awareness", "Reduces stress"],
    contraindications: [],
    difficulty: "beginner",
    steps: ["Find quiet space", "Sit comfortably", "Focus on breath", "Notice thoughts without judgment", "Return focus to breath"],
    tags: ["beginner", "meditation", "mindfulness", "awareness", "stress-relief", "focus", "present-moment", "anxiety"],
    semanticVector: [0.4, 0.3, 0.8, 0.5, 0.3, 0.2, 0.9]
  },
  {
    id: "meditation_2",
    type: "meditation",
    title: "Body Scan Meditation",
    category: "meditation",
    description: "A systematic practice of bringing awareness to each part of the body.",
    benefits: ["Releases tension", "Improves body awareness", "Promotes relaxation", "Helps with sleep"],
    contraindications: [],
    difficulty: "beginner",
    steps: ["Lie down comfortably", "Start at feet", "Notice sensations", "Move attention upward", "Scan entire body"],
    tags: ["beginner", "meditation", "body-awareness", "relaxation", "tension-release", "sleep", "rest"],
    semanticVector: [0.3, 0.2, 0.9, 0.4, 0.2, 0.1, 0.9]
  },
  {
    id: "meditation_3",
    type: "meditation",
    title: "Loving-Kindness Meditation (Metta)",
    category: "meditation",
    description: "A practice of cultivating unconditional love and compassion.",
    benefits: ["Increases compassion", "Reduces negative emotions", "Improves relationships", "Boosts positive feelings"],
    contraindications: [],
    difficulty: "beginner",
    steps: ["Sit comfortably", "Begin with self-love phrases", "Extend to loved ones", "Extend to neutral people", "Extend to all beings"],
    tags: ["beginner", "meditation", "compassion", "love", "kindness", "emotional-healing", "relationships"],
    semanticVector: [0.4, 0.2, 0.7, 0.5, 0.3, 0.2, 0.8]
  },
  {
    id: "safety_1",
    type: "safety",
    title: "General Yoga Safety Guidelines",
    category: "safety",
    description: "Essential safety information for all yoga practitioners.",
    benefits: ["Prevents injury", "Ensures safe practice", "Promotes longevity in practice"],
    contraindications: [],
    difficulty: "beginner",
    steps: ["Always warm up", "Listen to your body", "Never force a pose", "Use props when needed", "Rest when tired"],
    tags: ["safety", "guidelines", "injury-prevention", "all-levels", "important", "precautions"],
    semanticVector: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
  },
  {
    id: "safety_2",
    type: "safety",
    title: "When to Avoid Yoga or Modify",
    category: "safety",
    description: "Conditions requiring modification or professional guidance.",
    benefits: ["Prevents complications", "Ensures appropriate practice"],
    contraindications: [],
    difficulty: "beginner",
    steps: ["Consult doctor for serious conditions", "Work with certified teacher", "Modify poses as needed", "Avoid inversions if contraindicated"],
    tags: ["safety", "modifications", "medical-conditions", "pregnancy", "injuries", "precautions", "doctor"],
    semanticVector: [0.6, 0.4, 0.4, 0.5, 0.4, 0.6, 0.4]
  },
  {
    id: "asana_9",
    type: "asana",
    title: "Pigeon Pose (Eka Pada Rajakapotasana)",
    category: "hip-opener",
    description: "A deep hip opener that releases tension and stored emotions.",
    benefits: ["Opens hips deeply", "Stretches hip flexors", "Releases emotional tension", "Improves flexibility"],
    contraindications: ["Knee injuries", "Sacroiliac issues", "Hip injuries"],
    difficulty: "intermediate",
    steps: ["From downward dog", "Bring knee forward", "Lower hips", "Square hips", "Fold forward if comfortable"],
    tags: ["intermediate", "hip-opener", "flexibility", "emotional-release", "deep-stretch", "hips"],
    semanticVector: [0.6, 0.5, 0.6, 0.7, 0.6, 0.4, 0.7]
  },
  {
    id: "asana_10",
    type: "asana",
    title: "Bridge Pose (Setu Bandhasana)",
    category: "backbend",
    description: "A gentle backbend that opens the chest and strengthens the back.",
    benefits: ["Strengthens back and glutes", "Opens chest", "Calms the brain", "Reduces anxiety"],
    contraindications: ["Neck injuries", "Back injuries"],
    difficulty: "beginner",
    steps: ["Lie on back", "Bend knees, feet flat", "Press into feet", "Lift hips", "Interlace hands under back"],
    tags: ["beginner", "backbend", "chest-opener", "back-strength", "glutes", "calming", "anxiety-relief"],
    semanticVector: [0.5, 0.5, 0.6, 0.6, 0.5, 0.3, 0.7]
  },
  {
    id: "asana_11",
    type: "asana",
    title: "Cat-Cow Pose (Marjaryasana-Bitilasana)",
    category: "spine",
    description: "A flowing movement that warms up the spine and improves flexibility.",
    benefits: ["Warms up spine", "Improves flexibility", "Relieves back tension", "Coordinates breath and movement"],
    contraindications: ["Neck injuries (keep head neutral)"],
    difficulty: "beginner",
    steps: ["Start on hands and knees", "Inhale, drop belly, look up (cow)", "Exhale, round spine, tuck chin (cat)", "Flow between poses", "Move with breath"],
    tags: ["beginner", "spine", "warm-up", "flexibility", "back-relief", "flow", "breath-movement"],
    semanticVector: [0.5, 0.4, 0.5, 0.5, 0.4, 0.3, 0.6]
  },
  {
    id: "asana_12",
    type: "asana",
    title: "Seated Forward Fold (Paschimottanasana)",
    category: "forward-fold",
    description: "A calming forward fold that stretches the entire back body.",
    benefits: ["Stretches hamstrings and back", "Calms the mind", "Relieves stress", "Stimulates digestion"],
    contraindications: ["Back injuries", "Hamstring injuries"],
    difficulty: "beginner",
    steps: ["Sit with legs extended", "Flex feet", "Inhale, lengthen spine", "Exhale, fold forward", "Reach for feet or shins"],
    tags: ["beginner", "forward-fold", "hamstrings", "back-stretch", "calming", "stress-relief", "digestion"],
    semanticVector: [0.4, 0.3, 0.7, 0.5, 0.4, 0.2, 0.8]
  },
  {
    id: "asana_13",
    type: "asana",
    title: "Warrior II (Virabhadrasana II)",
    category: "standing",
    description: "A powerful standing pose that builds strength and endurance.",
    benefits: ["Strengthens legs", "Opens hips", "Builds endurance", "Improves concentration"],
    contraindications: ["High blood pressure", "Neck problems (don't turn head)"],
    difficulty: "beginner",
    steps: ["Stand with wide legs", "Turn front foot out", "Bend front knee", "Extend arms parallel to floor", "Gaze over front hand"],
    tags: ["beginner", "standing", "strength", "endurance", "hips", "concentration", "warrior"],
    semanticVector: [0.7, 0.7, 0.4, 0.4, 0.6, 0.6, 0.5]
  },
  {
    id: "asana_14",
    type: "asana",
    title: "Triangle Pose (Trikonasana)",
    category: "standing",
    description: "A standing pose that stretches the sides of the body.",
    benefits: ["Stretches sides", "Strengthens legs", "Opens hips", "Improves balance"],
    contraindications: ["Low blood pressure", "Headache", "Neck injuries"],
    difficulty: "beginner",
    steps: ["Stand with wide legs", "Turn front foot out", "Extend arms", "Reach toward front foot", "Stack shoulders"],
    tags: ["beginner", "standing", "side-stretch", "balance", "legs", "hips"],
    semanticVector: [0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
  },
  {
    id: "asana_15",
    type: "asana",
    title: "Plank Pose",
    category: "core",
    description: "A foundational core strengthening pose.",
    benefits: ["Strengthens core", "Tones arms", "Builds endurance", "Improves posture"],
    contraindications: ["Carpal tunnel", "Wrist injuries"],
    difficulty: "beginner",
    steps: ["Start on hands and knees", "Step feet back", "Align body in straight line", "Engage core", "Hold steady"],
    tags: ["beginner", "core", "strength", "arms", "endurance", "foundation"],
    semanticVector: [0.7, 0.8, 0.3, 0.4, 0.7, 0.6, 0.3]
  }
];

// Semantic search using cosine similarity simulation
function computeQueryVector(query: string): number[] {
  const queryLower = query.toLowerCase();
  const dimensions = [
    // Dimension 0: Strength/Power
    ['strength', 'strong', 'power', 'powerful', 'build', 'tone', 'core', 'muscle', 'warrior', 'plank'].some(w => queryLower.includes(w)) ? 0.8 : 0.2,
    // Dimension 1: Challenge/Difficulty
    ['advanced', 'challenging', 'difficult', 'hard', 'intense', 'headstand', 'inversion'].some(w => queryLower.includes(w)) ? 0.8 : 0.3,
    // Dimension 2: Relaxation/Calm
    ['relax', 'calm', 'stress', 'anxiety', 'peace', 'rest', 'gentle', 'sleep', 'tension'].some(w => queryLower.includes(w)) ? 0.9 : 0.3,
    // Dimension 3: Flexibility/Stretch
    ['stretch', 'flexible', 'flexibility', 'open', 'hip', 'hamstring', 'bend'].some(w => queryLower.includes(w)) ? 0.8 : 0.3,
    // Dimension 4: Balance/Focus
    ['balance', 'focus', 'concentration', 'stability', 'tree', 'standing'].some(w => queryLower.includes(w)) ? 0.7 : 0.3,
    // Dimension 5: Beginner/Foundation
    ['beginner', 'start', 'new', 'easy', 'simple', 'basic', 'foundation', 'first'].some(w => queryLower.includes(w)) ? 0.2 : 0.5,
    // Dimension 6: Mind/Meditation
    ['meditat', 'mind', 'mental', 'breath', 'breathing', 'pranayama', 'mindful', 'aware'].some(w => queryLower.includes(w)) ? 0.8 : 0.3
  ];
  return dimensions;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function semanticSearch(query: string, topK: number = 5): { item: typeof knowledgeBase[0], score: number }[] {
  const queryVector = computeQueryVector(query);
  const queryLower = query.toLowerCase();
  
  const scored = knowledgeBase.map(item => {
    // Cosine similarity with semantic vector
    const vectorScore = cosineSimilarity(queryVector, item.semanticVector);
    
    // Keyword matching boost
    let keywordBoost = 0;
    const allText = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.benefits.join(' ')}`.toLowerCase();
    const queryWords = queryLower.split(/\s+/);
    for (const word of queryWords) {
      if (word.length > 2 && allText.includes(word)) {
        keywordBoost += 0.15;
      }
    }
    
    // Tag matching boost
    for (const tag of item.tags) {
      if (queryLower.includes(tag)) {
        keywordBoost += 0.1;
      }
    }
    
    return {
      item,
      score: Math.min(vectorScore + keywordBoost, 1.0)
    };
  });
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

function buildContext(results: { item: typeof knowledgeBase[0], score: number }[]): string {
  if (results.length === 0) return "No relevant information found.";
  
  return results.map(({ item, score }) => `
### ${item.title} (${item.type}) [Relevance: ${(score * 100).toFixed(0)}%]
**Category:** ${item.category} | **Difficulty:** ${item.difficulty}
**Description:** ${item.description}
**Benefits:** ${item.benefits.join(", ")}
${item.contraindications.length > 0 ? `**Contraindications:** ${item.contraindications.join(", ")}` : ""}
${item.steps ? `**Steps:** ${item.steps.join(" → ")}` : ""}
  `.trim()).join("\n\n---\n\n");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { query, safetyInfo } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    console.log(`[yoga-chat] Processing query: "${query.substring(0, 50)}..."`);
    const startTime = Date.now();

    // Semantic search for relevant documents
    const searchResults = semanticSearch(query, 5);
    console.log(`[yoga-chat] Found ${searchResults.length} relevant documents`);
    
    const context = buildContext(searchResults);
    const retrievedChunks = searchResults.map(r => ({
      id: r.item.id,
      title: r.item.title,
      type: r.item.type,
      relevanceScore: Math.round(r.score * 100) / 100
    }));

    const systemPrompt = `You are a knowledgeable and compassionate yoga information assistant. Your role is to help users learn about yoga poses (asanas), breathing techniques (pranayama), meditation, and general wellness practices.

IMPORTANT GUIDELINES:
1. You are NOT a doctor or medical professional. Never diagnose conditions or prescribe treatments.
2. ONLY answer using the provided context. If information isn't in the context, say so honestly.
3. Always encourage users to consult healthcare providers for medical concerns.
4. Include appropriate disclaimers for health-related queries.
5. Cite which poses or techniques you're referencing.
6. Be warm, encouraging, and supportive.
7. For beginners, emphasize starting slowly and listening to their body.

${safetyInfo?.requiresDisclaimer ? "IMPORTANT: This query involves health considerations. Include appropriate safety disclaimers in your response." : ""}

CONTEXT FROM KNOWLEDGE BASE:
${context}

Respond helpfully based ONLY on the above context. If the context doesn't contain relevant information, acknowledge this and suggest what topics you can help with.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query }
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      console.error(`[yoga-chat] AI gateway error: ${response.status}`);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const latencyMs = Date.now() - startTime;
    console.log(`[yoga-chat] Response ready in ${latencyMs}ms`);

    // Return streaming response with metadata in header
    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "X-Retrieved-Chunks": JSON.stringify(retrievedChunks),
        "X-Latency-Ms": latencyMs.toString()
      },
    });
  } catch (e) {
    console.error("[yoga-chat] error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
