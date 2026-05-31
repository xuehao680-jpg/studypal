## ADDED Requirements

### Requirement: 用户注册

系统 SHALL 提供用户注册 API。

- 接受 email、username、password
- email 和 username SHALL 唯一
- 密码 SHALL 使用 bcrypt 哈希后存储
- 注册成功后返回用户基本信息（不含密码）

#### Scenario: 成功注册

- **GIVEN** 用户提供 email、username 和合法密码
- **WHEN** 发送 `POST /api/auth/register`
- **THEN** 返回 201 状态码
- **AND** 返回用户基本信息（id, email, username）

#### Scenario: 邮箱已存在

- **GIVEN** 该 email 已被注册
- **WHEN** 发送 `POST /api/auth/register`
- **THEN** 返回 409 状态码
- **AND** 返回错误信息

#### Scenario: 密码过短

- **GIVEN** 密码长度少于 6 位
- **WHEN** 发送 `POST /api/auth/register`
- **THEN** 返回 422 状态码
- **AND** 返回校验错误详情

---

### Requirement: 用户登录

系统 SHALL 提供用户登录 API，验证身份后返回 JWT token。

- 接受 email + password
- 验证通过后返回 access_token（30 分钟有效期）和 refresh_token（7 天有效期）

#### Scenario: 成功登录

- **GIVEN** 用户已注册
- **WHEN** 发送 `POST /api/auth/login`
- **THEN** 返回 200 状态码
- **AND** 返回 access_token 和 refresh_token

#### Scenario: 密码错误

- **GIVEN** 用户已注册但提供了错误密码
- **WHEN** 发送 `POST /api/auth/login`
- **THEN** 返回 401 状态码
- **AND** 返回认证失败信息

---

### Requirement: Token 刷新

系统 SHALL 提供 access_token 刷新 API。

- 接受有效的 refresh_token
- 返回新的 access_token

#### Scenario: 成功刷新

- **GIVEN** 用户持有有效的 refresh_token
- **WHEN** 发送 `POST /api/auth/refresh`
- **THEN** 返回 200 状态码
- **AND** 返回新的 access_token

#### Scenario: refresh_token 过期

- **GIVEN** refresh_token 已过期（超过 7 天）
- **WHEN** 发送 `POST /api/auth/refresh`
- **THEN** 返回 401 状态码
- **AND** 返回 token 过期错误
