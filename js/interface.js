"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Fish = /** @class */ (function () {
    function Fish(name) {
        this.name = name;
    }
    Fish.prototype.chi = function (str) {
        console.log(str);
    };
    return Fish;
}());
var Aa = /** @class */ (function (_super) {
    __extends(Aa, _super);
    function Aa(name) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        return _this;
    }
    Aa.prototype.chi = function (str) {
        console.log(str);
    };
    return Aa;
}(Fish));
