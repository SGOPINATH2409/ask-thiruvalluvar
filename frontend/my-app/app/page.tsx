
// "use client";
// import { useState } from "react";

// export default function Home() {
//   const [query, setQuery] = useState("");
//   const [result, setResult] = useState<any>(null);

//   // const askKural = async () => {
//   //   const res = await fetch(`https://ask-api.onrender.com/ask?q=${query}`);
//   //   const data = await res.json();
//   //   setResult(data);
//   // };
//   const askKural = async () => {
//   const res = await fetch(
//     "https://ask-thiruvalluvar.onrender.com/ask?q=" + query
//   );
//   const data = await res.json();
//   setResult(data);
// };

//   return (
//     <div>
//       <input
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={askKural}>Ask</button>

//       {result && (
//         <div>
//           <p>{result.kural}</p>
//           <p>{result.meaning}</p>
//           <p>{result.action}</p>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const askKural = async (customQuery?: string) => {
    const q = customQuery || query;
    if (!q) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://ask-thiruvalluvar.onrender.com/ask?q=${q}`
      );
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const emotions = ["Tired","angry", "sad", "lazy", "career"];

  return (
  <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 flex items-center justify-center px-4">

    <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-gray-200">

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-1">
        Ask Thiruvalluvar
      </h1>
      <p className="text-sm text-gray-600 text-center mb-5">
        Ancient wisdom for modern problems
      </p>

      {/* Input */}
      <input
        className="w-full border border-gray-300 rounded-xl p-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Type your problem..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={() => askKural()}
        className="w-full mt-4 bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {/* Emotion Buttons */}
      <div className="flex flex-wrap gap-2 mt-5 justify-center">
        {emotions.map((emotion) => (
          <button
            key={emotion}
            onClick={() => askKural(emotion)}
            className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition"
          >
            {emotion}
          </button>
        ))}
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 p-5 bg-orange-50 rounded-2xl border border-orange-200 shadow-sm">

          <p className="text-lg font-semibold text-center text-gray-900 leading-relaxed">
            {result.kural}
          </p>

          <p className="text-gray-700 text-sm mt-3 text-center">
            {result.meaning}
          </p>

          <p className="text-green-600 font-semibold mt-3 text-center">
            {result.action}
          </p>

        </div>
      )}

    </div>
  </div>
);
}