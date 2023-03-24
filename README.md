# webpack-skip-compile

将项目中不使用的文件或文件夹略过webpack编译，从而提升编译速度

## 安装

```js
    yarn add webpack-skip-compile
```

## 使用

```js
    function resolve(dir) {
        return path.join(__dirname, '..', dir);
    }
    const SkipCompile = require("webpack-skip-compile")
    new SkipCompile('src/pages',[
      'dataCenter'
    ],{
      alias:[{
        key:'@',
        value:resolve('src')
      }],
      include:['.vue']
    })
```

## 参数说明

- 参数一
    
    指定入口文件，不指定则从根文件开始

- 参数二

    指定排除编译的文件

- 参数三

    辅助项，由alias和include组成，前者是在项目中使用的别名，后者是用于指定过滤哪些文件
