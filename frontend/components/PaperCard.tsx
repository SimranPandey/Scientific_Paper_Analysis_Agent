import * as React from "react";

interface Paper {
  title: string;
  authors: string;
  abstract: string;
  publishedDate: string;
  source: string;
}

export default function PaperCard({ paper }: { paper: Paper }) {
  return (
    <div className="p-6 bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-transform hover:scale-[1.01]">
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white leading-snug">
        📄 {paper.title}
      </h3>

      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1 mb-3">
        <p>
          <span className="font-medium">👨‍🔬 Authors:</span> {paper.authors}
        </p>
        <p>
          <span className="font-medium">📅 Published:</span> {paper.publishedDate}
        </p>
      </div>

      <div className="text-sm text-gray-800 dark:text-gray-200 mb-4">
        <p className="font-medium mb-1">🧠 Abstract:</p>
        <p className="text-justify leading-relaxed">
          {paper.abstract || "Abstract not available."}
        </p>
      </div>

      {paper.source && (
        <div>
          <a
            href={paper.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition"
          >
            🔗 Read the Full Paper
          </a>
        </div>
      )}
    </div>
  );
}
