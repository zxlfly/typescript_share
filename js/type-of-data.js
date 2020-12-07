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
// 元组类型（tuple）  属于数组的一种
var arr3 = [11, 22, 33];
console.log(arr3);
//元祖类型 只能有两个值且类型为设置的类型
var arr4 = [123, 'this is ts'];
console.log(arr4);
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
