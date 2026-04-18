"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);

  const askKural = async () => {
    const res = await fetch(`http://127.0.0.1:8000/ask?q=${query}`);
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Ask Thiruvalluvar</h1>

      <input
        className="border p-2 w-full max-w-md"
        placeholder="Ask your problem..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        className="bg-black text-white px-4 py-2 mt-3"
        onClick={askKural}
      >
        Ask
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded max-w-md">
          <p className="text-lg font-semibold">{result.kural}</p>
          <p className="mt-2">{result.meaning}</p>
          <p className="mt-2 text-green-600">{result.action}</p>
        </div>
      )}
    </div>
  );
}