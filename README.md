## Bottom Tip(an at-bottom message tip)

Note: you have to maintain logs manually with this module.

Prototype https://youtu.be/wjLxXS0CV4k

I intented to replace [webpack-hud][hud] with it
but it turned out to be not as useful as webpack-hud
since messages from Webpack is quite messy.

[hud]: https://github.com/mvc-works/webpack-hud

### Usage

```bash
npm i --save-dev bottom-tip
```

```js
import render from "bottom-tip";

render("warn", "some warning message");

setTimeout(function() {
  render("inactive", null);
}, 2000);
```

Types:

- `inactive`
- `ok`
- `ok~`(show and then hide)
- `warn`
- `error`

### Develop

Try this project:

```bash
yarn vite
# open http://localhost:3000
```

### License

MIT

### 验证与发布

使用 Node 24 和 Yarn 1.22.22，按现有 lockfile 安装依赖：

```bash
corepack yarn@1.22.22 install --frozen-lockfile
corepack yarn@1.22.22 compile
corepack yarn@1.22.22 test
corepack yarn@1.22.22 vite build --base=./
npm pack --dry-run --ignore-scripts
```

测试直接使用 Node 原生 ESM 导入编译后的公共入口，不依赖浏览器全局变量或 resolver hook。PR 检查只运行构建、测试和包内容检查；Demo 上传仅在 main/master 的 push 上运行，目标目录不变。正式 npm 发布仍由 GitHub Release 触发，源码合并或构建成功不等于新包已经发布。
