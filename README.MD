# vue 的 taost 插件

> css 动画样式使用的 vivify 动画组件中的部分动画

## 初始化

> 在 main.js 进行引入并初始化

```javascript
import toast from './plugins/xyhToast';

// 第二个参数传入确认按钮颜色
Vue.use(toast, '#abcdef');
```

## showLoading(msg);

> 使用 loading 加载

| Param |  Type  | Default | Description      |
| :---- | :----: | :-----: | :--------------- |
| msg   | String |         | loading 提示语句 |

```vue
<template>
  <div id="app"></div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$toast.showLoading('加载中');
  },
};
</script>

<style></style>
```

## hideloading();

> 隐藏 loading 动画

```vue
<template>
  <div id="app"></div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$toast.showLoading('加载中');
    setTimeout(() => {
      this.$toast.hideLoading();
    }, 2000);
  },
};
</script>

<style></style>
```

## toast(options);

> toast 弹窗

| Param                   |   Type   | Default | Description                                          |
| :---------------------- | :------: | :-----: | :--------------------------------------------------- |
| {options.title}         |  String  |         | 标题                                                 |
| {options.msg}           |  String  |         | 内容                                                 |
| {options.button}        |  String  |         | 确认按钮文字                                         |
| {options.type}          |  Number  |         | 提示类型，0、info 提示 1、success 提示 2、error 提示 |
| {options.close}         | Boolean  | String  | 取消                                                 | 显示取消按钮或者配置取消按钮内容 |
| {options.callback(res)} | Function |         | 按钮点击回调，确定点击返回 true，反之返回 false      |

```vue
<template>
  <div id="app"></div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    const options = {
      title: '标题',
      msg: '内容',
      button: '确定',
      type: 0,
      close: true,
      callback(res) {
        console.log(res);
      },
    };
    this.$toast.showToast(options);
  },
};
</script>

<style></style>
```
