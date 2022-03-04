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
## infer和强大的类型计算体系
```
// 基本计算能力
type Point = {x :number,y:number}
type Product = {res : number}
// 联合
type Z = Point | Product
type Z2 = Point & Product
// 只要在Point和Product内存在的值都可以
const a:Z = {res:10,x:1,y:10}
const a2:Z2 = {res:10,x:1,y:10}
// never  因为这是不可能的
type A = string & number

//会合并
interface A {
  foo():void;
}
interface A {
  bar():void;
}
```
### 更复杂的情况
例如一个函数接受一个不限层级的数组，返回里面的值，即展开数组。
```
// 一层
type Flatterned<T> = T extends Array<infer V> ? V : T
type D = Flatterned<Array<number>>
```
```
// 递归解决多层
type Flatterned<T> = T extends Array<infer V> ? Flatterned<V> : T
type D = Flatterned<Array<Array<number>>>
```
基本实现
```
type Flatterned<T> = T extends Array<infer V> ? Flatterned<V> : T
type D = Flatterned<Array<Array<number>>>

function flattern<T extends Array<any>>(arr:T):Array<Flatterned<T>>{
    return (new Array<Flatterned<T>>()).concat(
        ...arr.map(x=>Array.isArray(x)?flattern(x):x)
    )
}
flattern([1,2,3,[5,6,[8]]])
```
去掉any
```
type Atom = string | boolean | number 
type Nested<T> = Array<(T | (T | T[])[])>
// type Nested = Array<(Atom | Nested)>
function flattern<T extends Atom>(arr:Nested<Atom>):Atom[]{
    return (new Array<Atom>()).concat(
        ...arr.map(x=>Array.isArray(x)?flattern(x):x)
    )
}
flattern([1,2,3,[5,6,[8]]])
```
将promise数组拆成string[]
```
type Unwrap<T> = T extends Promise<infer U> ? Unwrap<U>
:T extends Array<infer V> ? 
    UnwrapArray<T>:
    T
type UnwrapArray<T> = T extends Array<infer U> ? { [P in keyof T] :Unwrap<T[P]> } : T

type TO = Unwrap<Promise<Promise<string>>[]>
```
# 函数（function.ts）
- 函数的定义
- 可选参数
- 默认参数
- 剩余参数
- 箭头函数
- 函数重载
- 类型推断
contexture typing 根据上下文猜测匿名函数参数类型
## 参数是构造函数且限制类型
```
type SomeConstructor<T> = {
    // 这个new 代表这里有构造函数
    new (s:string):T
  }
  function fnn<T>(ctor :SomeConstructor<T>,n:string){
    return new ctor(n)
  }
  const arr = fnn<Array<string>>(Array,'100')
  console.log(arr);
```
## 泛型函数
```
function firstEle<Type>(arr:Type[]):Type{
  return arr[0]
}
```
## 关于推导
```
// map: a => b
function map<Input,Output>(
  arr:Input[],
  func:(arg:Input)=>Output
  ):Output[]{
    return arr.map(func)
}
// 泛型特化 帮助推导使用之后的类型，增强约束
const parsed = map(['1','2'],(n)=>parseInt(n))
```
## 泛型约束
也可以多传入一个构造函数，else里面return new ctor。  
不要加到extends的对象里面，不然就可以new obj，但是obj是构造的实例。
```
function n<T extends {length : number}>(
    obj:T,
    min:number
):T{
    if(obj.length>=min){
        return obj
    }else{
        return obj.constructor(min)
    }
}
n(new Array<string>(100),1000)
```
### 手动指定类型
如果不手动指定就会报错。
```
function combine<T>(arr1:T[],arr2:T[]):T[]{
    return arr1.concat(arr2)
}
const res = combine<string | number>([1,2,3],['1'])
console.log(res);

```
# 类（class.ts）
- es5的类
- ts类
  - 定义
  - 继承
  - 修饰符
  - 静态属性
  - 静态方法
  - 抽象类
继承会加重耦合，组合和泛型不会。
### 成员可见域
- public
  - 公有的----在当前类里面、子类、类外面都可以访问
- protected
  - 保护类型----在当前类里面、子类里面可以访问
- private
  - 私有----在当前类里面可以访问
### 静态成员 static
静态成员和类的实例没有关系，静态成员、静态方法都绑定在类型本身上。  
金泰成员也会继承。
### 抽象类不能实例化，只能继承
### 索引器
```
class Arr<T> {
  [i : number] : T
}
const a = new Arr<number>()
a[10] = 100
console.log(a[10])
// 100
```
### 类型守卫
```
class FilesystemObject {
    isFile(): this is FileRep {
       return this instanceof FileRep;
    }
    isDirectory( ) : this is Directory {
        return this instanceof Directory
    }
    isNetworked( ) : this is Networked & this {
        return this.networked;
    }
    constructor(public path: string,private networked:boolean){}
}
class FileRep extends FilesystemObject {
    constructor(path: string,public content: string) {
        super(path,false);
    }
}
class Directory extends FilesystemObject {
    children: FilesystemObject[] = [];
 }
interface Networked {
    host: string;
}
const fso: FilesystemObject = new FileRep( "foo/bar.txt","foo")
if (fso.isFile()) {
    fso.content;
    // const fso: FileRep
}else if (fso.isDirectory()) {
    fso.children;
    //const fso: Directory
}else if (fso.isNetworked()) {
    fso.host;
    //const fso: Networked & Filesystemobject
}
```
# 接口（interface.ts）
- 属性接口
- 函数类型接口
- 可索引接口
- 类类型接口
- 接口扩展
**接口可以继承（extends），type可以组合（&），使用时可以根据这一点选择使用谁。 ** 
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
泛型可以帮助我们让类型检查更加严格智能。  
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
# 类型计算
### keyof
提取key
```
type M = { [k:string]:boolean }
type A = keyof M
// type A = string | number
```
### typeof
```
console.log(typeof '100')
// string
let sz = '1'
let cz:typeof sz
// cz: string
```
### Partial Type
例如一个函数参数某个参数必须满足一个接口，这个接口定义了两个必传参数，但是在调用的时候只想传其中一个参数，这是可以使用``Partial<Type>``.相当于所有参数可选。  
实现：
```
type Partial<T> = {
    [P in keyof T]? : T[P]
}
```
### Required
作用和``Partial``相反，用法``Required<Type>``  
实现：
```
type Required<T> = {
    [P in keyof T]-? : T[P]
}
```
### Readonly
作用如名，用法``Readonly<Type>``  
实现：
```
type Readonly<T> = {
    readonly[P in keyof T]: T[P]
}
```
### Record
``Record<CatName,CatInfo>``,``CatName``表示key，``CatInfo``表示值。
```
interface CatInfo {
    age: number;
    breed: string;
}
type CatName = "miffy" | "boris" |"mordred" ;
const cats: Record<CatName,CatInfo> = {
    miffy: { age: 10,breed: "persian" },
    boris: { age: 5, breed: "Maine coon" },
    mordred: { age: 16, breed: "British Shorthair" },
};
cats.boris;
console.log(cats.boris);
```
实现：
```
type Record<K extends keyof any, T> = {
    [P in K]:T
}
```
### Pick
用于取出需要的字段
```
interface Todo{
    title:string;
    des:string;
    status:boolean
}
type TodoPreview = Pick<Todo,'title'|'des'>
```
实现：
```
type Pick<T,K extends keyof T> = {
    [P in K]:T[P]
}
```
### Exclude
排除
```
type T0 = Exclude<'a'|'b'|'c','a'>
// type T0 = "b" | "c"
type T1 = Exclude<'a'|'b'|'c','a'|'b'>
// type T1 = "c"
type T2 = Exclude<'a'|'b'|(()=>void),Function>
// type T2 = "a" | "b"
```
实现：
```
type Exclude<T,U > = T extends U ? never : T
```
### Omit
省略
```
interface Todo {
    title:string;
    des:string;
    status:boolean;
}
type TodoPreview = Omit<Todo,'des'|'title'>
// type TodoPreview = {
//     status: boolean;
// }
```
实现：
```
type Omit<T,K extends keyof any> = Pick<T,Exclude<keyof T,K>>
```
### Extract
取出
```
type T0 = Extract<'a'|'b'|'c','a'|'d'>
// type T0 = 'a'
type T2 = Extract<'a'|'b'|(()=>void),Function>
// type T2 = () => void
```
实现：
```
type Extract<T,U> = T extends U?T:never
```
### NonNullable
```
type T0 = NonNullable<string|number|undefined|null
|never>
```
实现：
```
type NonNullable<T> = T extends null | undefined ? never : T;
```
### Parameters
提取函数的参数
```
declare function f1(arg:{a:number;b:string}):void
type T0 = Parameters<()=>string>
// type T0 = []
type T1 = Parameters<(s:string)=>string>
// type T1 = [s: string]
type T2 = Parameters<<T>(arg:T)=>T>
// type T2 = [arg: unknown]
type T3 = Parameters<typeof f1>
// type T3 = [arg: {
//     a: number;
//     b: string;
// }]
```
实现：
```
type Parameters<T extends ( ...args: any) =>any> = T extends( ...args: infer P)=> any ? P : never;
```
### ConstructorParameters
提取构造函数的参数
```
type T0 = ConstructorParameters<ErrorConstructor>;
// type T0 = [message? : string]
type T1 = ConstructorParameters<FunctionConstructor>;
//type T1 = string[]
type T2 = ConstructorParameters<RegExpConstructor>;
//type T2 = [patterstring | RegExp, flags? : string]
type T3 = ConstructorParameters<any>;
//type T3 = unknown[]
```
实现：
```
type ConstructorParameters<T extends abstract new ( ...args: any)=>any> = T extends abstract new ( ...args: infer P) => any ? P :never;
```
### ReturnType
提取函数返回值类型
```
declare function f1(): { a: number; b: string };
type T0 = ReturnType<( ) => string>;
//type T0 = string
type T1 = ReturnType<(s: string) => void>;
//type T1 = void
type T2 = ReturnType<<T>()=>T>;
//type T2 = unknown
type T3 = ReturnType<<T extends u,u extends number[]>() =>T>;
//type T3 = numbe
type T4 = ReturnType<typeof f1>;
// type T4 = { a: number;b: string; }
type T5 = ReturnType<any>;
// type T5 = any
```
实现：
```
type ReturnType<T extends (...args: any) =>any> = T extends( ...args: any) => infer R ? R : any;
```
### InstanceType
获取构造函数的实例类型，如果是多个就以 联合类型 的方式返回
```
class C {x = 0;y = 0;}
type T0 = InstanceType<typeof C>;
// type T0 = C
//   new Promise<C>
type T1 = InstanceType<any>;
// type T1 = any
type T2 = InstanceType<never>;
// type T2 = never
type T3 = InstanceType<string>;
// 类型“string”不满足约束“abstract new (...args: any) => any”。
// type T3 = any
```
实现：
```
type InstanceType<T extends abstract new ( ...args: any) => any>= T extends abstract new ( ...args: any) => infer R ? R : any;
```
### ThisParameterType
提取函数类型的this参数的类型，如果函数类型没有参数，则为unknown
```
function a(this:number){
    return this.toString(16)
}
function n(v : ThisParameterType<typeof a>){
    return a.apply(v)
}
```
实现：
```
type ThisParameterType<T> = T extends (this: infer u,...args :any[]) =>any ? U : unknown;
```
### OmitThisParameter
移除函数中的 this 数据类型
```
interface Foo {
    x: number
};
type Fn = (this: Foo) => void
type NonReturnFn = OmitThisParameter<Fn>; 
// type NonReturnFn = () => void

function toHex(this: Number) {
  return this.toString(16);
}
 
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
 
console.log(fiveToHex());
```
实现：
```
type OmitThisParameter<T> = unknown extends ThisParameterType<T>? T : T extends (...args: infer A) => infer R ? (...args: A) =>R : T;
```
### ThisType<Type>
可以指定this类型  
noImplicitThis必须启用
```
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};
 
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}
 
let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});
 
obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
```
实现：
```
interface ThisType<T> { }
```
### 内在字符串操作类型
- ``Uppercase<StringType>``
- ``Lowercase<StringType>``
- ``Capitalize<StringType>``
- ``Uncapitalize<StringType>``
```
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>
//type ShoutyGreeting = "HELLO, WORLD"
 
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">
//type MainID = "ID-MY_APP"

type Greeting = "Hello, world"
type QuietGreeting = Lowercase<Greeting>
//type QuietGreeting = "hello, world"
 
type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`
type MainID = ASCIICacheKey<"MY_APP">
//type MainID = "id-my_app"

type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>;
// type Greeting = "Hello, world"

type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
//type UncomfortableGreeting = "hELLO WORLD"
```
# 命名空间、模块化（namespace-modules.ts）
**命名空间**：在代码量较大的情况下，为了避免命名冲突，可以将相似功能的函数、类、接口等放置到命名空间中，将代码包裹起来。可以很好的组织代码，避免冲突。
**模块**：侧重代码的复用性，一个模块里可能会有多个命名空间。  
模块是一个程序包，包内的成员（函数、变量、类型)仅仅在包内可见，包外想要方位这些成员除非模块自己主动声明向包外提供。例如用import/export语法。


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