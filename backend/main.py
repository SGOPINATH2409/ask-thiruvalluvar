from fastapi import FastAPI
import random

app = FastAPI()

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
    }
]

@app.get("/ask")
def ask(q: str):
    for item in data:
        if any(word in q.lower() for word in item["keywords"]):
            return item
    return random.choice(data)