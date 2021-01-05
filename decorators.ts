// 装饰器是一种特殊的类型的声明，能够附加到类声明、方法、属性和或者参数上。
// 通俗讲装饰器就是一个方法，可以注入到类、方法、属性、参数上来扩展功能。
// 常见的的装饰器：类装饰器、属性装饰器、方法装饰器、参数装饰器
// 写法：普通的无参装饰器、装饰器工厂

// 类装饰器:无参
function logClass(params:any){
    // params为修饰的类
    console.log(params);
    params.prototype.api='装饰器添加属性'
    params.prototype.run=function(){
        console.log('装饰器添加的方法');
    }
}
@logClass
class HttpClient {
    constructor() {
        
    }
    ajax(){}
}
var h1:any = new HttpClient()
console.log(h1.ajax);
h1.run()

// 类装饰器：装饰器工厂
function logClass2(params:string){
    return function(target:any){
        // 参数
        console.log(params);
        // target 类的构造函数
        console.log(target);
        target.prototype.api=params;
    }
}
@logClass2('装饰器工厂传入参数')
class HttpClient2 {
    constructor() {
        
    }
    ajax(){}
}
var h2:any = new HttpClient2()
console.log(h2);
console.log(h2.ajax);

// 属性装饰器
// 会在运行时当做函数被调用，传入两个参数：
// 1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
// 2.成员的名字

// 接受额外参数
function logPro(params:any){
    console.log('params',params);
    return function(target:any,attr:string){
        console.log('logPro params',target);
        console.log('logPro attr',attr);
        target[attr]=params       
    }
}
// 只接收默认参数
function logPro2(target: any, key: string):any {
    const descriptor:PropertyDescriptor={
        enumerable: false,
        configurable: false,
        writable: false,
        value: "static"
    }
    return descriptor
}
function modifyProp(target: any, propertyKey: string) {
    target[propertyKey] = Math.random().toString();
}
class HttpClient3 {
    @logPro('logPro')
    public url:any
    @logPro2
    show :any
    @modifyProp
    name:any
    ajax(){}
    log(){
        console.log('HttpClient3',this.url);
    }
}
var h3= new HttpClient3()
console.log('h3',h3.url);
h3.log()
console.log(h3.name);
console.log('logPro2',h3.show);

// 方法装饰器会被应用到方法的属性描述符上，可以用来监视，修改过着替换方法的定义。
// 运行时传入三个参数：
// 1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
// 2.成员的名字
// 3.成员的属性描述符

function fn(params:any){
    return function(target:any,methodname:any,desc:any){
        console.log('fn',target);
        console.log('fn',methodname);
        console.log('fn',desc);
        target.apiUrl='9999';
        target.run=function(){
            console.log('fn run');
        }
    }
}
// function fn2(params:any){
//     return function(target:any,methodname:any,desc:any){
//         console.log('fn2',target);
//         console.log('fn2',methodname);
//         console.log('fn2',desc);
//         var old = desc.value
//         desc.value=function(...arg:any[]){
//             arg=arg.map(val=>{
//                 return String(val)
//             })
//             old.apply(this,arg)
//         }
//     }
// }
function fn2(target:any,methodname:any,desc:any){
    console.log('fn2',target);
    console.log('fn2',methodname);
    console.log('fn2',desc);
    var old = desc.value
    desc.value=function(...arg:any[]){
        arg=arg.map(val=>{
            return String(val)
        })
        old.apply(this,arg)
    }
}
class HttpClient4 {
    @fn('6666')
    getdata(){
        console.log('HttpClient4');
    }
    @fn2
    getlist(...arg:any[]){
        console.log(arg);
        console.log('getlist');
    }
}
var h4:any = new HttpClient4()
console.log(h4.apiUrl);
h4.run()
h4.getdata()
h4.getlist(123,'xxx');

// 方法参数装饰器
//参数装饰器只能用来监视一个方法的参数是否被传入
// 个人感觉这个东西没什么用啊
// 传入下列3个参数：
// 1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// 2.成员的名字。
// 3.参数在函数参数列表中的索引。

function logPa(params:any){
    return function(target:any,methodName:any,paramsIndex:any){
        console.log('logPa',params);
        console.log('logPa',target);
        console.log('logPa',methodName);
        console.log('logPa',paramsIndex);
        target.apiUrl=params;
    }
}
function logPa2(target:any,methodName:any,paramsIndex:any){
    console.log('logPa',target);
    console.log('logPa',methodName);
    console.log('logPa',paramsIndex);
}
class HttpClient5 {
    public url:any |undefined;
    getpra(@logPa('999') p:any){
        console.log(p);
    }
    getpra2(@logPa2 p:any){
        console.log(p);
    }
}
var h5:any = new HttpClient5();
h5.getpra(11111);
h5.getpra2(22222);
console.log( h5.apiUrl);


// 执行顺序
// 属性->方法->方法参数->类
// 多个同类型的装饰器，会先执行后面的
// 由上至下依次对装饰器表达式求值。
// 求值的结果会被当作函数，由下至上依次调用。

