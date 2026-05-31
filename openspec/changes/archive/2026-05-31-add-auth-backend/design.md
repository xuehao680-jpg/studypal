## Context

StudyPal 学习面板的 Dashboard 已完成前端 Mock，现需后端支持。本项目为独立的 FastAPI 后端服务，与前端 `my-website` 项目在同一个 monorepo 中，位于 `backend/` 目录。

## Goals / Non-Goals

**Goals:**
- FastAPI 项目骨架，独立运行
- 用户注册 API（`POST /api/auth/register`）
- 用户登录 API（`POST /api/auth/login`），返回 access + refresh token
- JWT token 刷新 API（`POST /api/auth/refresh`）
- 用户 Profile API（`GET /api/users/me`），含头像、连续学习天数、用户等级
- SQLite 3 数据库 + Alembic 迁移

**Non-Goals:**
- 不做后台管理界面
- 不做密码找回
- 不做 OAuth 第三方登录
- 不做 email 验证

## Decisions

### 1. 项目结构

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI 实例 + 路由挂载
│   ├── database.py           # SQLite 连接 + 会话管理
│   ├── models.py             # SQLAlchemy 模型
│   ├── schemas.py            # Pydantic 请求/响应模型
│   ├── auth.py               # JWT 签发/验证/密码哈希
│   └── routers/
│       ├── __init__.py
│       ├── auth.py            # /api/auth/* 路由
│       └── users.py           # /api/users/* 路由
├── alembic/                  # Alembic 迁移目录
├── alembic.ini
└── requirements.txt
```

### 2. 技术选型

| 组件 | 选型 | 理由 |
|------|------|------|
| 框架 | FastAPI | 异步支持、自动生成 OpenAPI 文档 |
| ORM | SQLAlchemy 2.0 | FastAPI 生态标准，异步支持 |
| 迁移 | Alembic | SQLAlchemy 官方迁移工具 |
| 数据库 | SQLite 3 | 零配置，适合单机部署 |
| JWT | python-jose | 社区标准 |
| 密码 | passlib[bcrypt] | 密码哈希标准 |

### 3. 用户模型

```python
class User(Base):
    id: int (PK)
    email: str (unique)
    username: str (unique)
    hashed_password: str
    avatar_url: str | None
    consecutive_days: int (default 0)
    level: int (default 1)
    created_at: datetime
    updated_at: datetime
```

### 4. 认证流程

```
注册 → POST /api/auth/register
  ├── 校验 email/username 唯一性
  └── 返回 { id, email, username }

登录 → POST /api/auth/login
  ├── 验证 email + password
  ├── 签发 access_token (30min) + refresh_token (7天)
  └── 返回 { access_token, refresh_token, token_type }

刷新 → POST /api/auth/refresh
  ├── 验证 refresh_token
  ├── 签发新的 access_token
  └── 返回 { access_token, token_type }

Profile → GET /api/users/me
  ├── 要求 Bearer access_token
  └── 返回 { id, email, username, avatar_url, consecutive_days, level }
```

### 5. Token 配置

```python
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7
ALGORITHM = "HS256"
# SECRET_KEY 从环境变量读取，开发环境用默认值
```

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|----------|
| SQLite 并发写入限制 | 单用户场景影响小，后续可迁移 PostgreSQL |
| JWT 无法撤销 | access_token 短时效（30min），refresh_token 可在服务端做黑名单 |
| 密码安全 | 使用 bcrypt 哈希，不存储明文 |
| CORS 跨域 | 使用 FastAPI CORSMiddleware 允许前端域名 |