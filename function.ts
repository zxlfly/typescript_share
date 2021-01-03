//  为函数定义类型
function leixing(x:number,y:number):number{
    return x+y
}
// 没有返回值
function meiyou(x:number,y:number):void{
}
// 匿名函数（基本语法和es5没什么区别）
// 匿名函数是一个没有函数名的函数。
// 匿名函数在程序运行时动态声明，除了没有函数名外，其他的与标准函数一样。
// var res = function( ) {}
// 匿名函数自调用
// (function () { 
//     var x = "Hello!!";   
//     console.log(x)     
//  })()

// 可选参数和默认参数
// 在 TypeScript 函数里，如果我们定义了参数，则我们必须传入这些参数，除非将这些参数设置为可选，可选参数使用问号标识 ？。
// 可选参数必须跟在必需参数后面。
function kexuan(firstName:string,lastName?:string):string{
    return firstName + " " + lastName
}
kexuan('zxl')
// 可以设置参数的默认值，这样在调用函数的时候，如果不传入该参数的值，则使用默认参数
function moren(firstName:string,lastName:string='xiu'):string{
    return firstName + " " + lastName
}
moren('zxl')
// 剩余参数
// 在不知道需要穿多少个参数的时候可以使用剩余参数来定义。
// 剩余参数允许将不确定数量的参数最为一个数组传入
// 前面的firstName不是必须的
function shengyu(firstName: string, ...restOfName: string[]):string{
    return firstName + " " + restOfName.join(" ");
}
shengyu("zxl","sdrf","adsf")

// 构造函数
// 前面为参数列表
// 后面包含一个函数执行的语句字符串
var gouzao = new Function("a", "b", "return a * b"); 
var x = gouzao(4, 3); 
console.log(x);

//this和箭头函数
// js里。this的值在函数调用的时候才会指定。
// 箭头函数在定义的时候就会绑定上下文，而不是调用时的值。
// 可以提供一个显式的 this参数。 this参数是个假的参数，它出现在参数列表的最前面
var foo = (x:number)=>10 + x 
function f(this: void) {
    // make sure `this` is unusable in this standalone function
}
// 函数重载
// 就是方法名字相同，而参数不同，返回类型可以相同也可以不同
// 每个重载方法都必须有一个独一无二的类型列表
function disp(s1:string):void; 
function disp(n1:number,s1:string):void; 
function disp(x:any,y?:any):void { 
    // 如果参数类型不同，则参数类型应设置为 any。
    // 参数数量不同你可以将不同的参数设置为可选。
    console.log(x); 
    console.log(y); 
} 
disp("abc") 
disp(1,"xyz");

// 类型推断
// 如果赋值语句一边指定了类型但是另一边没有，ts编译器会自动识别
//x  y为number
// 按上下文归类
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };