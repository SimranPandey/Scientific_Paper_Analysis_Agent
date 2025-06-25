import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import PaperCard from "@/components/PaperCard";
import HistoryPanel from "@/components/HistoryPanel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [finalAnswer, setFinalAnswer] = useState<string>("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setSteps([]);
    setFinalAnswer("");
    setResults([]);
    setSelectedIndex(null);

    try {
      const response = await fetch("http://localhost:8000/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok || !response.body) throw new Error("Streaming failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const event of events) {
          const lines = event.split("\n");
          const eventType = lines.find((l) => l.startsWith("event:"))?.replace("event:", "").trim();
          const dataLine = lines.find((l) => l.startsWith("data:"))?.replace("data:", "").trim();

          if (!eventType || !dataLine) continue;

          if (eventType === "step") {
            setSteps((prev) => [...prev, dataLine]);
          }

          if (eventType === "final") {
            const parsed = JSON.parse(dataLine);
            setFinalAnswer(parsed);
          }
        }
      }

      const timestamp = new Date().toLocaleString();
      const historyEntry = {
        query,
        timestamp,
        papers: [],
        raw: finalAnswer,
      };
      setHistory((prev) => [historyEntry, ...prev]);
    } catch (error) {
      console.error("❌ Streaming error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedHistory = selectedIndex !== null ? history[selectedIndex] : null;

  const handleDownload = () => {
    const dataToDownload = selectedHistory
      ? {
          papers: selectedHistory.papers,
          raw: selectedHistory.raw,
        }
      : {
          papers: results,
          raw: finalAnswer,
        };

    const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `research-results-${new Date().toISOString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar */}
      <HistoryPanel
        items={history}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Header />

        <div className="mt-4 space-y-6 max-w-5xl mx-auto">
          {/* Search input */}
          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={handleSearch}
          />

          {isLoading && (
            <div className="text-blue-500 animate-pulse text-sm">
              🔍 Researching... Please wait.
            </div>
          )}

          {/* Step-by-step updates */}
          {steps.length > 0 && (
            <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-5">
              <h3 className="text-gray-700 dark:text-gray-100 font-semibold mb-3 text-base">
                🧠 Agent Thought Process (Step-by-Step):
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-800 dark:text-gray-200">
                {steps.map((step, idx) => (
                  <li key={idx}>
                    <span
                      className={`${
                        idx === steps.length - 1 && isLoading
                          ? "animate-pulse text-blue-600 font-medium"
                          : ""
                      }`}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {/* Final Answer */}
          {!isLoading && finalAnswer && (
            <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 text-sm">
              <h3 className="font-semibold text-gray-700 dark:text-white mb-3 text-base">
                📚 Research Summary:
              </h3>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                  p: ({ node, children }) => <p className="mb-2">{children}</p>,
                  li: ({ node, children }) => <li className="list-disc ml-5">{children}</li>,
                }}
              >
                {finalAnswer.replace(/\n{2,}/g, "\n")}
              </ReactMarkdown>
            </div>
          )}


          {/* Render Paper Cards */}
          {!isLoading && (selectedHistory?.papers?.length || results.length) > 0 && (
            <div className="space-y-4">
              {(selectedHistory?.papers || results).map((paper: any, idx: number) => (
                <PaperCard key={idx} paper={paper} />
              ))}
            </div>
          )}

          {/* Download Button */}
          {!isLoading && (finalAnswer || selectedHistory) && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleDownload}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition"
              >
                ⬇️ Download Results
              </button>
            </div>
          )}
        </div> {/* End of inner container */}
      </main>
    </div> // End of main flex container
  );
}
