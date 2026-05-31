## 1. 项目骨架与数据库

- [x] 1.1 创建 `backend/` 目录结构和 `requirements.txt`
- [x] 1.2 实现 `backend/app/database.py`：SQLite 连接 + 会话工厂
- [x] 1.3 实现 `backend/app/models.py`：User SQLAlchemy 模型
- [x] 1.4 配置 Alembic：`alembic init alembic` + 初始迁移脚本

## 2. 认证模块

- [x] 2.1 实现 `backend/app/auth.py`：密码哈希、JWT 签发/验证、token 刷新
- [x] 2.2 实现 `backend/app/schemas.py`：Pydantic 请求/响应模型
- [x] 2.3 实现 `backend/app/routers/auth.py`：register + login + refresh API

## 3. 用户 Profile

- [x] 3.1 实现 `backend/app/routers/users.py`：GET /api/users/me（需认证）
- [x] 3.2 实现 `backend/app/main.py`：FastAPI 实例、CORS 配置、路由挂载

## 4. 集成验证

- [x] 4.1 运行 Alembic 迁移创建数据库表
- [x] 4.2 启动 FastAPI 服务，验证注册/登录/token 刷新/Profile 四个 API
