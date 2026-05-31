import json
import os

import httpx

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "")
DEEPSEEK_BASE_URL = os.getenv("DEEPSEEK_BASE_URL", "https://inferaichat.com")
DEEPSEEK_MODEL = os.getenv("DEEPSEEK_MODEL", "deepseek-v4-pro")


async def stream_chat(
    messages: list[dict],
    user_context: dict | None = None,
):
    """Stream chat response from the AI API, yielding text tokens."""

    system_prompt = "你是一个 AI 学习助手，帮助用户提升学习效率。请用中文回复。"
    if user_context:
        system_prompt += (
            f"\n\n用户当前学习数据：\n"
            f"- 连续学习天数: {user_context.get('consecutive_days', 0)}\n"
            f"- 等级: {user_context.get('level', 1)}\n"
            f"- 用户名: {user_context.get('username', '用户')}\n"
        )

    full_messages = [{"role": "system", "content": system_prompt}] + messages

    headers = {
        "Content-Type": "application/json",
        "x-api-key": DEEPSEEK_API_KEY,
        "anthropic-version": "2023-06-01",
    }

    payload = {
        "model": DEEPSEEK_MODEL,
        "max_tokens": 2048,
        "messages": full_messages,
        "stream": True,
    }

    url = f"{DEEPSEEK_BASE_URL}/v1/messages"

    async with httpx.AsyncClient(timeout=120) as client:
        async with client.stream("POST", url, json=payload, headers=headers) as response:
            if response.status_code != 200:
                error_text = await response.aread()
                yield f"请求失败 ({response.status_code}): {error_text.decode()}"
                return

            buffer = ""
            async for line in response.aiter_lines():
                if not line.startswith("data: "):
                    continue
                data_str = line[6:]
                if data_str == "[DONE]":
                    break
                try:
                    data = json.loads(data_str)
                    if data.get("type") == "content_block_delta":
                        delta = data.get("delta", {})
                        if delta.get("type") == "text_delta":
                            yield delta.get("text", "")
                except json.JSONDecodeError:
                    continue
