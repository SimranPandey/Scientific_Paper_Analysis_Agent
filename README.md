# Scientific Paper Agent using LangGraph

## Overview

This is a full-stack implementation of a scientific research assistant agent using LangGraph, FastAPI, and React + TailwindCSS.

It allows users to:

Submit natural language queries

Automatically search and retrieve papers from CORE

Extract and summarize relevant findings

Return citation-rich academic-style answers

---

## 🔧 Stack

- **Frontend**: Next.js (React) + TailwindCSS
- **Backend**: FastAPI
- **LangGraph Agent**: GPT-4o + LangGraph state machine

---

## 🗂 Project Structure

```
research-agent-app/
├── backend/            # FastAPI backend
│   ├── main.py         # API server entrypoint
│   └── research_agent.py  # LangGraph agent
├── frontend/           # Next.js frontend
│   ├── pages/
│   ├── components/
│   └── ...
├── .env                # API keys
├── requirements.txt    # Python deps
└── README.md
```

---

## ✅ Prerequisites

1. [Create a CORE API key](https://core.ac.uk/services/api)
2. [Get an OpenAI API key](https://platform.openai.com/)

Add them to `.env`:

```
OPENAI_API_KEY=''
CORE_API_KEY=''
```

---

## 🚀 Installation

### 1. Clone the repo
```bash
git clone https://github.com/yourname/research-agent-app.git
cd research-agent-app
```

### 2. Install Python backend dependencies
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Install frontend dependencies
```bash
cd frontend
npm install
```

---

## 🧠 CMD To Run the project

Use this to launch both frontend and backend simultaneously:
```bash
npm run dev-all
```

This runs:
- `uvicorn backend.main:app --reload` at `http://localhost:8000`
- `next dev` at `http://localhost:3000`

---

## 🧪 Example Usage

You can ask queries like:
- *"Find 5 papers on quantum machine learning published after 2022"*
- *"Download and summarize this paper: <PDF URL>"*

Results will be shown on the frontend with citations.

---

## 🤖 Agent Workflow

The LangGraph agent includes:

1. **Decision Node**: Classifies whether to answer directly or do research
2. **Planning Node**: Creates multi-step plan using tools
3. **Tools Node**: CORE API search, PDF download, feedback
4. **Agent Node**: LLM with tool use
5. **Judge Node**: Validates quality of final answer

The state machine loops through improve/plan steps until quality is acceptable.

---

## 🛠 Tools Used

- `langchain-openai`, `langgraph`, `pdfplumber`
- `FastAPI`, `Next.js`, `TailwindCSS`, `React`

---

## 📊 Comparison with Copilot & Perplexity

Our agent delivers:
- **Higher academic rigor**
- **Inline citations with CORE paper links**
- **Slower but deeper search vs Copilot/Perplexity**

---

## ⚠️ Limitations

- No mathematical derivation or image extraction
- Public papers only
- May timeout on very large PDFs

---

## 🚀 Improvements

- Add ArXiv / Semantic Scholar APIs
- Support figure & table extraction
- Add export-to-PDF or .bibtex support
