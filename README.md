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