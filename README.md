# Vue Simple Scroll ![version](https://img.shields.io/badge/version-%20v1.0.2%20-green.svg) ![vue](https://img.shields.io/badge/vue-%20v2.4.4%20-green.svg) 

[Vue Simple Scroll](https://github.com/machaosuper/vue-simple-scroll) High-performance rolling Vue components, refresh and unlimited load.


## Demo

[https://github.com/machaosuper/vue-simple-scroll](https://github.com/machaosuper/vue-simple-scroll)
### or
```bash
# install dependencies
npm install

# serve with hot reload at localhost:9000
npm run dev

# build for production with minification
npm run build
```


## How to use

```bash
npm i vue-simple-scroll --save-dev
```

```js
/* ignore this if you include vue-scroller.js by <script> tag from a cdn, such as unpkg */
import Vue from 'vue'
import vueSimpleScroll from 'vue-simple-scroll';
Vue.use(vueSimpleScroll);
```

```html
<simple-scroll
  :on-refresh="refresh"
  :on-infinite="infinite">
  <!-- content goes here -->
</simple-scroll>
```


## Webpack project by vue-cli

https://github.com/machaosuper/vue-simply-scroll

## API

#### vue-simple-scroll component attributes:

| 属性名 | 相关描述 | 类型 | 默认值 |
|-----|-----|-----|-----|
| onRefresh | 下拉刷新的回调函数 | Function | - |
| onInfinite | 上拉加载更多的回调函数 | Function | - |
| isRefreshText | 下拉刷新是否显示文字提示 | Boolean | true |
| noDataText | 上拉加载更多没有数据时显示 | String | 我是有底线的~~ |
| infiniteLoadingText | 上拉加载更多加载中文字 | String | 加载中 |
| offset | 内容区位于顶部的偏移量 | Number | 0 |
| distance | 滑动距离底部多少开始加载 | Number | 0 |
| refreshLayerColor | 下拉刷新图标和字的颜色 | String | #ff6863 |
| loadingLayerColor | 上拉加载更多图标和字的颜色 | String | #ff6863 |

#### vue-simple-scroll vm instance methods:

- `scrollTop(y:Integer)` 内容滚动到指定位置
- `getPosition()` 获取当前滚动的距离
- `resetInfinite()` 重置上拉加载更多当前状态
- `setInfiniteStatus(b:Boolean)` 设置上拉加载更多当前状态, true：已经到最后一页，false：反之

