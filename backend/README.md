# Scientific Paper Research Agent – Backend

This is the **backend service** for the Scientific Research Assistant built using **FastAPI**, **LangGraph**, and **CORE API**. It exposes a REST API to process scientific queries, search papers, and summarize results using OpenAI's GPT-4o model and CORE’s paper repository.

## 📁 Folder Structure

```

backend/
├── app/
│   ├── main.py               # FastAPI entry point with API routes
│   ├── agents/
│   │   └── research\_agent.py # LangGraph agent logic (full state-driven pipeline)
│   ├── models/
│   │   └── schemas.py        # Pydantic schemas for requests and responses
│   └── core/
│       ├── core\_api.py       # Wrapper for CORE API search
│       └── openai\_client.py  # (Optional) OpenAI client utility
├── requirements.txt          # Python dependencies
├── .env                      # Environment variables (OpenAI, CORE)
└── README.md                 # Project documentation

````

---

## ⚙️ Features

- ✅ FastAPI-powered REST API
- ✅ LangGraph-based research agent with planning and validation
- ✅ Paper retrieval via CORE API
- ✅ GPT-4o integration via OpenAI API
- ✅ Tool calling: paper search, PDF summarization, and quality judging
- ✅ CORS support for frontend integration

---

## 🚀 Quick Start

### 1. Clone the repo & navigate to `backend`:

```bash
git clone https://your-repo-url.git
cd your-repo-name/backend
````

### 2. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies:

```bash
pip install -r requirements.txt
```

### 4. Setup environment variables:

Create a `.env` file in the `backend/` directory:

```
OPENAI_API_KEY=''
CORE_API_KEY=''
```
---

## 🧪 Run Locally

### Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

### Visit:

* API Docs (Swagger): [http://localhost:8000/docs](http://localhost:8000/docs)
* Redoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 📬 API Endpoint

### POST `/api/agent`

Run research based on a user query.

**Request:**

```json
{
  "query": "Find recent papers on quantum computing and its applications in cryptography"
}
```

**Response:**

```json
{
  "papers": [
    {
      "id": "paper123",
      "title": "Quantum Cryptography: A New Era",
      "publishedDate": "2023-11-20T12:00:00Z",
      "authors": "Smith, John and Lee, Alice",
      "abstract": "This paper discusses...",
      "source": "https://core.ac.uk/download/pdf/12345.pdf"
    }
  ]
}
```

---

## Agent Logic Overview

The backend uses a **state-driven LangGraph workflow** with:

1. **Decision Node**: Does the query require research?
2. **Planning Node**: Break down query into substeps.
3. **Tool Node**: Search papers, download content.
4. **Agent Node**: Generate answer with citations.
5. **Judge Node**: Self-check if the answer is good.

---

## 🔌 Dependencies

* `fastapi`
* `uvicorn`
* `langgraph`
* `langchain`, `langchain-openai`
* `pdfplumber`
* `python-dotenv`
* `pydantic`

Install via:

```bash
pip install -r requirements.txt
```

---

## Notes

* Backend is **stateless** and uses only APIs (no DB).
* Designed for use with a React or Next.js frontend.
* Agent logic is modular and extendable — additional tools or APIs can be plugged into `research_agent.py`.

---