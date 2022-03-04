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
 * protected/prəˈtektəd/：保护类型----在当前类里面、子类里面可以访问
 * private/ˈprīvit/：私有----在当前类里面可以访问
 * readonly：只读----必须在声明时或者构造函数中初始化。声明和初始化可以合成一步在构造函数中完成
 */
class Person{
    // 属性
    name:string
    protected age:number
    private sex:string;
    readonly zhidu='readonly'
    // 静态属性
    static jingtai:string='jt'
    // 构造函数
    constructor(name:string,age:number,sex:string,readonly only: string){
        this.name=name
        this.age=age
        this.sex=sex
    }
    // 实例方法
    run():void{
        alert(this.name)
    }
    show():void{
        alert(this.sex)
    }
    // 静态方法
    static orint(){
        // 静态方法不能直接调用类里面的属性
        // alert(this.name) 报错不存在
        // 静态的属性可以调用
        alert(this.jingtai)
        alert(Person.jingtai)

    }
}
class Child extends Person{
    constructor(name:string,age:number,sex:string){
        // 初始化调用父类的构造函数，在这之前没有this
        super(name,age,sex,'only')
    }
    work():void{
        alert(this.age)
    }
}
alert(Person.jingtai)
alert(Child.jingtai)
var w = new Child('666',6,'sex')
alert(w.name)
// alert(w.age)  不可以
// alert(w.sex)  不可以
w.run()
w.show()

// 多态：父类定义一个方法，子类去实现。可以使用抽象类
// 抽象类不能实例化，只能继承
abstract class Animal {
    public name:string
    constructor(name:string) {
        this.name=name
    }
    // 抽象方法不包含具体实现，必须在派生类中实现
    abstract eat():any
    run(){
        console.log('这样的方法可以不实现');
        
    }
}

class Dog extends Animal{
    constructor(name:string) {
        super(name);
    }
    eat() {
       console.log(this.name+'吃骨头');
    }
}
var d= new Dog('狗')
d.eat()
d.run()
