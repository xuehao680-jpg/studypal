## ADDED Requirements

### Requirement: Dashboard 侧边栏导航

Dashboard 左侧有固定侧边栏，包含导航链接。

- 侧边栏固定在左侧，高度 100vh
- 导航项包含：首页、课程、统计、设置
- 品牌站导航栏内"学习模式"按钮点击后跳转到 `/dashboard`

#### Scenario: 侧边栏始终可见

- **GIVEN** 用户访问 `/dashboard`
- **WHEN** 页面加载
- **THEN** 左侧显示固定侧边栏
- **AND** 侧边栏包含 4 个导航项

#### Scenario: 侧边栏项不支持跳转

- **GIVEN** 侧边栏已加载
- **WHEN** 用户点击"课程"或"统计"链接
- **THEN** 页面不跳转（占位项，等待后续实现）

---

### Requirement: 统计卡片

Dashboard 主内容区顶部显示 4 张统计卡片。

- 4 张卡片网格布局（2列桌面，1列移动端）
- 每张卡片包含：图标、数值、标签
- 数据来源为 Mock 数据

#### Scenario: 统计卡片正常显示

- **GIVEN** Dashboard 已加载
- **WHEN** 用户查看主内容区顶部
- **THEN** 显示 4 张统计卡片
- **AND** 每张卡片显示对应数值和标签

---

### Requirement: 每日目标清单

Dashboard 显示今日学习目标清单。

- 清单包含多个目标项，每项可显示完成状态
- 已完成项有视觉标记（勾选样式）

#### Scenario: 目标清单显示

- **GIVEN** Dashboard 已加载
- **WHEN** 用户查看每日目标区域
- **THEN** 显示多个目标项
- **AND** 已完成项显示勾选状态

---

### Requirement: AI 学习建议卡片

Dashboard 显示 AI 学习建议区域。

- 显示一段建议文本
- 卡片样式与其他模块风格一致

#### Scenario: 建议卡片显示

- **GIVEN** Dashboard 已加载
- **WHEN** 用户查看建议区域
- **THEN** 显示 AI 学习建议卡片
- **AND** 内容为 Mock 文本，无真实 AI 调用

---

### Requirement: 学习趋势图

Dashboard 显示周/月学习趋势图。

- 支持切换周视图和月视图
- 图表类型为柱状图
- 数据来源为 Mock 数据

#### Scenario: 趋势图默认显示周视图

- **GIVEN** Dashboard 已加载
- **WHEN** 用户查看趋势图区域
- **THEN** 默认显示周视图柱状图

#### Scenario: 切换月视图

- **GIVEN** 趋势图显示周视图
- **WHEN** 用户点击"月"切换按钮
- **THEN** 图表切换为月视图数据
