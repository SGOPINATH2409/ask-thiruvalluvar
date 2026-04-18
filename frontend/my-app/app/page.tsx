
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

  const emotions = ["angry", "sad", "lazy", "love", "career"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Ask Thiruvalluvar
        </h1>
        <p className="text-sm text-gray-500 text-center mb-4">
          Find wisdom for your situation
        </p>

        {/* Input */}
        <input
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Type your problem..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={() => askKural()}
          className="w-full mt-3 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

        {/* Emotion Buttons */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {emotions.map((emotion) => (
            <button
              key={emotion}
              onClick={() => askKural(emotion)}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
            >
              {emotion}
            </button>
          ))}
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 p-4 bg-orange-50 rounded-xl border">
            <p className="text-lg font-semibold text-center">
              {result.kural}
            </p>

            <p className="text-gray-600 text-sm mt-3 text-center">
              {result.meaning}
            </p>

            <p className="text-green-600 font-medium mt-3 text-center">
              {result.action}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}