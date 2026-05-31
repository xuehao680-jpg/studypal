## MODIFIED Requirements

### Requirement: 路由保护

Dashboard 路由 `/dashboard` 需要登录访问。

- 未登录用户访问 `/dashboard` 时重定向到 `/login`
- 登录成功后重定向回 `/dashboard`

#### Scenario: 未登录访问 Dashboard

- **GIVEN** 用户未登录
- **WHEN** 访问 `/dashboard`
- **THEN** 跳转到 `/login`
- **AND** 登录后重定向回 `/dashboard`

---

### Requirement: 用户信息来源

Dashboard 的用户相关信息从后端 API 获取。

- 不再使用 Mock 数据
- 调用 `GET /api/users/me` 获取用户信息
- API 调用失败时显示错误状态

#### Scenario: 加载用户信息

- **GIVEN** 用户已登录
- **WHEN** Dashboard 加载
- **THEN** 调用 `GET /api/users/me` 获取用户信息
- **AND** 显示用户头像、学习天数、等级

#### Scenario: API 请求失败

- **GIVEN** 后端服务不可用
- **WHEN** Dashboard 加载
- **THEN** 显示错误提示
- **AND** 不阻断其他 Mock 数据的渲染
