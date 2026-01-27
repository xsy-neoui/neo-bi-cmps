### 目录说明
- src: 自定义组件源码；
- src/assets: 存放组件静态资源，比如 css、img等；
- src/components: 存放自定义组件代码，每个自定义组件以自身名称（cmpType 数值）作为目录进行存放；
- src/components/xxCmp/index: 自定义组件的内容文件；
- src/components/xxCmp/model: 自定义组件的模型文件，用于对接页面设计器；
- neo.config.js: neo-cmp-cli 配置文件。

### 组件开发规范
- 存放在 src/components 目录下的自定义组件，默认 index 为自定义组件源码入口文件，model.[tj]s 为自定义组件的模型文件（对接页面设计器需要）；
- 当 neo.config.js 中的 entry 为空或者不存在时，cli 将根据 src/components 目录下的自定义组件结构生成对应的 entry 配置（可在命令控制台查看生成的 entry 配置）；
- 自定义组件中可用的配置项类型 请见 [当前可用表单项](https://github.com/wibetter/neo-register/blob/master/docs/FormItemType.md)；
- 自定义组件最外层请设置一个唯一的 ClassName（比如 xx-cmpType-container），所有内容样式请放在该 ClassName 中，避免自定义组件样式相互干扰；
- 默认开启代码规范检测（含样式内容），如需关闭，请调整 neo.config.js 相关配置；
- 请使用 react 16 版本；
- 支持在自定义组件中使用 Open API，详细见[使用说明](https://www.npmjs.com/package/neo-open-api)。

### 自定义组件注册器使用说明
- [neo-register 使用说明](https://www.npmjs.com/package/neo-register?activeTab=readme)
备注：预览、调试（linkDebug）和构建发布时 cli 会自动创建对应的注册文件（含 neo-register 的使用），用户无需关注 neo-register。

### 开发说明

1. **安装依赖**
```bash
$ npm i 或者 yarn
```

2. **preview: 组件预览模式（带热更新）**
> preview模式：用于预览自定义组件内容。
```bash
$ npm run preview
```

3. **linkDebug: 外链调试（在线上页面设计器端预览自定义组件）**
> linkDebug模式：用于在线上页面设计器中预览和调试自定义组件。
```bash
$ npm run linkDebug
```

4. **发布到 NeoCRM 平台**
> 需要确保 package.json 中的 name 值唯一，version 值不重复。
```bash
$ npm run pushCmp
```


### 🔐 授权配置

使用 `neo push cmp`、`neo pull cmp`、`neo delete cmp` 等命令与 NeoCRM 平台交互时，需要配置授权信息。

#### 方式一：OAuth2 登录授权（推荐）

OAuth2 授权码模式更加安全可靠，无需用户配置账户名和密码。

##### 使用步骤

1. **登录 NeoCRM 平台**
   ```bash
   neo login
   ```
   
   执行流程：
   - 自动打开浏览器访问授权页面
   - 在浏览器中输入 NeoCRM 账号密码进行登录（需选择对应的租户）
   - 授权成功后自动跳转回本地（附带 code）
   - cli 端 通过 code 获取 Token，并自动保存到项目的 `.neo-cli/token.json` 文件中

2. **登出 NeoCRM 平台**
   ```bash
   neo logout
   ```
   
   功能：清除本地保存的 token 文件，下次使用需要重新登录。

##### neo login 选择「自定义环境」时的授权配置示例

```javascript
// neo.config.js
module.exports = {
  neoConfig: {
    neoBaseURL: 'https://crm-cd.xiaoshouyi.com', // 平台根地址（默认：https://crm.xiaoshouyi.com）
    // 登录授权 URL（用于获取 code）
    loginURL: 'https://login-cd.xiaoshouyi.com/auc/oauth2/auth',
    tokenAPI: 'https://login-cd.xiaoshouyi.com/auc/oauth2/token', // Token 获取接口地址
  },
}
```

##### Token 有效期

- **access_token**：默认有效期 2 小时
- **refresh_token**：默认有效期 30 天
- 系统会在 access_token 过期前 5 分钟自动刷新
- 如果 refresh_token 也过期，需要重新执行 `neo login`

##### 常见问题

**Q1: 浏览器无法自动打开怎么办？**  
A: 命令行会输出授权 URL，手动复制到浏览器中打开即可。

**Q2: Token 刷新失败怎么办？**  
A: 如果 refresh_token 也过期（默认 30 天），需要重新执行 `neo login`。同时检查网络连接是否正常。

**Q3: 授权登录后没有正常跳回 redirect_uri**  
A: 可能被浏览器安装的插件影响，目前已知会影响授权登录的浏览器插件有：Neo UI Extension，请关闭插件后重试。

#### 方式二：密码授权配置

在项目根目录的 `neo.config.js` 文件中添加 NeoCRM 平台授权配置：

```javascript
module.exports = {
  neoConfig: {
    neoBaseURL: 'https://crm-cd.xiaoshouyi.com', // 平台根地址（默认：https://crm.xiaoshouyi.com）
    tokenAPI: 'https://login-cd.xiaoshouyi.com/auc/oauth2/token', // Token 获取接口地址
    // NeoCRM 授权配置
    auth: {
      client_id: 'xx', // 客户端 ID，从创建连接器的客户端信息中获取（Client_Id）
      client_secret: 'xxx', // 客户端秘钥，从创建连接器的客户端信息中获取（Client_Secret）
      username: 'xx', // 用户在销售易系统中的用户名
      /**
       * password 为 用户在销售易系统中的账号密码加上 8 位安全令牌。
       * 例如，用户密码为 123456，安全令牌为 ABCDEFGH，则 password 的值应为 123456ABCDEFGH。
       */
      password: 'xx xx' // 用户账户密码 + 8 位安全令牌
    },
  },
}
```

##### 授权配置获取方式

1. **客户端 ID 和客户端秘钥**：需通过创建连接器获取
   - 访问 [销售易文档中心](https://doc.xiaoshouyi.com) / 创建连接器
   - 创建连接器后，从客户端信息中获取 `Client_Id` 和 `Client_Secret`

2. **安全令牌**：如何获取安全令牌
   - 访问 [销售易文档中心](https://doc.xiaoshouyi.com) / OAuth安全认证 / 密码模式 / 获取令牌
   - 按照文档说明获取 8 位安全令牌
   - `password` 字段 = 用户账户密码 + 8 位安全令牌（直接拼接，无空格或分隔符）

#### OAuth2 模式 vs 密码模式

| 特性 | OAuth2 授权码模式 | 密码模式 |
|------|------------------|---------|
| 安全性 | ✅ 高（无需在配置文件中存储密码） | ⚠️ 较低（需要配置密码和安全令牌） |
| Token 刷新 | ✅ 自动刷新 | ✅ 自动刷新 |
| 有效期 | 2 小时（可自动刷新） | 永不过期 |
| 推荐程度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

### 配置项说明（neo-cmp-cli）
[请查看neo-cmp-cli](https://www.npmjs.com/package/neo-cmp-cli)
