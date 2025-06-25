from langchain_openai import ChatOpenAI
import os

def get_openai_client():
    return ChatOpenAI(
        model="gpt-4o",
        temperature=0.0,
        api_key=os.getenv("OPENAI_API_KEY")
    )
