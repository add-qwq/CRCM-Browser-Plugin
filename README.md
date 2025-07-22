# CRCM-Browser-Plugin

## Interface Overview
![Preview](https://github.com/add-qwq/CRCM-Browser-Plugin/blob/main/CRCM-Browser-Plugin.png?raw=true)  
![Preview](https://github.com/add-qwq/CRCM-Browser-Plugin/blob/main/CRCM-Browser-Plugin2.png?raw=true)  

A browser extension developed based on the [Custom-Right-Click-Menu](https://github.com/add-qwq/Custom-Right-Click-Menu) project, providing a modern, feature-rich alternative to the default right-click menu.  

![GitHub license](https://img.shields.io/github/license/add-qwq/CRCM-Browser-Plugin?style=flat-square)  


### Key Features
- **Intelligent Context-Aware Menu**: Automatically displays relevant operations based on clicked content (text, links, images, input fields)
- **Modern UI Design**: Smooth animations, hover effects, and responsive layout
- **Highly Customizable**: Supports selecting Font Awesome sources and enables/disables the custom menu at any time
- **Lightweight**: Minimal impact on browser performance
- **Cross-Browser Compatibility**: Supports Chrome, Firefox, Edge, and Safari (with partial limitations)
- **Automatic Menu Style Switching with System Color Mode (Light/Dark Mode)**  


### Installation Guide
#### For Edge Browser
1. **Download the Extension**: Visit the [Releases](https://github.com/add-qwq/CRCM-Browser-Plugin/releases) page and download CRCM-Browser-Plugin.zip
2. **Extract Files**: Unzip the downloaded ZIP file to a local folder
3. **Enable Developer Mode**:
   - Open the Edge browser
   - Click the ... in the top right corner > Extensions > Manage Extensions
   - Enable Developer mode in the top right corner
4. **Load the Extension**:
   - Click Load unpacked extension
   - Select the folder you just extracted (CRCM-Browser-Plugin)
5. **Verify Installation**:
   - The extension icon will appear in the toolbar
   - Right-click on a webpage to test the custom menu

#### For Chrome/Brave Browser
1. Follow similar steps to Edge
2. Navigate to chrome://extensions
3. Enable Developer mode
4. Click Load unpacked and select the extension folder  


### Configuration Options
1. **Open Settings Page**:
   - Click the extension icon in the toolbar
   - Select Options or click the gear icon

2. **Customize Settings**:
   - **Font Awesome Source**: Choose between global CDN or China CDN
   - **Enable/Disable**: Toggle the custom menu on/off at any time


### Context Menu Actions
The menu displays different operations based on the context:

| Context Scenario    | Available Actions                          |
|---------------------|--------------------------------------------|
| Plain Page          | Refresh Page, Back to Home                  |
| Selected Text       | Copy Text            |
| Links               | Open Link, Copy Link    |
| Images              | Open Image, Copy Image URL    |
| Input Fields        | Paste                          |  


### Development Guide
#### Project Structure
```
CRCM-Browser-Plugin/
├── icon.png                # Extension icons and resources
├── CRCMenu.js              # Core menu functionality
├── option.js               # Settings page logic
├── CRCMenu.css             # Menu styling
├── option.html             # Settings page
├── manifest.json           # Extension configuration file
└── README.md               # This documentation
```


### License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.  


---


# CRCM-Browser-Plugin

## 界面概览
![预览](https://github.com/add-qwq/CRCM-Browser-Plugin/blob/main/CRCM-Browser-Plugin.png?raw=true)  
![预览](https://github.com/add-qwq/CRCM-Browser-Plugin/blob/main/CRCM-Browser-Plugin2.png?raw=true)  

基于[Custom-Right-Click-Menu](https://github.com/add-qwq/Custom-Right-Click-Menu)项目开发的浏览器扩展，提供现代化、功能丰富的右键菜单替代方案。  

![GitHub license](https://img.shields.io/github/license/add-qwq/CRCM-Browser-Plugin?style=flat-square)  


### 功能特点
- **智能上下文菜单**：根据点击内容（文本、链接、图片、输入框）自动显示相关操作
- **现代UI设计**：流畅动画、悬停效果和响应式布局
- **高度可定制**：支持选择Font Awesome源，可随时启用/禁用
- **轻量级**：对浏览器性能影响极小
- **跨浏览器兼容**：支持Chrome、Firefox、Edge和Safari（部分限制）
- **菜单样式随系统颜色自动切换（黑白模式）**  


### 安装指南
#### Edge浏览器安装步骤
1. **下载扩展**：访问[Releases](https://github.com/add-qwq/CRCM-Browser-Plugin/releases)页面，下载CRCM-Browser-Plugin.zip
2. **解压文件**：将下载的ZIP文件解压到本地文件夹
3. **启用开发者模式**：
   - 打开Edge浏览器
   - 点击右上角... > 扩展 > 管理扩展
   - 启用右上角开发者模式
4. **加载扩展**：
   - 点击加载解压缩的扩展
   - 选择刚才解压的文件夹（CRCM-Browser-Plugin）
5. **验证安装**：
   - 扩展图标将出现在工具栏中
   - 在网页上右键点击测试自定义菜单

#### Chrome/Brave浏览器安装
1. 遵循与Edge类似的步骤
2. 访问chrome://extensions
3. 启用开发者模式
4. 点击加载已解压的扩展程序并选择扩展文件夹  


### 设置选项
1. **打开设置页面**：
   - 点击工具栏中的扩展图标
   - 选择选项或齿轮图标

2. **自定义设置**：
   - **Font Awesome源**：选择全球网络的CDN或中国网络的CDN
   - **启用/禁用**：随时开关自定义菜单


### 上下文菜单操作
菜单会根据不同的上下文显示不同的操作：

| 上下文场景         | 可用操作                                  |
|--------------------|------------------------------------------|
| 普通页面           | 刷新页面、返回主页                       |
| 选中文本           | 复制文本、谷歌搜索                       |
| 链接               | 打开链接、复制链接、无痕模式打开         |
| 图片               | 打开图片、复制图片URL、保存图片          |
| 输入框             | 粘贴                         |  


### 开发指南
#### 项目结构
```
CRCM-Browser-Plugin/
├── icon.png                # 扩展图标和资源
├── CRCMenu.js              # 核心菜单功能
├── option.js               # 设置页面逻辑
├── CRCMenu.css             # 菜单样式
├── option.html             # 设置页面
├── manifest.json           # 扩展配置文件
└── README.md               # 本说明文档
```


### 许可证
本项目采用Apache License 2.0授权 - 详情请参阅[LICENSE](LICENSE)文件。
