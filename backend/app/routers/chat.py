import json

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.ai import stream_chat
from app.database import get_db
from app.models import ChatMessage, ChatSession, User
from app.routers.users import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/api/chat", tags=["chat"])


class SendMessageRequest(BaseModel):
    session_id: int | None = None
    content: str


class CreateSessionResponse(BaseModel):
    id: int
    title: str


class SessionListItem(BaseModel):
    id: int
    title: str

    model_config = {"from_attributes": True}


class MessageItem(BaseModel):
    id: int
    role: str
    content: str

    model_config = {"from_attributes": True}


@router.post("/send")
async def send_message(
    req: SendMessageRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Send a message and stream the AI response via SSE."""
    session = None
    if req.session_id:
        session = db.query(ChatSession).filter(
            ChatSession.id == req.session_id,
            ChatSession.user_id == current_user.id,
        ).first()

    if not session:
        session = ChatSession(user_id=current_user.id, title=req.content[:50])
        db.add(session)
        db.commit()
        db.refresh(session)

    # Save user message
    user_msg = ChatMessage(session_id=session.id, role="user", content=req.content)
    db.add(user_msg)
    db.commit()

    # Build message history for AI context
    history = db.query(ChatMessage).filter(
        ChatMessage.session_id == session.id
    ).order_by(ChatMessage.created_at.asc()).limit(20).all()

    messages = [{"role": m.role, "content": m.content} for m in history]

    user_context = {
        "username": current_user.username,
        "consecutive_days": current_user.consecutive_days,
        "level": current_user.level,
    }

    async def event_stream():
        full_content = ""
        try:
            async for token in stream_chat(messages, user_context):
                full_content += token
                yield f"data: {json.dumps({'token': token})}\n\n"
        finally:
            # Save AI response
            if full_content:
                ai_msg = ChatMessage(
                    session_id=session.id,
                    role="assistant",
                    content=full_content,
                )
                db.add(ai_msg)
                db.commit()
            yield f"data: {json.dumps({'done': True, 'session_id': session.id})}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@router.get("/sessions", response_model=list[SessionListItem])
def list_sessions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(ChatSession)
        .filter(ChatSession.user_id == current_user.id)
        .order_by(ChatSession.updated_at.desc())
        .all()
    )


@router.get("/sessions/{session_id}/messages", response_model=list[MessageItem])
def get_messages(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    session = db.query(ChatSession).filter(
        ChatSession.id == session_id,
        ChatSession.user_id == current_user.id,
    ).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    return (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )
