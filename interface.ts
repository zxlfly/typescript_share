// 接口就是一种定义规范
// 属性接口
// interface FullName{
//     firstName:string;
//     lastName:string;
// }
// function printname(name:FullName){
//     console.log(name);
// }
// 这样传入的参数必须和接口规定的对应上，不能少不能多，如果传入的是一个对象只需要包含就可以了，但是如果内部使用了非接口定义的字段还是会报错
// var obj={ 
//     age:20,
//     firstName:'张',
//     lastName:'三'
// };
// printname(obj)
// printname({
//     firstName:'firstname',
//     lastName:'lastname'
// })
// 可选属性
interface FullName{
    firstName:string;
    lastName?:string;
}

function printname(name:FullName){

    console.log(name)
}
//参数的顺序可以不一样
printname({        
    lastName:'lastName',
    firstName:'firstName'
})

// 函数类型接口
interface encrypt{
    (key:string,value:string):string
}
var md5:encrypt=function(key:string,value:string):string{
    //模拟操作
    return key+value;
}

// 可索引接口：数组、对象的约束
interface UserArr{
    [index:number]:string
}
var arr:UserArr=['aaa','bbb'];

interface UserObj{
    [index:string]:string
}
var obj:UserObj={
    name:"xiu"
}

// 类类型接口：对类的约束，和抽象类有点相似
// 默认情况下，ts文件下的代码在全局命名空间中，也就是在不同文件命名也是不能重复的。可以使用import或者export，改成文件本地作用域
interface Animal2{
    name:string;
    chi(str:string):void;
}
class Fish implements Animal2 {
    name:string
    constructor(name:string){
        this.name=name
    }
    chi(str:string){
        console.log(str);
    }
}