export type QueryClassification = 
  | 'general_wellness'
  | 'mild_condition'
  | 'serious_condition'
  | 'unsafe_intent';

export type RiskLevel = 'none' | 'low' | 'medium' | 'high' | 'blocked';

export interface SafetyResult {
  classification: QueryClassification;
  riskLevel: RiskLevel;
  blocked: boolean;
  message?: string;
  requiresDisclaimer: boolean;
}

// Keywords that indicate unsafe intent
const unsafeKeywords = [
  'suicide', 'kill myself', 'end my life', 'self-harm', 'hurt myself',
  'overdose', 'emergency', 'chest pain', 'heart attack', 'stroke',
  'can\'t breathe', 'severe bleeding', 'broken bone'
];

// Keywords that indicate serious medical conditions
const seriousConditionKeywords = [
  'surgery', 'recent operation', 'cancer', 'tumor', 'chemotherapy',
  'pregnancy complication', 'miscarriage', 'severe injury', 'fracture',
  'herniated disc', 'slipped disc', 'heart condition', 'heart disease',
  'blood clot', 'dvt', 'pulmonary embolism', 'seizure', 'epilepsy',
  'glaucoma', 'detached retina', 'severe pain', 'chronic illness',
  'autoimmune', 'multiple sclerosis', 'severe depression', 'bipolar'
];

// Keywords that indicate mild conditions
const mildConditionKeywords = [
  'stiff', 'tight', 'sore', 'stress', 'anxiety', 'tension',
  'back pain', 'neck pain', 'headache', 'insomnia', 'tired',
  'fatigue', 'mild', 'slight', 'minor', 'occasional',
  'flexibility', 'posture', 'desk job', 'office work'
];

export function classifyQuery(query: string): SafetyResult {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Check for unsafe intent first
  if (unsafeKeywords.some(keyword => normalizedQuery.includes(keyword))) {
    return {
      classification: 'unsafe_intent',
      riskLevel: 'blocked',
      blocked: true,
      requiresDisclaimer: false,
      message: getEmergencyMessage(normalizedQuery)
    };
  }
  
  // Check for serious conditions
  if (seriousConditionKeywords.some(keyword => normalizedQuery.includes(keyword))) {
    return {
      classification: 'serious_condition',
      riskLevel: 'high',
      blocked: false,
      requiresDisclaimer: true,
      message: getSeriousConditionDisclaimer()
    };
  }
  
  // Check for mild conditions
  if (mildConditionKeywords.some(keyword => normalizedQuery.includes(keyword))) {
    return {
      classification: 'mild_condition',
      riskLevel: 'low',
      blocked: false,
      requiresDisclaimer: true
    };
  }
  
  // Default to general wellness
  return {
    classification: 'general_wellness',
    riskLevel: 'none',
    blocked: false,
    requiresDisclaimer: false
  };
}

function getEmergencyMessage(query: string): string {
  const isEmergency = query.includes('chest pain') || 
                      query.includes('heart attack') || 
                      query.includes('stroke') ||
                      query.includes('can\'t breathe') ||
                      query.includes('severe bleeding');
  
  if (isEmergency) {
    return `🚨 **This sounds like a medical emergency.**

If you or someone else is experiencing a medical emergency, please:
- **Call emergency services immediately (911 in the US)**
- **Go to the nearest emergency room**

This yoga assistant cannot provide emergency medical advice.`;
  }
  
  return `💙 **I'm concerned about you.**

If you're having thoughts of self-harm or suicide, please reach out for help:
- **National Suicide Prevention Lifeline: 988** (US)
- **Crisis Text Line: Text HOME to 741741**
- **International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/**

You are not alone, and help is available. This yoga app is not equipped to provide mental health crisis support, but trained professionals are ready to help you.`;
}

function getSeriousConditionDisclaimer(): string {
  return `**Important Medical Notice:**

The condition you've mentioned requires professional medical guidance. While yoga can be therapeutic, it's essential that you:

1. **Consult with your healthcare provider** before starting or modifying any yoga practice
2. **Work with a qualified yoga therapist** who has experience with your specific condition
3. **Never practice poses that cause pain or discomfort**

I can provide general information, but please prioritize medical advice from qualified professionals.`;
}

export const standardDisclaimer = `*This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider before beginning any new exercise program.*`;

export const mildConditionDisclaimer = `*Please listen to your body and stop if you experience any pain. Consider consulting a healthcare provider if symptoms persist.*`;
