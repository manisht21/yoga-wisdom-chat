# 🧘 Ask Me Anything About Yoga  
Track B – Wellness RAG Micro-App

---

## 1. Project Overview

This project is a full-stack Retrieval-Augmented Generation (RAG) wellness assistant that answers yoga and fitness-related questions using a curated knowledge base, semantic embeddings, and a safety-aware AI backend.

It is designed to:
- Retrieve relevant yoga articles using vector similarity
- Inject retrieved context into the AI prompt
- Apply safety filtering for risky health queries
- Log all interactions and feedback in a database

The UI allows users to:
- Ask yoga-related questions
- View AI answers
- See which sources were used
- Receive safety warnings when applicable

---

## 2. System Architecture

Frontend (React)  
→ API Layer (/ask, /feedback)  
→ RAG Engine (Embeddings + Vector Search)  
→ Yoga Knowledge Base  
→ LLM with Retrieved Context  
→ Database (Queries, Sources, Safety, Feedback)

---

## 3. Tech Stack

Frontend  
- React (Vite)  
- TypeScript  
- Tailwind CSS  
- shadcn-ui  

Backend  
- Node.js (Lovable Cloud Edge Functions)  
- REST APIs:  
  - POST /ask  
  - POST /feedback  

Database  
- MongoDB-style cloud database (via Lovable Cloud)  
Stores:
- User queries  
- Retrieved chunks  
- Final AI answers  
- Safety flags  
- Timestamps  
- User feedback  

Vector Store  
- In-memory vector store with cosine similarity  
- Pre-computed embeddings for all yoga knowledge chunks  

AI Model  
- Lovable AI Gateway (LLM)

---

## 4. Knowledge Base

The knowledge base contains 25+ curated yoga articles covering:
- Common asanas  
- Benefits  
- Contraindications  
- Pranayama  
- Meditation  
- Beginner vs advanced practices  

Each article is chunked, embedded, and stored in a vector index.

---

## 5. RAG Pipeline

1. User enters a query  
2. Query is converted into an embedding  
3. Top-K relevant chunks are retrieved using cosine similarity  
4. Retrieved chunks are injected into the LLM prompt  
5. The LLM generates a grounded answer  
6. Sources are returned to the UI  

---

## 6. Safety Layer

The backend checks for risky keywords such as:
- Pregnancy  
- Hernia  
- High blood pressure  
- Glaucoma  
- Recent surgery  

If detected:
- isUnsafe = true  
- Stored in database  
- UI shows red warning banner  
- AI provides:
  - Gentle warning  
  - Safer alternatives  
  - Professional advice notice  

---

## 7. API Endpoints

POST /ask  

Input:
{
  "query": "Is headstand safe during pregnancy?"
}

Output:
{
  "answer": "...",
  "sources": ["Article 12", "Article 7"],
  "isUnsafe": true
}

POST /feedback  

{
  "interaction_id": "uuid",
  "feedback_type": "positive"
}

---

## 8. Database Schema

chat_interactions  
- id  
- query  
- retrieved_chunks  
- response  
- safety_classification  
- risk_level  
- blocked  
- latency_ms  
- created_at  

user_feedback  
- id  
- interaction_id  
- feedback_type  
- created_at  

---

## 9. Frontend Features

- Chat interface  
- Loading spinner  
- Source list  
- Safety warning banner  
- Feedback buttons 👍 👎  
- Admin panel  

---

## 10. AI IDE & Prompt Disclosure

This project was built using Lovable AI.

All UI, backend, RAG, database, and safety logic were created using the following prompts:

### Lovable Prompt History

Jan 9, 3:23 PM  
Lovable AI Prompt: "Ask Me Anything About Yoga" RAG Application  
Build a full-stack RAG (Retrieval-Augmented Generation) wellness application with:
- A chat interface titled "Ask Me Anything About Yoga"
- Knowledge base for yoga, poses, pranayama and wellness
- Source citations
- Safety filtering
- Interaction logging
- Calm wellness design

Jan 9, 3:24 PM  
Enable Lovable Cloud and AI Gateway for chat, database, and backend functions.

Jan 9, 3:25 PM  
Build the complete yoga RAG application including:
- UI design
- Knowledge base
- RAG pipeline
- Safety classifier
- Edge functions
- Admin panel

Jan 9, 3:31 PM  
Test the application and fix edge function configuration issues.

Jan 12, 7:47 PM  
Upgrade the project to Track-B Wellness RAG specification:
- Add embeddings-based RAG
- Add database logging
- Add feedback system
- Expand knowledge base to 25+ items

Jan 12, 7:47 PM  
Implement:
- Vector embeddings
- Semantic retrieval
- MongoDB-style logging
- /feedback API
- Safety flags and UI warnings


This ensures transparency and reproducibility.

---

## 11. Run Locally

git clone <repo>  
cd <project>  
npm install  
npm run dev  

---

## 12. Deployment

(https://zen-guide-helper.lovable.app)

---

## 13. APK Note

This is a web-based AI system.  
A React Native APK would require a separate project.
