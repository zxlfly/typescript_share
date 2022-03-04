"use strict";
// typeScript中的数据类型
//ts中为了使编码更规范，更有利于维护，增加了类型校验。
// 布尔类型（boolean）
// es5写法在ts中会报错
// var flag = true
// flag = 456
var flag = true;
// flag=456 错误不能赋值其他类型
flag = false;
console.log('boolean:', flag);
// 数字类型（number）
// 使用规则同上
var num = 123;
num = 456;
//num='str';错误
console.log(num);
// 字符串类型(string)
var str = 'aaaa';
str = 'haha'; //正确
//str=true;  错误
// 数组类型（array）  ts中定义数组有两种方式
// 1.第一种定义数组的方式
var arr1 = [11, 22, 33];
console.log(arr1);
//2.第二种定义数组的方式
var arr2 = [11, 22, 33];
console.log(arr2);
// 3.第三种
var arr3 = ['123', 4156, true];
console.log(arr3);
//元祖类型 已知元素数量和类型的数组
var arr5 = [123, 'this is ts', '1'];
console.log(arr5);
// 枚举类型（enum）
// 尽量用自然语言中含义清楚的单词来表示数据的每一个值，这种方法成为枚举方法，这种方法定义的类型称为枚举类型
// enum 枚举名{ 
//     标识符[=整型常数], 
//     标识符[=整型常数], 
//     ... 
//     标识符[=整型常数], 
// } ; 
var Flag;
(function (Flag) {
    Flag[Flag["success"] = 1] = "success";
    Flag[Flag["error"] = 2] = "error";
})(Flag || (Flag = {}));
;
var s = Flag.success;
console.log(s);
// 如果标识符没有赋值 它的值就是下标
var Color;
(function (Color) {
    Color[Color["blue"] = 0] = "blue";
    Color[Color["red"] = 1] = "red";
    Color[Color["orange"] = 2] = "orange";
})(Color || (Color = {}));
;
var c = Color.red;
console.log(c);
// 如果标识符没有赋值 它的前一个有值，那么它的值就是前面的值+1
// 这里如果前面的值不是数字，那么后面的将不能自行推断，需要手动赋值
// enum Num{a,b='5',d='4'}
var Num;
(function (Num) {
    Num[Num["a"] = 0] = "a";
    Num[Num["b"] = 5] = "b";
    Num[Num["d"] = 6] = "d";
})(Num || (Num = {}));
var z = Num.d;
console.log(z); //6
var Err;
(function (Err) {
    Err[Err["undefined"] = -1] = "undefined";
    Err[Err["null"] = -2] = "null";
    Err[Err["success"] = 1] = "success";
})(Err || (Err = {}));
;
var e = Err.success;
console.log(e);
// 任意类型（any）
// 就像名字那样不固定类型
var zxl = 123;
zxl = 'str';
zxl = true;
console.log(zxl);
// 例如做dom操作的时候any就很实用
// var dom:any=document.getElementById('id');
// dom.style.color='red';
// null和undefined
// var zzz:number;
// console.log(zzz) 报错
// var zzz:undefined; ok
// 可以设置多个类型
// var zzz:undefined | number; ok
// var zzz:null;
// zzz=null  赋值其他的就不行只能null表示空
// void类型
// ts中表示没有任何类型，一般用于定义方法表示没有返回值
function run() {
    console.log('run');
}
run();
// never类型：代表不会出现的值
// 这意味着never类型的变量只能被never类型赋值。
var q;
q = undefined;
var qq;
qq = null;
var qqq;
qqq = (function () {
    throw new Error('error');
})();
// Object 表示非原始类型，也就是除了number、string、boolean、symbol、null或undefined之外的类型 方便使用Object.create这样的API
// 类型断言  告诉编译器，我确定他是这个类型
// 两种写法  在TypeScript里使用JSX时，只有 as语法断言是被允许的。
// 尖括号写法
var someValue = "this is a string";
var strLength = someValue.length;
// as语法
var someValue2 = "this is a string";
var strLength2 = someValue2.length;
function map(arr, func) {
    return arr.map(func);
}
var parsed = map(['1', '2'], function (n) { return parseInt(n); });
function combine(arr1, arr2) {
    return arr1.concat(arr2);
}
var res = combine([1, 2, 3], ['1']);
console.log(res);
