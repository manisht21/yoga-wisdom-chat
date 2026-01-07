export type KnowledgeType = 'asana' | 'pranayama' | 'meditation' | 'safety';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface KnowledgeItem {
  id: string;
  type: KnowledgeType;
  title: string;
  category: string;
  description: string;
  benefits: string[];
  contraindications: string[];
  difficulty: DifficultyLevel;
  steps?: string[];
  tags: string[];
  duration?: string;
  bodyAreas?: string[];
}

export const yogaKnowledgeBase: KnowledgeItem[] = [
  // ASANAS (Poses)
  {
    id: "asana_downward_dog",
    type: "asana",
    title: "Downward-Facing Dog (Adho Mukha Svanasana)",
    category: "standing",
    description: "An inverted V-shaped pose that stretches the entire back body while strengthening the arms and legs. It's one of the most recognized yoga poses and a foundational element of many yoga sequences.",
    benefits: [
      "Stretches hamstrings, calves, and spine",
      "Strengthens arms, shoulders, and core",
      "Improves blood circulation to the brain",
      "Relieves stress and mild depression",
      "Energizes the body"
    ],
    contraindications: [
      "Wrist or shoulder injuries",
      "High blood pressure (modify or avoid)",
      "Late-term pregnancy",
      "Carpal tunnel syndrome"
    ],
    difficulty: "beginner",
    steps: [
      "Start on hands and knees in tabletop position",
      "Spread fingers wide and press palms firmly into the mat",
      "Tuck toes and lift hips up and back",
      "Straighten legs as much as comfortable",
      "Press heels toward the floor (they don't need to touch)",
      "Keep head between upper arms, ears in line with biceps",
      "Hold for 5-10 breaths"
    ],
    tags: ["beginner", "full-body", "hamstrings", "shoulders", "inversion", "sun-salutation"],
    bodyAreas: ["hamstrings", "calves", "shoulders", "arms", "spine"]
  },
  {
    id: "asana_warrior_1",
    type: "asana",
    title: "Warrior I (Virabhadrasana I)",
    category: "standing",
    description: "A powerful standing pose that builds strength, stability, and focus. Named after the mythical warrior Virabhadra, this pose embodies strength and determination.",
    benefits: [
      "Strengthens legs, ankles, and feet",
      "Opens hips and chest",
      "Improves balance and stability",
      "Builds mental focus and determination",
      "Stretches hip flexors"
    ],
    contraindications: [
      "Knee injuries",
      "Hip problems",
      "High blood pressure (keep arms on hips)",
      "Shoulder injuries (modify arm position)"
    ],
    difficulty: "beginner",
    steps: [
      "From standing, step one foot back about 3-4 feet",
      "Turn back foot out 45-60 degrees",
      "Bend front knee to 90 degrees over ankle",
      "Square hips toward front of mat",
      "Raise arms overhead, palms facing each other",
      "Draw shoulders down away from ears",
      "Hold for 5-10 breaths, then switch sides"
    ],
    tags: ["beginner", "standing", "strength", "hips", "balance"],
    bodyAreas: ["legs", "hips", "core", "shoulders"]
  },
  {
    id: "asana_warrior_2",
    type: "asana",
    title: "Warrior II (Virabhadrasana II)",
    category: "standing",
    description: "A foundational standing pose that opens the hips and chest while building stamina. Arms extend in opposite directions, creating a powerful and grounded stance.",
    benefits: [
      "Strengthens and tones legs",
      "Opens hips, chest, and shoulders",
      "Improves concentration and stamina",
      "Therapeutic for flat feet and sciatica",
      "Develops endurance"
    ],
    contraindications: [
      "Knee or hip injuries",
      "Neck problems (look forward instead of over front hand)",
      "High blood pressure"
    ],
    difficulty: "beginner",
    steps: [
      "Stand with feet 3-4 feet apart",
      "Turn right foot out 90 degrees, left foot slightly in",
      "Extend arms parallel to floor, palms down",
      "Bend right knee to 90 degrees over ankle",
      "Keep torso vertical, stacking shoulders over hips",
      "Gaze over front fingertips",
      "Hold for 5-10 breaths, then switch sides"
    ],
    tags: ["beginner", "standing", "strength", "hips", "endurance"],
    bodyAreas: ["legs", "hips", "shoulders", "core"]
  },
  {
    id: "asana_tree_pose",
    type: "asana",
    title: "Tree Pose (Vrksasana)",
    category: "balance",
    description: "A graceful one-legged balance that cultivates concentration and mental clarity. This pose represents the strength and groundedness of a tree while challenging your balance.",
    benefits: [
      "Improves balance and coordination",
      "Strengthens ankles, calves, and thighs",
      "Opens hips",
      "Builds focus and concentration",
      "Creates a sense of calm"
    ],
    contraindications: [
      "Ankle or knee injuries",
      "Low blood pressure",
      "Insomnia (practice with caution)"
    ],
    difficulty: "beginner",
    steps: [
      "Stand tall on both feet",
      "Shift weight to left foot",
      "Place right sole on inner left thigh, calf, or ankle (never on knee)",
      "Press foot and leg into each other",
      "Bring hands to heart center or raise overhead",
      "Fix gaze on a steady point",
      "Hold for 5-10 breaths, then switch sides"
    ],
    tags: ["beginner", "balance", "standing", "focus", "grounding"],
    bodyAreas: ["legs", "ankles", "hips", "core"]
  },
  {
    id: "asana_childs_pose",
    type: "asana",
    title: "Child's Pose (Balasana)",
    category: "restorative",
    description: "A gentle resting pose that calms the mind and releases tension in the back, shoulders, and chest. Often used as a rest position during yoga practice.",
    benefits: [
      "Gently stretches hips, thighs, and ankles",
      "Calms the brain and relieves stress",
      "Relieves back and neck pain",
      "Promotes deep relaxation",
      "Massages internal organs"
    ],
    contraindications: [
      "Knee injuries (use props)",
      "Pregnancy (use wide-knee variation)",
      "Diarrhea"
    ],
    difficulty: "beginner",
    steps: [
      "Kneel on the floor with knees together or apart",
      "Sit back on heels",
      "Fold forward, bringing forehead to mat",
      "Extend arms forward or rest alongside body",
      "Relax completely and breathe deeply",
      "Hold for 1-3 minutes or as needed"
    ],
    tags: ["beginner", "restorative", "relaxation", "rest", "stress-relief"],
    bodyAreas: ["back", "hips", "shoulders"]
  },
  {
    id: "asana_cobra",
    type: "asana",
    title: "Cobra Pose (Bhujangasana)",
    category: "backbend",
    description: "A gentle backbend that strengthens the spine and opens the chest. It's named after the cobra snake with its raised hood.",
    benefits: [
      "Strengthens spine and back muscles",
      "Opens chest and lungs",
      "Improves posture",
      "Stretches shoulders and abdomen",
      "May help relieve sciatica"
    ],
    contraindications: [
      "Back injuries",
      "Carpal tunnel syndrome",
      "Pregnancy",
      "Recent abdominal surgery"
    ],
    difficulty: "beginner",
    steps: [
      "Lie face down with legs extended",
      "Place hands under shoulders, elbows close to body",
      "Press tops of feet and thighs into mat",
      "On inhale, straighten arms to lift chest",
      "Keep elbows slightly bent",
      "Draw shoulders back and down",
      "Hold for 15-30 seconds"
    ],
    tags: ["beginner", "backbend", "spine", "chest-opener"],
    bodyAreas: ["spine", "chest", "shoulders", "abdomen"]
  },
  {
    id: "asana_pigeon",
    type: "asana",
    title: "Pigeon Pose (Eka Pada Rajakapotasana)",
    category: "hip-opener",
    description: "A deep hip-opening pose that targets the hip rotators and flexors. It's excellent for releasing stored tension in the hips.",
    benefits: [
      "Deep hip opener",
      "Stretches hip flexors and rotators",
      "Releases lower back tension",
      "Can help release emotional tension",
      "Prepares body for seated postures"
    ],
    contraindications: [
      "Knee injuries",
      "Sacroiliac issues",
      "Hip injuries",
      "Pregnancy (modify or avoid)"
    ],
    difficulty: "intermediate",
    steps: [
      "From Downward Dog, bring right knee forward behind right wrist",
      "Extend left leg straight back",
      "Square hips toward the front",
      "Walk hands forward and fold over front leg",
      "Rest forehead on mat or on stacked hands",
      "Hold for 1-3 minutes, then switch sides"
    ],
    tags: ["intermediate", "hip-opener", "flexibility", "emotional-release"],
    bodyAreas: ["hips", "glutes", "lower-back"]
  },
  {
    id: "asana_headstand",
    type: "asana",
    title: "Headstand (Sirsasana)",
    category: "inversion",
    description: "Often called the 'king of asanas', this full inversion reverses blood flow and is believed to have numerous benefits. Requires significant practice and should be approached carefully.",
    benefits: [
      "Increases blood flow to brain",
      "Strengthens core, arms, and shoulders",
      "Improves focus and mental clarity",
      "Stimulates pituitary and pineal glands",
      "Builds confidence"
    ],
    contraindications: [
      "Neck or spine injuries",
      "High blood pressure",
      "Heart conditions",
      "Glaucoma or eye problems",
      "Pregnancy",
      "Menstruation (traditional view)"
    ],
    difficulty: "advanced",
    steps: [
      "Practice against a wall when learning",
      "Interlock fingers and place forearms on mat",
      "Place crown of head on mat, cradled by hands",
      "Walk feet toward head, lifting hips",
      "Draw one knee to chest, then the other",
      "Slowly extend legs upward",
      "Hold for 10-30 seconds initially, building up"
    ],
    tags: ["advanced", "inversion", "strength", "focus", "core"],
    bodyAreas: ["core", "shoulders", "arms", "spine"]
  },

  // PRANAYAMA (Breathing)
  {
    id: "pranayama_ujjayi",
    type: "pranayama",
    title: "Ujjayi Breath (Ocean Breath)",
    category: "calming",
    description: "A foundational yogic breathing technique that creates a soft, oceanic sound. It's often used during asana practice to maintain focus and generate internal heat.",
    benefits: [
      "Calms the nervous system",
      "Increases oxygen intake",
      "Generates internal heat",
      "Improves concentration",
      "Helps maintain steady rhythm during practice"
    ],
    contraindications: [
      "Respiratory infections",
      "Severe asthma (consult doctor)"
    ],
    difficulty: "beginner",
    steps: [
      "Sit comfortably with spine tall",
      "Breathe in through the nose",
      "Slightly constrict the back of throat",
      "Exhale slowly through nose with soft 'ha' sound",
      "The breath should sound like ocean waves",
      "Practice for 5-10 minutes"
    ],
    tags: ["beginner", "calming", "focus", "heat-building"],
    duration: "5-10 minutes"
  },
  {
    id: "pranayama_nadi_shodhana",
    type: "pranayama",
    title: "Alternate Nostril Breathing (Nadi Shodhana)",
    category: "balancing",
    description: "A powerful balancing breath that harmonizes the left and right hemispheres of the brain. It's excellent for calming anxiety and preparing for meditation.",
    benefits: [
      "Balances left and right brain",
      "Reduces anxiety and stress",
      "Clears energy channels (nadis)",
      "Improves focus and concentration",
      "Prepares mind for meditation"
    ],
    contraindications: [
      "Nasal congestion or cold",
      "High fever"
    ],
    difficulty: "beginner",
    steps: [
      "Sit comfortably with spine erect",
      "Use right hand, fold index and middle fingers to palm",
      "Close right nostril with thumb, inhale through left",
      "Close left nostril with ring finger, open right, exhale",
      "Inhale through right nostril",
      "Close right, open left, exhale through left",
      "This is one round. Practice 5-10 rounds"
    ],
    tags: ["beginner", "balancing", "calming", "meditation-prep"],
    duration: "5-15 minutes"
  },
  {
    id: "pranayama_kapalabhati",
    type: "pranayama",
    title: "Skull-Shining Breath (Kapalabhati)",
    category: "energizing",
    description: "An energizing breathing technique with forceful exhalations and passive inhalations. It's considered a cleansing practice that clears the mind and energizes the body.",
    benefits: [
      "Energizes and awakens the body",
      "Clears nasal passages and lungs",
      "Strengthens abdominal muscles",
      "Increases mental clarity",
      "Stimulates digestion"
    ],
    contraindications: [
      "Pregnancy",
      "High blood pressure",
      "Heart disease",
      "Recent abdominal surgery",
      "Epilepsy",
      "Hernia"
    ],
    difficulty: "intermediate",
    steps: [
      "Sit comfortably with spine straight",
      "Take a deep breath in",
      "Exhale forcefully through nose, pulling navel to spine",
      "Allow inhale to happen passively",
      "Start with 20 breaths per round",
      "Rest and breathe normally between rounds",
      "Practice 3 rounds"
    ],
    tags: ["intermediate", "energizing", "cleansing", "focus"],
    duration: "3-5 minutes"
  },
  {
    id: "pranayama_box_breathing",
    type: "pranayama",
    title: "Box Breathing (Sama Vritti)",
    category: "calming",
    description: "A simple yet powerful technique that equalizes the four parts of breath. Used by Navy SEALs and athletes for stress management and focus.",
    benefits: [
      "Reduces stress and anxiety",
      "Improves focus and concentration",
      "Regulates the nervous system",
      "Easy to learn and practice anywhere",
      "Helps with sleep"
    ],
    contraindications: [
      "Generally safe for most people",
      "Reduce duration if feeling dizzy"
    ],
    difficulty: "beginner",
    steps: [
      "Sit or lie in a comfortable position",
      "Inhale for 4 counts",
      "Hold breath for 4 counts",
      "Exhale for 4 counts",
      "Hold empty for 4 counts",
      "This is one cycle. Repeat for 5-10 minutes",
      "Gradually increase to 6 or 8 counts as comfortable"
    ],
    tags: ["beginner", "calming", "stress-relief", "focus", "sleep"],
    duration: "5-10 minutes"
  },

  // MEDITATION
  {
    id: "meditation_mindfulness",
    type: "meditation",
    title: "Mindfulness Meditation",
    category: "awareness",
    description: "The practice of bringing complete attention to the present moment without judgment. It involves observing thoughts, feelings, and sensations as they arise.",
    benefits: [
      "Reduces stress and anxiety",
      "Improves emotional regulation",
      "Enhances focus and attention",
      "Increases self-awareness",
      "May reduce symptoms of depression"
    ],
    contraindications: [
      "Severe trauma (work with a qualified therapist)",
      "Psychosis (consult mental health professional)"
    ],
    difficulty: "beginner",
    steps: [
      "Find a quiet, comfortable place to sit",
      "Close eyes or soften gaze",
      "Bring attention to your breath",
      "When thoughts arise, notice them without judgment",
      "Gently return focus to breath",
      "Start with 5-10 minutes daily"
    ],
    tags: ["beginner", "awareness", "stress-relief", "daily-practice"],
    duration: "5-30 minutes"
  },
  {
    id: "meditation_loving_kindness",
    type: "meditation",
    title: "Loving-Kindness Meditation (Metta)",
    category: "heart-centered",
    description: "A meditation practice that cultivates feelings of love and compassion, first toward oneself, then extending outward to others and all beings.",
    benefits: [
      "Increases positive emotions",
      "Develops compassion and empathy",
      "Reduces self-criticism",
      "Improves relationships",
      "Can reduce chronic pain"
    ],
    contraindications: [
      "May bring up difficult emotions initially",
      "Those with trauma should work with a therapist"
    ],
    difficulty: "beginner",
    steps: [
      "Sit comfortably and close eyes",
      "Begin by sending love to yourself",
      "Repeat: 'May I be happy, may I be healthy, may I be safe'",
      "Extend these wishes to loved ones",
      "Extend to neutral people, then difficult people",
      "Finally, extend to all beings everywhere"
    ],
    tags: ["beginner", "compassion", "emotional-healing", "relationships"],
    duration: "10-20 minutes"
  },
  {
    id: "meditation_body_scan",
    type: "meditation",
    title: "Body Scan Meditation",
    category: "relaxation",
    description: "A systematic practice of bringing awareness to each part of the body, often used for relaxation and stress relief. Excellent for releasing physical tension.",
    benefits: [
      "Promotes deep relaxation",
      "Increases body awareness",
      "Reduces physical tension",
      "Helps with insomnia",
      "Can reduce chronic pain"
    ],
    contraindications: [
      "May be difficult with severe body-related trauma",
      "Consult therapist if body awareness triggers anxiety"
    ],
    difficulty: "beginner",
    steps: [
      "Lie down in a comfortable position",
      "Close eyes and take a few deep breaths",
      "Begin at the top of head or feet",
      "Slowly move attention through each body part",
      "Notice sensations without trying to change them",
      "Release tension as you exhale",
      "Complete the scan in 15-30 minutes"
    ],
    tags: ["beginner", "relaxation", "body-awareness", "sleep", "stress-relief"],
    duration: "15-30 minutes"
  },

  // SAFETY INFORMATION
  {
    id: "safety_general",
    type: "safety",
    title: "General Yoga Safety Guidelines",
    category: "general",
    description: "Important safety information for all yoga practitioners to prevent injury and practice safely.",
    benefits: ["Injury prevention", "Safe practice", "Informed decisions"],
    contraindications: [],
    difficulty: "beginner",
    tags: ["safety", "beginner", "guidelines", "all-levels"],
    steps: [
      "Always warm up before intense poses",
      "Listen to your body - never push through pain",
      "Inform your teacher of any injuries or conditions",
      "Stay hydrated but avoid heavy meals before practice",
      "Use props (blocks, straps) when needed",
      "Practice on a non-slip surface",
      "Avoid comparing yourself to others",
      "Rest in Child's Pose whenever needed"
    ]
  },
  {
    id: "safety_medical",
    type: "safety",
    title: "Medical Considerations for Yoga",
    category: "medical",
    description: "Important medical disclaimers and conditions that require special consideration or medical clearance before practicing yoga.",
    benefits: ["Informed practice", "Risk awareness", "Health protection"],
    contraindications: [],
    difficulty: "beginner",
    tags: ["safety", "medical", "disclaimer", "consultation"],
    steps: [
      "Consult a healthcare provider before starting if you have medical conditions",
      "Conditions requiring medical clearance: heart disease, high blood pressure, recent surgery",
      "Pregnancy requires modified practice and prenatal-certified instruction",
      "Glaucoma and retinal detachment: avoid inversions",
      "Osteoporosis: avoid deep twists and forward folds",
      "Always disclose medications to your yoga teacher",
      "If you experience dizziness, chest pain, or shortness of breath, stop immediately"
    ]
  }
];

export const getItemsByType = (type: KnowledgeType): KnowledgeItem[] => {
  return yogaKnowledgeBase.filter(item => item.type === type);
};

export const getItemsByDifficulty = (difficulty: DifficultyLevel): KnowledgeItem[] => {
  return yogaKnowledgeBase.filter(item => item.difficulty === difficulty);
};

export const searchKnowledgeBase = (query: string): KnowledgeItem[] => {
  const normalizedQuery = query.toLowerCase().trim();
  const queryTerms = normalizedQuery.split(/\s+/);
  
  return yogaKnowledgeBase
    .map(item => {
      let score = 0;
      const searchableText = [
        item.title,
        item.description,
        item.category,
        ...item.tags,
        ...item.benefits,
        ...(item.steps || []),
        ...(item.bodyAreas || [])
      ].join(' ').toLowerCase();
      
      for (const term of queryTerms) {
        if (item.title.toLowerCase().includes(term)) score += 10;
        if (item.tags.some(tag => tag.includes(term))) score += 5;
        if (item.category.toLowerCase().includes(term)) score += 4;
        if (item.description.toLowerCase().includes(term)) score += 3;
        if (item.benefits.some(b => b.toLowerCase().includes(term))) score += 2;
        if (searchableText.includes(term)) score += 1;
      }
      
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ item }) => item);
};
