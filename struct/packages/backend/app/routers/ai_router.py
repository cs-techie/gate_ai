from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import os
from openai import OpenAI
from app.utils.auth import get_current_user
from app.models import User

router = APIRouter(prefix="/ai", tags=["AI Doubt Solver"])

SYSTEM_PROMPT = """You are GATExpress AI doubt solver.
Answer only Computer Science and GATE related questions.
Explain step by step.
Give examples when needed.
Give formulas when needed.
Keep answers clear and short.
Use code blocks for programming.
Do not talk about teachers or lectures.
You are an AI self-study assistant."""


class ChatMessage(BaseModel):
    role: str   # "user" or "assistant"
    content: str


class DoubtRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []


class DoubtResponse(BaseModel):
    reply: str


def get_openai_client() -> OpenAI:
    api_key = os.getenv("OPENAI_API_KEY", "")
    if not api_key or api_key == "your-openai-api-key-here":
        raise HTTPException(
            status_code=503,
            detail="AI service is not configured. Please set OPENAI_API_KEY."
        )
    return OpenAI(api_key=api_key)


@router.post("/doubt", response_model=DoubtResponse)
async def solve_doubt(
    request: DoubtRequest,
    current_user: User = Depends(get_current_user),
):
    """
    Solve a GATE CS doubt using OpenAI.
    Accepts the current message plus full chat history for context.
    """
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    client = get_openai_client()

    # Build message list: system prompt + history + new user message
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    # Append previous turns (cap at last 20 to stay within token budget)
    for turn in (request.history or [])[-20:]:
        if turn.role in ("user", "assistant"):
            messages.append({"role": turn.role, "content": turn.content})

    # Append the new question
    messages.append({"role": "user", "content": request.message.strip()})

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",          # cheap, fast, capable enough for GATE CS
            messages=messages,
            max_tokens=1500,
            temperature=0.4,              # deterministic-ish for educational answers
        )
        reply = response.choices[0].message.content.strip()
        return DoubtResponse(reply=reply)

    except Exception as e:
        error_msg = str(e)
        # Surface key error types clearly
        if "api_key" in error_msg.lower() or "authentication" in error_msg.lower():
            raise HTTPException(status_code=503, detail="Invalid OpenAI API key.")
        if "rate_limit" in error_msg.lower() or "quota" in error_msg.lower():
            raise HTTPException(status_code=429, detail="AI rate limit reached. Please try again shortly.")
        raise HTTPException(status_code=503, detail="AI service unavailable. Please try again.")
