## 项目内用到的工具的配置文件目录

```
├── env.ts
├── paths.ts
├── postcss.config.js
├── tsconfig.webpack.json
├── webpack
│   ├── devserver.ts
│   ├── devtool.ts
│   ├── entry.ts
│   ├── index.ts
│   ├── module.ts
│   ├── optimization.ts
│   ├── output.ts
│   ├── plugins.ts
│   └── resolve.ts
└── webpack.config.ts
```

### `env.ts` 预设了四个环境变量

- **development** 支持自动刷新的普通开发环境。在此环境下有完善的 source-map 支持和快速的编译速度。

- **hmr** 在 development 基础上支持了热重载，由于 4.x 版本的 react-hot-loader 要与 babel 集成，为了不引入复杂的工具链和下载庞大的 node_modules，所以暂用 3.x 版本，后续可能放弃支持。

- **production** 生产环境，通过抽离 css 文件，压缩代码，hash 文件手段生成更符合生产环境的代码。将 webpack runtime 代码 inline 到 html 以减少 http 请求，但可能不符合 [csp 规范](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)。[参考这儿](https://github.com/angular/angular-cli/pull/5750)。

- **inspect** 基本同生产环境，保留了 pathinfo 及 source-map，用来检查打包后的代码是否符合预期。

---

### `paths.ts` 配置文件中所需的一些文件目录的绝对路径

---

### `postcss.config.js` postcss 配置文件，其中用到的插件有

- [postcss-import](https://github.com/postcss/postcss-import)

- [postcss-utilities](https://ismamz.github.io/postcss-utilities/)

- [postcss-extend-rule](https://github.com/jonathantneal/postcss-extend-rule)

- [postcss-preset-env](https://preset-env.cssdb.org/)

- [autoprefixer](https://github.com/postcss/autoprefixer) *生产环境开启*

- [flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes) *生产环境开启*

---

### `tsconfig.webpack.json` 使用于 webpack.config.ts 的 ts 配置文件，由于 node 不支持编译为 esnext module，所以新建一个文件编译到 commonjs。

---

### **`webpack`** webpack 拆分配置文件目录，根据不同的 env 返回不同的配置。

---

### `webpack.config.ts` webpack 配置文件
