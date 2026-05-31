## Why

StudyPal 需要后端用户系统来支持学习数据持久化、个性化推荐和多设备同步。当前的 Mock 数据需要替换为真实后端，用户认证是第一步。

## What Changes

- 创建 `backend/` 目录，作为独立的 FastAPI 项目
- 实现用户注册和登录 API
- 实现 JWT token 签发和刷新
- 实现用户 Profile 接口（头像、连续学习天数、用户等级）
- 使用 SQLite 3 作为数据库，Alembic 管理迁移
- 后续前端 Dashboard 从 Mock 数据切换到调用真实 API

## Capabilities

### New Capabilities
- `user-auth`: 用户注册、登录、JWT token 管理
- `user-profile`: 用户个人信息管理（头像、学习天数、等级）

### Modified Capabilities

无。后端是全新项目，不影响现有前端。

## Impact

- 新增 `backend/` 目录，包含 FastAPI 项目骨架
- 新增文件：`backend/app/main.py`、`backend/app/models.py`、`backend/app/schemas.py`、`backend/app/auth.py`、`backend/app/database.py`、`backend/requirements.txt`、`backend/alembic.ini`、`backend/alembic/` 迁移文件
- 无前端代码修改
