from pydantic import BaseModel
from typing import List, Optional

class QueryRequest(BaseModel):
    query: str

class Paper(BaseModel):
    id: str
    title: str
    publishedDate: str
    authors: str
    abstract: str
    source: str

class PaperResponse(BaseModel):
    papers: List[Paper]
