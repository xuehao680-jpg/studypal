## ADDED Requirements

### Requirement: 获取用户 Profile

系统 SHALL 提供用户个人资料 API，需 Bearer token 认证。

- 返回当前登录用户的信息
- 包含：email、username、avatar_url、consecutive_days、level

#### Scenario: 成功获取 Profile

- **GIVEN** 用户持有有效的 access_token
- **WHEN** 发送 `GET /api/users/me`
- **THEN** 返回 200 状态码
- **AND** 返回用户信息（含 email, username, avatar_url, consecutive_days, level）

#### Scenario: 未提供 token

- **GIVEN** 用户未提供 access_token
- **WHEN** 发送 `GET /api/users/me`
- **THEN** 返回 401 状态码
- **AND** 返回认证缺失错误

#### Scenario: token 无效或过期

- **GIVEN** 用户提供了无效或过期的 access_token
- **WHEN** 发送 `GET /api/users/me`
- **THEN** 返回 401 状态码
- **AND** 返回凭证无效错误

---

### Requirement: 用户数据模型

系统 SHALL 在数据库中使用如下用户模型：

- id: 整数主键，自增
- email: 字符串，唯一非空
- username: 字符串，唯一非空
- hashed_password: 字符串，非空
- avatar_url: 字符串，可空
- consecutive_days: 整数，默认 0
- level: 整数，默认 1
- created_at: 时间戳
- updated_at: 时间戳

#### Scenario: 新用户默认值

- **GIVEN** 新用户成功注册
- **WHEN** 查询数据库用户记录
- **THEN** consecutive_days 默认为 0
- **AND** level 默认为 1
- **AND** hashed_password 为 bcrypt 哈希值（非明文）
