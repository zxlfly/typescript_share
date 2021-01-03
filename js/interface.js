"use strict";
function printname(name) {
    console.log(name);
}
//参数的顺序可以不一样
printname({
    lastName: 'lastName',
    firstName: 'firstName'
});
var md5 = function (key, value) {
    //模拟操作
    return key + value;
};
var arr = ['aaa', 'bbb'];
var obj = {
    name: "xiu"
};
var Dog = /** @class */ (function () {
    function Dog(name) {
    }
    Dog.prototype.eat = function () { };
    return Dog;
}());
