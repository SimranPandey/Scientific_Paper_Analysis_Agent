# Scientific Paper Research Agent

An AI-powered full-stack application that enables researchers to search, analyze, and summarize academic papers using natural language queries. Built using **FastAPI**, **LangGraph**, **OpenAI GPT-4o**, and **CORE API**, with a modern **React + Tailwind CSS** frontend.

---

## 🧠 Core Features

| Module          | Features                                                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 🔍 **Frontend** | React UI, Search Interface, Streaming Agent Thought Process, Result Cards, History Panel, Dark Mode, Download Output               |
| ⚙️ **Backend**  | FastAPI API, LangGraph Agent, CORE Paper Search, GPT-4o Integration, Real time Streaming with Server-Sent Events (SSE), Modular Agent Design |
| 📄 **AI Agent** | Step-by-step reasoning, planning, paper search, summarization, judgment                                                            |

---

## 🔧 Stack

- **Frontend**: Next.js (React) + TailwindCSS
- **Backend**: FastAPI
- **LangGraph Agent**: GPT-4o + LangGraph state machine

## 🏗️ Architecture Overview

```bash
project-root/
├── backend/            # FastAPI + LangGraph backend
│   ├── app/
│   │   ├── agents/         # LangGraph agent logic
│   │   ├── core/           # CORE + OpenAI API wrappers
│   │   ├── models/         # Pydantic schemas
│   │   └── main.py         # FastAPI entrypoint
│   ├── requirements.txt
│   └── .env                # API Keys (OpenAI + CORE)
│
├── frontend/           # React + Tailwind frontend
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── App.tsx
│   └── index.tsx
│
├── README.md
└── .gitignore
```

---

## Prerequisites

1. [Create a CORE API key](https://core.ac.uk/services/api)
2. [Get an OpenAI API key](https://platform.openai.com/)


## 🖥️ Local Development Setup

### 🔧 Backend Setup (FastAPI + LangGraph)

```bash
# 1. Navigate to backend
git clone https://github.com/SimranPandey/Scientific_Paper_Analysis_Agent.git
cd Scientific_Paper_Analysis_Agent
cd backend

# 2. Set up virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Add API keys to .env
Add them to `.env`:
OPENAI_API_KEY=sk-...
CORE_API_KEY=...

# 5. Start the backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Access:
Swagger: http://localhost:8000/docs
Redoc:   http://localhost:8000/redoc
```

---

### 💻 Frontend Setup (React + Tailwind)

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install packages
npm install

# 3. Start development server
npm run dev

App runs at: http://localhost:3000
```

---

## 🚀 Production Deployment

### 📦 Backend (Using Uvicorn + Gunicorn + Docker)

#### Option A: Bare Metal/VM

1. Install `gunicorn`:

   ```bash
   pip install gunicorn
   ```

2. Run production server:

   ```bash
   gunicorn -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000
   ```

3. Use **nginx** to reverse proxy from port 80 to 8000 if needed.

#### Option B: Docker (Recommended)

```dockerfile
# Dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY ./backend /app
RUN pip install -r requirements.txt
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
docker build -t research-agent-backend .
docker run -d -p 8000:8000 --env-file backend/.env research-agent-backend
```

---

### 🌐 Frontend (Deploy on Vercel / Netlify / Any Static Host)

1. Build frontend:

   ```bash
   cd frontend
   npm run build
   ```

2. Deploy `frontend/dist` to any static host (e.g., Vercel, Netlify, GitHub Pages).

3. Ensure **API base URL** in your frontend points to the deployed backend:

   * Either use environment variables in `.env` (if using Vite)
   * Or hardcode production API URL in fetch calls

---

## 🔗 API Reference

### POST `/api/agent`

**Description**: Submit a research query and get streamed AI reasoning + summary

**Request:**

```json
{
  "query": "summarize recent AI alignment papers"
}
```

**SSE Response:**

```
event: step
data: Searching CORE for papers...

event: step
data: Analyzing papers with GPT...

event: final
data: {
  "papers": [...],
  "summary": "Here's what I found..."
}
```

---

## 🎨 Frontend UI Features

| Component                | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| 🔎 `SearchBar.tsx`       | Input for user query (styled with gradient + shadow) |
| 📄 `PaperCard.tsx`       | Displays title, authors, abstract, source            |
| 🧠 Agent Thought Process | Real-time updates using `event: step`                |
| ⏳ `HistoryPanel.tsx`     | Sidebar with query history                           |
| ⬇️ Download JSON         | Button to download full result JSON                  |
| 🌙 Dark Mode             | Tailwind-based toggleable dark theme                 |
| ❌ Error Handler          | Shows toast/message on API failure                   |

---

## 🧠 Backend Agent Pipeline

Built using **LangGraph** with modular, state-driven logic.

| Step             | Function                                 |
| ---------------- | ---------------------------------------- |
| 🧠 Decision Node | Determines if deep research is needed    |
| 🧩 Planning Node | Breaks query into substeps               |
| 🔍 Tool Node     | Uses CORE API to search                  |
| 📄 Synthesizer   | GPT-4o generates summary                 |
| ✅ Judge Node     | Checks if summary is valid/comprehensive |

---

## Implemented Enhancements

| Feature                | Status                        
| ---------------------- | --------------------------
| ✅ SSE Streaming        | Real-time steps shown        
| ✅ Modular LangGraph    | Easy to add tools            
| ✅ Download Results     | Save JSON summary            
| ✅ CORE Integration     | Academic paper metadata      
| ✅ Error Handling       | Graceful fallback            
| ✅ .env-based secrets   | OpenAI + CORE keys           
| ✅ Dark Mode            | UI theme toggle              


---

## Assumptions

* Users are familiar with academic research concepts
* Papers are fetched per query (not cached/stored)
* No auth layer required for current demo use
