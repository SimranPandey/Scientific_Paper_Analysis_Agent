// components/HistoryPanel.tsx
import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface HistoryItem {
  query: string;
  timestamp: string;
  response: string;
}

interface Props {
  items: HistoryItem[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export default function HistoryPanel({ items, selectedIndex, onSelect }: Props) {
  return (
    <aside className="w-72 min-w-[18rem] max-w-sm bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-r border-gray-300 dark:border-gray-700 h-full p-5 overflow-y-auto shadow-[4px_0_18px_rgba(120,120,120,0.3)]">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">🕘 History</h2>
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400 break-words">No history yet.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="space-y-1">
              <div
                onClick={() => onSelect(index)}
                className={`cursor-pointer text-sm font-medium rounded px-3 py-2 transition-all border border-transparent hover:border-gray-300 dark:hover:border-gray-600 hover:shadow ${
                  selectedIndex === index
                    ? "bg-blue-50 text-blue-700 font-semibold border-blue-300"
                    : "text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
                }`}
              >
                {item.query}
                <br />
                <span className="text-xs text-gray-500">{item.timestamp}</span>
              </div>

              {selectedIndex === index && (
                <div className="bg-white dark:bg-gray-800 rounded-md p-3 mt-2 shadow-md max-h-96 overflow-y-auto text-sm prose prose-sm dark:prose-invert">
                  <ReactMarkdown
                    children={item.response}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
