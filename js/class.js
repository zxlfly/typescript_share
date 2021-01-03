"use strict";
// es5
// function Person(){
//     this.name='zhangsan'
//     this.age=20
//     this.run=function(){
//         alert(this.name+'睡觉')
//     }
// }
// // 原型链上面的属性会被多个实例共享  构造函数不会
// Person.prototype.sex='men'
// Person.prototype.work=function(){
//     alert(this.name+'work')
// }
// // 静态方法
// Person.getInfo=function(){
//     alert('我是静态方法')
// }
// //静态属性
// Person.jingtai=666
// Person.getInfo()
// var p = new Person()
// alert(p.name)
// p.run()
// p.work()
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 继承
// 这种继承方式可以继承构造函数的属性和方法，但是不能继承原型链上面的属性和方法
// function child(){
//     Person.call(this);
// }
// var w = new child()
// w.run()
// // 这个方法不存在
// w.work()
// 这种继承方式可以继承构造函数里面的属性和方法，也可以继承原型链上面的属性和方法。但是实例化子类的时候没法给父类传参
// function child2(){}
// child2.prototype=new Person()
// var w2 = new child2()
// w2.run()
// // 这个方法不存在
// w2.work()
// 混合上面两种方式就可以解决这些问题
// function Person(name,age){
//     this.name=name
//     this.age=age
//     this.run=function(){
//         alert(this.name+'睡觉')
//     }
// }
// Person.prototype.sex="men"
// Person.prototype.work=function(){
//     alert(this.name+'work')
// }
// var p=new Person('李四',20);
// p.run();
// function child3(name,age){
//     Person.call(this,name,age)
// }
// child3.prototype=new Person()
// var w3 = new child3('lao6',22)
// w3.run()
// w3.work()
// ts类的定义
// class Person{
//     // 属性
//     name:string
//     // 构造函数
//     constructor(name:string){
//         this.name=name
//     }
//     run():void{
//         alert(this.name)
//     }
// }
// var p = new Person('zhangsan')
// p.run()
// ts类的继承  extends 、 super
// class Person{
//     // 属性
//     name:string
//     // 构造函数
//     constructor(name:string){
//         this.name=name
//     }
//     run():void{
//         alert(this.name)
//     }
// }
// class Child extends Person{
//     constructor(name:string){
//         // 初始化调用父类的构造函数，在这之前没有this
//         super(name)
//     }
// }
// var w = new Child('666')
// w.run()
// ts类的修饰符
/**
 * public：公有的----在当前类里面、子类、类外面都可以访问
 * protected：保护类型----在当前类里面、子类里面可以访问
 * private：私有----在当前类里面可以访问
 * readonly：只读----必须在声明时或者构造函数中初始化。声明和初始化可以合成一步在构造函数中完成
 */
var Person = /** @class */ (function () {
    // 构造函数
    function Person(name, age, sex, only) {
        this.only = only;
        this.zhidu = 'readonly';
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    // 实例方法
    Person.prototype.run = function () {
        alert(this.name);
    };
    Person.prototype.show = function () {
        alert(this.sex);
    };
    // 静态方法
    Person.orint = function () {
        // 静态方法不能直接调用类里面的属性
        // alert(this.name) 报错不存在
        // 静态的属性可以调用
        alert(this.jingtai);
        alert(Person.jingtai);
    };
    // 静态属性
    Person.jingtai = 'jt';
    return Person;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child(name, age, sex) {
        // 初始化调用父类的构造函数，在这之前没有this
        return _super.call(this, name, age, sex, 'only') || this;
    }
    Child.prototype.work = function () {
        alert(this.age);
    };
    return Child;
}(Person));
alert(Person.jingtai);
alert(Child.jingtai);
var w = new Child('666', 6, 'sex');
alert(w.name);
// alert(w.age)  不可以
// alert(w.sex)  不可以
w.run();
w.show();
// 多态：父类定义一个方法，子类去实现。可以使用抽象类
// 抽象类不能实例化，只能继承
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.run = function () {
        console.log('这样的方法可以不实现');
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    Dog.prototype.eat = function () {
        console.log(this.name + '吃屎');
    };
    return Dog;
}(Animal));
var d = new Dog('狗');
d.eat();
d.run();
