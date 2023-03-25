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
      'dataCenter',
      {
        file:'orderList',
        exclude:[
          'constants'
        ]
      }
    ],{
      alias:[{
        key:'@',
        value:resolve('src')
      }],
      checkType:['.vue'],
      skipQuoteCheck:false
    })
```

## 参数说明

- 参数一
    
    指定入口文件，不指定则从根文件开始

- 参数二

    指定排除编译的文件

- 参数三

    辅助项

    1-alias：在webpack中配置的别名
    2-checkType：需要校验引用关系的文件
    3-skipQuoteCheck：是否跳过引用关系检查，建议本地添加新的过滤文件时启用检查，发布生产时关闭
