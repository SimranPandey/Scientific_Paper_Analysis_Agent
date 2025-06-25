import os
import time
import urllib3
from pydantic import BaseModel
from typing import List

class CoreAPIWrapper(BaseModel):
    base_url: str = "https://api.core.ac.uk/v3"
    api_key: str = os.getenv("CORE_API_KEY")
    top_k_results: int = 5

    def search(self, query: str) -> List[dict]:
        http = urllib3.PoolManager()
        for _ in range(3):
            response = http.request(
                'GET',
                f"{self.base_url}/search/outputs",
                headers={"Authorization": f"Bearer {self.api_key}"},
                fields={"q": query, "limit": self.top_k_results}
            )
            if 200 <= response.status < 300:
                return response.json().get("results", [])
            time.sleep(1)
        return []
