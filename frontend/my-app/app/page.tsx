
// "use client";
// import { useState } from "react";

// export default function Home() {
//   const [query, setQuery] = useState("");
//   const [result, setResult] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const askKural = async (customQuery?: string) => {
//     const q = customQuery || query;
//     if (!q) return;

//     setLoading(true);
//     try {
//       const res = await fetch(
//         `https://ask-thiruvalluvar.onrender.com/ask?q=${q}`
//       );
//       const data = await res.json();
//       setResult(data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const emotions = ["fear","angry", "sad", "lazy", "career"];

//   return (
//   <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 flex items-center justify-center px-4">

//     <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-gray-200">

//       {/* Title */}
//       <h1 className="text-3xl font-bold text-center text-gray-900 mb-1">
//         Ask Thiruvalluvar
//       </h1>
//       <p className="text-sm text-gray-600 text-center mb-5">
//         Ancient wisdom for modern problems
//       </p>

//       {/* Input */}
//       <input
//         className="w-full border border-gray-300 rounded-xl p-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
//         placeholder="Type your problem..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />

//       {/* Button */}
//       <button
//         onClick={() => askKural()}
//         className="w-full mt-4 bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition"
//       >
//         {loading ? "Thinking..." : "Ask"}
//       </button>

//       {/* Emotion Buttons */}
//       <div className="flex flex-wrap gap-2 mt-5 justify-center">
//         {emotions.map((emotion) => (
//           <button
//             key={emotion}
//             onClick={() => askKural(emotion)}
//             className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition"
//           >
//             {emotion}
//           </button>
//         ))}
//       </div>

//       {/* Result */}
//       {result && (
//         <div className="mt-6 p-5 bg-orange-50 rounded-2xl border border-orange-200 shadow-sm">

//           <p className="text-lg font-semibold text-center text-gray-900 leading-relaxed">
//             {result.kural}
//           </p>

//           <p className="text-gray-700 text-sm mt-3 text-center">
//             {result.meaning}
//           </p>

//           <p className="text-green-600 font-semibold mt-3 text-center">
//             {result.action}
//           </p>

//         </div>
//       )}

//     </div>
//   </div>
// );
// }
"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await fetch(
        `https://ask-thiruvalluvar.onrender.com/ask?q=${input}`
      );
      const data = await res.json();

      const botMessage = {
  role: "bot",
  kural: data.kural,
  meaning: data.meaning,
  action: data.action,
};

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 flex flex-col">

      {/* Header */}
      <div className="text-center py-4 font-bold text-xl text-gray-900">
        Ask Thiruvalluvar
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xs p-3 rounded-xl ${
              msg.role === "user"
                ? "ml-auto bg-orange-500 text-white"
                : "mr-auto bg-white text-gray-900 shadow"
            }`}
          >
            {msg.role === "bot" ? (
  <div>
    <p className="font-semibold">{msg.kural}</p>
    <p className="text-sm mt-2 text-gray-600">{msg.meaning}</p>
    <p className="text-green-600 mt-2 font-medium">{msg.action}</p>
  </div>
) : (
  msg.text
)}
          </div>
        ))}

        {loading && (
          <div className="mr-auto bg-white p-3 rounded-xl shadow text-gray-500">
            Thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-white flex gap-2 border-t">
        <input
          className="flex-1 border rounded-lg p-2 focus:outline-none"
          placeholder="Ask your problem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-orange-500 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}