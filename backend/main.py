from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# ✅ Enable CORS (needed for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Sample dataset (you can expand later)
data = [
    {
        "keywords": ["angry", "anger", "fight"],
        "kural": "அறத்தொடு நடுவுவேண்டும் கோபம் உடையார்",
        "meaning": "Control anger with balance",
        "action": "Pause before reacting"
    },
    {
        "keywords": ["lazy", "procrastination"],
        "kural": "உழுவார் உலகத்தார்க்கு ஆணிஅஞர்",
        "meaning": "Hard work sustains life",
        "action": "Start with 1 small task"
    },
    {
        "keywords": ["sad", "depressed", "lonely"],
        "kural": "இன்பம் விழையான் இழுக்கம் இலானாம்",
        "meaning": "Happiness comes to those without greed",
        "action": "Focus on what you have, not what you lack"
    },
    {
        "keywords": ["friend", "betrayal", "trust"],
        "kural": "நட்பிற்கு உரியர் எனப்படுவர் நெஞ்சத்து",
        "meaning": "True friendship lies in trust and loyalty",
        "action": "Choose friends carefully"
    }
]

# ✅ Root route (to avoid "Not Found")
@app.get("/")
def home():
    return {"message": "Ask Thiruvalluvar API is running"}

# ✅ Main API
@app.get("/ask")
def ask(q: str):
    if not q:
        return {"error": "Please provide a query"}

    q = q.lower()

    for item in data:
        if any(keyword in q for keyword in item["keywords"]):
            return item

    # fallback if no match
    return random.choice(data)