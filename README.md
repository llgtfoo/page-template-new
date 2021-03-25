# vue-tpl

## vue3.0 模块,开箱即用

```
封装组件和指令，ui为ant-design-vue@2.0.1
```

```
page-tpl-new
├─ .eslintrc.js
├─ .gitignore
├─ babel.config.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  └─ index.html
├─ README.md
├─ src
│  ├─ app.js
│  ├─ App.vue
│  ├─ assets
│  │  ├─ css
│  │  │  ├─ init.css
│  │  │  └─ scroll.scss
│  │  └─ imgs
│  │     └─ login.png
│  ├─ components
│  │  ├─ deteTime
│  │  │  └─ index.vue
│  │  ├─ echartCommon
│  │  │  └─ index.vue
│  │  ├─ index.js
│  │  ├─ Layout
│  │  │  └─ index.vue
│  │  ├─ listCustom
│  │  │  └─ index.vue
│  │  ├─ Loading
│  │  │  ├─ index.module.scss
│  │  │  └─ index.vue
│  │  ├─ NotData
│  │  │  ├─ assets
│  │  │  │  └─ not-data.png
│  │  │  └─ index.vue
│  │  ├─ NotFound
│  │  │  ├─ assets
│  │  │  │  └─ 404.png
│  │  │  └─ index.vue
│  │  ├─ numberScroll
│  │  │  └─ index.vue
│  │  ├─ svgIcons
│  │  │  └─ index.vue
│  │  ├─ systemNav
│  │  │  └─ index.vue
│  │  ├─ Table
│  │  │  └─ index.vue
│  │  └─ themeProvider
│  │     ├─ index.vue
│  │     ├─ script
│  │     │  └─ loadTheme.js
│  │     └─ theme
│  │        ├─ deepBlue.theme.less
│  │        ├─ default.theme.less
│  │        ├─ green.theme.less
│  │        ├─ red.theme.less
│  │        ├─ theme.css
│  │        └─ theme.scss
│  ├─ directives
│  │  ├─ auto-scale
│  │  │  ├─ children.polyfill.js
│  │  │  └─ index.js
│  │  ├─ drag
│  │  │  └─ index.js
│  │  ├─ index.js
│  │  └─ water-marker
│  │     └─ index.js
│  ├─ http
│  │  ├─ axios.js
│  │  └─ index.js
│  ├─ icons
│  │  ├─ index.js
│  │  └─ svg
│  │     ├─ logo.svg
│  │     ├─ long.svg
│  │     └─ yu.svg
│  ├─ main.js
│  ├─ mock
│  │  └─ menus
│  │     └─ index.json
│  ├─ router
│  │  └─ index.js
│  ├─ store
│  │  ├─ common
│  │  │  ├─ index.js
│  │  │  └─ modules
│  │  │     └─ user.js
│  │  └─ index.js
│  ├─ utils
│  │  ├─ bus.js
│  │  ├─ doAnimation.js
│  │  └─ index.js
│  └─ views
│     ├─ index.js
│     ├─ login
│     │  └─ index.vue
│     └─ menu
│        ├─ index.js
│        ├─ router.js
│        ├─ store.js
│        └─ views
│           └─ children
│              ├─ menu-1
│              │  ├─ api.js
│              │  ├─ index.vue
│              │  └─ store.js
│              └─ menu-2
│                 ├─ api.js
│                 ├─ index.vue
│                 └─ store.js
└─ vue.config.js
```
