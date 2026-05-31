from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ChatMessage, User
from app.routers.users import get_current_user

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.get("/summary")
def get_summary(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    msg_count = db.query(ChatMessage).filter(
        ChatMessage.role == "user",
    ).count()

    return {
        "total_chat_messages": msg_count,
        "consecutive_days": current_user.consecutive_days,
        "level": current_user.level,
    }


@router.get("/calendar")
def get_calendar(
    days: int = Query(365, ge=1, le=365),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Return daily study activity for the last N days."""
    end_date = datetime.now(timezone.utc)
    start_date = end_date - timedelta(days=days - 1)

    messages = db.query(ChatMessage).filter(
        ChatMessage.role == "user",
        ChatMessage.created_at >= start_date,
    ).all()

    daily_counts: dict[str, int] = {}
    for msg in messages:
        day = msg.created_at.strftime("%Y-%m-%d")
        daily_counts[day] = daily_counts.get(day, 0) + 1

    result = []
    for i in range(days):
        day = (start_date + timedelta(days=i)).strftime("%Y-%m-%d")
        result.append({"date": day, "count": daily_counts.get(day, 0)})

    return result


ACHIEVEMENTS = [
    {"id": "first_message", "name": "初次对话", "desc": "发送第一条消息", "icon": "💬", "threshold": 1},
    {"id": "chatty", "name": "畅聊达人", "desc": "累计发送 10 条消息", "icon": "🗣️", "threshold": 10},
    {"id": "persistent", "name": "坚持不懈", "desc": "累计发送 50 条消息", "icon": "💪", "threshold": 50},
    {"id": "level_5", "name": "学无止境", "desc": "达到 5 级", "icon": "🎓", "threshold": 5},
    {"id": "level_10", "name": "知识大师", "desc": "达到 10 级", "icon": "👑", "threshold": 10},
]


@router.get("/achievements")
def get_achievements(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    msg_count = db.query(ChatMessage).filter(
        ChatMessage.role == "user",
    ).count()

    result = []
    for ach in ACHIEVEMENTS:
        progress = 0
        unlocked = False

        if ach["id"].startswith("first_message") or ach["id"] in ("chatty", "persistent"):
            progress = min(msg_count, ach["threshold"])
            unlocked = msg_count >= ach["threshold"]
        elif ach["id"].startswith("level_"):
            level_needed = ach["threshold"]
            progress = min(current_user.level, level_needed)
            unlocked = current_user.level >= level_needed

        result.append({
            "id": ach["id"],
            "name": ach["name"],
            "description": ach["desc"],
            "icon": ach["icon"],
            "unlocked": unlocked,
            "progress": progress,
            "threshold": ach["threshold"],
        })

    return result
