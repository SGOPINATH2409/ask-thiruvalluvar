# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# import json
# import random

# app = FastAPI()

# # ✅ Enable CORS (needed for frontend)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load data from JSON file
# with open("kurals.json", "r", encoding="utf-8") as f:
#     data = json.load(f)

# # ✅ Root route (to avoid "Not Found")
# @app.get("/")
# def home():
#     return {"message": "Ask Thiruvalluvar API is running"}

# # ✅ Main API
# @app.get("/ask")
# def ask(q: str):
#     if not q:
#         return {"error": "Please provide a query"}

#     q = q.lower()

#     for item in data:
#         if any(keyword in q for keyword in item["keywords"]):
#             return item

#     # fallback if no match
#     return random.choice(data)




from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai

app = FastAPI()

openai.api_key = "YOUR_API_KEY"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ask")
def ask(q: str):
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are Thiruvalluvar. For every problem, give a relevant Thirukural, its meaning, and a short actionable advice."
            },
            {
                "role": "user",
                "content": q
            }
        ]
    )

    return {"response": response["choices"][0]["message"]["content"]}