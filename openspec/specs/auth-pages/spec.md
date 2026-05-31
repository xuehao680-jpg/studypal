## ADDED Requirements

### Requirement: 登录页面

系统 SHALL 提供 `/login` 页面。

- 包含 email 和 password 输入框
- 提交后调用 `POST /api/auth/login`
- 登录成功后将 token 存入 localStorage 并跳转到 `/dashboard`
- 登录失败时显示错误信息
- 已登录用户访问 `/login` 时自动跳转到 `/dashboard`

#### Scenario: 成功登录

- **GIVEN** 用户已注册
- **WHEN** 提交有效 email 和 password
- **THEN** 跳转到 `/dashboard`
- **AND** token 保存在 localStorage 中

#### Scenario: 登录失败

- **GIVEN** 用户提交了错误密码
- **WHEN** 提交登录表单
- **THEN** 显示错误信息
- **AND** 停留在登录页

#### Scenario: 已登录用户访问登录页

- **GIVEN** 用户已登录
- **WHEN** 访问 `/login`
- **THEN** 自动跳转到 `/dashboard`

---

### Requirement: 注册页面

系统 SHALL 提供 `/register` 页面。

- 包含 email、username、password 输入框
- 提交后调用 `POST /api/auth/register`
- 注册成功后自动登录（调用 login API）并跳转到 `/dashboard`
- 注册失败时显示具体错误信息

#### Scenario: 成功注册

- **GIVEN** 用户提供合法信息
- **WHEN** 提交注册表单
- **THEN** 跳转到 `/dashboard`
- **AND** token 保存在 localStorage 中

#### Scenario: 邮箱已存在

- **GIVEN** 该 email 已被注册
- **WHEN** 提交注册表单
- **THEN** 显示"邮箱已存在"错误信息
- **AND** 停留在注册页

---

### Requirement: 认证状态管理

系统 SHALL 通过 AuthContext 在全局共享认证状态。

- 应用启动时从 localStorage 读取 token 并验证
- access_token 过期时自动使用 refresh_token 刷新
- 提供 login、register、logout 方法
- 提供 isAuthenticated 和 isLoading 状态

#### Scenario: 页面刷新后保持登录

- **GIVEN** 用户已登录且有有效 token
- **WHEN** 刷新页面
- **THEN** 用户保持登录状态
- **AND** 不跳转到登录页

#### Scenario: token 过期后自动登出

- **GIVEN** access_token 和 refresh_token 均过期
- **WHEN** API 返回 401
- **THEN** 清除 localStorage 中的 token
- **AND** 跳转到 `/login`
