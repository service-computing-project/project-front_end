# project-front_end

### 前端开发框架

* 框架：Angular 10.1.5

* 样式库
  * [ng-zorro-antd version "10.0.1"](https://ng.ant.design/version/10.2.x/docs/introduce/zh)
  

### 前端模块架构

基本结构根据 Angular 项目文件结构和风格指南编写，下面说明项目相关模块

> [工作区和项目文件结构](https://angular.cn/guide/file-structure#workspace-and-project-file-structure)
>
> [风格指南](https://angular.cn/guide/styleguide)

* 根模块：app.module.ts
* 路由模块：
  * app-routing.module.ts
* 通用服务模块：
  * auth.interceptor.ts
* 页面组件模块
  * content.component.ts
  * error.component.ts
  * home.component.ts
  * login.component.ts
  * user.component.ts
* 通用组件模块
  * new-content-editor-button.ts
  * register.component.ts


### 前端基本页面功能

- [ ] 导航栏
  - [ ] 登录/注册按钮，点击
    - [ ] 方案一：出现弹窗进行操作【参照Leetcode】
    - [ ] 方案二：跳转到登录注册页面
  ~~- [ ] 查看通知按钮？~~
  - [ ] 用户信息入口按钮
<br/>

- [ ] 广场页？
  - [ ] 按时间顺序推送用户的博客
    - [ ] 点击博客可查看详情
      - [ ] 他人的博客只读和点赞【和取消点赞？】
      - [ ] 自己的博客可增删【改？】和点赞【和取消点赞？】
    - [ ] 点击博客作者可查看其他用户信息？
<br/>

- [ ] 博客详情页
<br/>

- [ ] 用户信息页
  - [ ] 一些个人信息
  - [ ] 通知中心
  - [ ] 博客列表
    - [ ] 按时间列出
    - [ ] 按 **tag** 列出

- [ ] 404页

---
Q:
- 记住用户状态？

