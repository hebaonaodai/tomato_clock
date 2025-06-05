# 番茄时钟

一个基于 Vue 3 的番茄工作法计时器应用。

## 功能特点

- 25分钟专注时间计时
- 5分钟休息时间计时
- 可自定义工作时长和休息时长
- 圆形进度条显示
- 时间到提示音
- 响应式设计，支持移动端

## 技术栈

- Vue 3
- Vite
- Vant UI
- Pinia
- Vue Router

## 安装与运行

1. 克隆项目
```bash
git clone [项目地址]
cd tomato_clock
```

2. 安装依赖
```bash
npm install
```

3. 运行开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 使用说明

1. 点击"开始"按钮开始计时
2. 计时过程中可以点击"暂停"按钮暂停
3. 点击"重置"按钮重置计时器
4. 在设置区域可以自定义工作时长和休息时长

## 项目结构

```
tomato-clock/
├── public/                 # 静态资源
│   └── sounds/            # 提示音文件
├── src/
│   ├── assets/            # 项目资源
│   ├── components/        # 公共组件
│   ├── views/             # 页面组件
│   ├── stores/            # Pinia 状态管理
│   ├── router/            # 路由配置
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
└── README.md              # 项目说明
```
## dist文件结构

```
dist/
├── assets/          # 构建后的静态资源
│   ├── Home-xxx.js
│   ├── Home-xxx.css
│   ├── Settings-xxx.js
│   ├── Settings-xxx.css
│   ├── index-xxx.css
│   ├── index-xxx.js
│   └── timer-xxx.js
├── index.html       # 入口HTML文件
├── sounds/          # 音频资源
│   └── mixkit-interface-hint-notification-911.wav
└── vite.svg         # 图标文件
```

## 开发计划

- [ ] 添加任务管理功能
- [ ] 添加统计功能
- [ ] 添加自定义主题
- [ ] 添加更多提示音选项 
