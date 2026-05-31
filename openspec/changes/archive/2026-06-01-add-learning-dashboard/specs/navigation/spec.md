## MODIFIED Requirements

### Requirement: 导航栏内容布局

导航栏左侧显示站点名称，右侧显示导航链接。

- 站点名称与 Hero 中的姓名一致
- 导航链接包含：首页、关于、项目、学习模式、联系我
- 使用 Flexbox 左右布局

#### Scenario: 正常显示导航栏内容

- **GIVEN** 导航栏已加载
- **WHEN** 用户查看页面顶部
- **THEN** 左侧显示站点名称
- **AND** 右侧依次显示"首页"、"关于"、"项目"、"学习模式"、"联系我"链接

---

### Requirement: 导航链接行为

导航链接根据不同目标执行不同行为。

- "首页"、"关于"、"项目"、"联系我"使用 scrollIntoView 滚动到对应 section
- "学习模式"跳转到 `/dashboard` 路由

#### Scenario: 点击"学习模式"

- **GIVEN** 导航栏已加载
- **WHEN** 用户点击"学习模式"链接
- **THEN** 页面跳转到 `/dashboard`
