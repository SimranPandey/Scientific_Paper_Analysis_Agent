from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from langchain_core.messages import HumanMessage
from app.agents.research_agent import app as agent_app
import json
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI app
app = FastAPI(title="Research Agent Streaming")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Request model
class QueryRequest(BaseModel):
    query: str

@app.post("/api/agent")
async def stream_agent_response(query_req: QueryRequest):
    user_msg = HumanMessage(content=query_req.query)
    all_messages = []

    async def event_generator():
        try:
            # Collect messages
            async for chunk in agent_app.astream({"messages": [user_msg]}, stream_mode="updates"):
                for updates in chunk.values():
                    if messages := updates.get("messages"):
                        all_messages.extend(messages)

            if not all_messages:
                yield f"event: error\ndata: No messages returned.\n\n"
                return

            # Step messages: from first message only
            first_msg = all_messages[0]
            step_text = getattr(first_msg, "content", "").strip()
            steps = [line.strip() for line in step_text.splitlines() if line.strip()]

            for line in steps:
                # Skip the last "Let's start..." line if needed
                if line.lower().startswith("let's start"):
                    continue
                yield f"event: step\ndata: {line}\n\n"

            # Final message: last one in the list
            final_msg = all_messages[-1]
            final_content = getattr(final_msg, "content", "").strip()

            if final_content:
                formatted = final_content.replace("\\n", "\n").replace("\n\n", "\n")
                yield f"event: final\ndata: {json.dumps(formatted)}\n\n"

        except Exception as e:
            logger.error(f"Streaming error: {e}")
            yield f"event: error\ndata: Error: {str(e)}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
