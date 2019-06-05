# ayanTimer
:tomato:番茄工作法

```javascript
var timer = new AyanTimer({
    container: document.querySelector("#app")  
})
```

## 事件触发

ayanTimer有6种事件 `['start', 'reset', "now", 'timing', 'clear']`,可以通过`AyanTimer.prototype.on`添加回调函数

```javascript
timer.on('start',function(){
    console.log('start')
})

```

## Getting started

```shell
npm install
```

## Development

```shell
npm run dev
npm run dev:web //web
```

## Packaging

To package the app for the local platform:

```shell
npm run package:win
```
