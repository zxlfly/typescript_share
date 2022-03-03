# 安装
- 全局安装``npm i typescript -g``
- 生成ts配置文件``tsc --init``
- vscode终端-->运行任务>typescript>typescript监视，可以开启保存后自动编译到配置文件指定的位置

# 数据类型（type-of-data.ts）
- 布尔类型boolean
- 数字类型number
- 字符串类型string
- 数组类型array
- 元祖类型tuple
- 枚举类型
  - 可以反向映射key值
  - ``EnumName[EnumName.key]``
  - 一般建议值使用枚举类型，最后会被翻译成整数，因此会有很多性质和整数相似，例如.toString()会返回整数值而不是key，想要或得key直接反向映射即可
- 任意类型any
  - 配置项``noImplicitAny``可以控制书否允许默认any类型。
- unknown
  - 可以将任何类型的值赋值给unknown
  - 不可以将unknown赋值给非any类型
  - 可以理解成是any类型对应的安全类型
- null 和 underfined
- void类型
- never类型
配置项``strictNullChecks``开启时，会显式的检查在使用时有可能为null的值。建议开启。  
``!``为非空断言。
## 类型的窄化
ts的类型是可以组合使用的。这样就需要在程序中判断当前值类型进行区分操作。  
类型窄化根据类型守卫在子语句块重新定义了具体的新类型。  
例如使用``typeof``判断，需要注意``null``。
### 真值窄化
可以更好的处理``null/undefind/0``等值
### 相等性窄化
通过```===,!==,==,!=``都可以来窄化类型。
```
function p(strs : string | string[] | null){
  if(strs !== null){
    if(typeof strs === 'object'){
      // string[]
    }else if(typeof strs === 'string'){
      // string
    }
  }
}
```
注意：``!=null``和``!=undefined``如果值是null或者undefined都为true。
### ``in``窄化
```
type Fish = {swim:()=>void}
type Bird = {fly:()=>void}
function move(animal:Fish|Bird){
  if('swim' in animal){
    return animal.swim()
  }
  return animal.fly()
}
```
这里不使用``instanceof``是因为type没有运行时。
### ``instanceof``窄化
```
function log(x:Date | string){
  if(x instanceof Date){
    // Date
  }else{
    // string
  }
}
```
### 组合类型推导
有时候ts会推导出组合类型。例如声明变量赋值时可能存在多种类型时。
### ts如何实现窄化的
首先在语法分析阶段，编译器会识别出类型卫兵表达式。包括一些隐性的类型卫兵，比如真值表达式、instanceof等等。  
那么在语义分析的时候，遇到控制流关键字``if/whild``等，就会看看是否有需要分析的窄化操作。
- 第一步找到卫兵表达式
  - 例如``typeof``
- 第二步根据返回值分别做窄化
- 窄化的本质是重新定义类型
## 类型断言
ts中有两个断言操作符，``Assertion``操作符``as``，和``Predicate``操作符``is``  
``Assertion``表示某个东西是什么  
``Predicate``是一个卫兵
# 函数（function.ts）
- 函数的定义
- 可选参数
- 默认参数
- 剩余参数
- 箭头函数
- 函数重载
- 类型推断
contexture typing 根据上下文猜测匿名函数参数类型
# 类（class.ts）
- es5的类
- ts类
  - 定义
  - 继承
  - 修饰符
  - 静态属性
  - 静态方法
  - 抽象类

# 接口（interface.ts）
- 属性接口
- 函数类型接口
- 可索引接口
- 类类型接口
- 接口扩展
接口可以继承（extends），type可以组合（&），使用时可以根据这一点选择使用谁。  
接口可以声明合并（Declaration Merging）,可以看做是向接口添加成员。
```
interfacr Box {
  w:number;
  h:number;
}
interfacr Box {
  scale:number
}
let box:Box = {w:10,h:10,scale:100}
```
# 泛型（generics.ts）
- 泛型的定义
- 泛型函数
- 泛型类
- 泛型接口
共有特征的一种抽象，允许将类型作为其他类型参数，从而分离不同关注点的实现。  
对于ts来说所有的key都是静态的
```
function getVal<T,K extends keyof T>(obj:T,key:K){
  return obj[key]
}
let x = {
  a:1,
  b:2
}
getVal(x,'a')
```
# 命名空间、模块化（namespace-modules.ts）
**命名空间**：在代码量较大的情况下，为了避免命名冲突，可以将相似功能的函数、类、接口等放置到命名空间中，将代码包裹起来。可以很好的组织代码，避免冲突。
**模块**：侧重代码的复用性，一个模块里可能会有多个命名空间。

# 装饰器
装饰器是一项实验性特性，在未来的版本中可能会发生改变。配置文件experimentalDecorators设置为true。
- 装饰器是一种特殊的类型的声明，能够附加到类声明、方法、属性和或者参数上。
- 通俗讲装饰器就是一个方法，可以注入到类、方法、属性、参数上来扩展功能。
- 常见的的装饰器：
  - 类装饰器
  - 属性装饰器
  - 方法装饰器
  - 参数装饰器
- 写法
  - 普通的无参装饰器
  - 装饰器工厂

# 声明合并  
指编译器将针对同一个名字的两个独立声明合并为单一声明。 合并后的声明同时拥有原先两个声明的特性。 任何数量的声明都可被合并；不局限于两个声明。具体参考[官方文档](https://www.tslang.cn/docs/handbook/declaration-merging.html)  