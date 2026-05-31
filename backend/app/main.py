from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import analytics, auth, chat, users

app = FastAPI(title="StudyPal API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analytics.router)
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(users.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
