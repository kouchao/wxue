# 介绍
[wxue](https://github.com/kouchao/wxue)是一个微信小程序的增强库，可以在小程序中使用[vue](https://v3.vuejs.org/)的语法，如[composition-api](https://composition-api.vuejs.org/)，还会对小程序做一些简单的优化。

## 它是怎样工作的
它对微信小程序的`Page`对象进行劫持，处理传入的`confing`，对原生的`api`进行劫持、封装、优化，实现类[vue](https://v3.vuejs.org/)的语法糖。事实上，最终依然调用微信小程序的`api`。

## 名字的由来
一开始的实现，仅仅是对[composition-api](https://composition-api.vuejs.org/)语法的实现，叫做`weapp-composition`。后面对微信小程序做了一些优化，也希望以后会支持更多[vue](https://v3.vuejs.org/)的`api`，这样`weapp-composition`的名字就会引起误会。

像[vue](https://v3.vuejs.org/)名字比较相似的名字，如`weappue`，感觉有点长，不如`wue`。但是`wue`被占用了，于是起了名字[wxue](https://github.com/kouchao/wxue)。

## 与现有库的不同
[wxue](https://github.com/kouchao/wxue)是一个运行时的库，因此只是对`javascript`部分的增强。

## 在未来
- 尽量完整的支持完整的[vue](https://v3.vuejs.org/)语法
- [typescript](www.typescriptlang.org)的支持
- [vue](https://v3.vuejs.org/)的生态，如[vuex](https://vuex.vuejs.org/)、[router](https://router.vuejs.org/)
- 更多的优化
- 插件机制。
- 支持更多小程序