// 泛型就是解决类、接口、方法的复用性以及对不特定数据类型的支持

// 泛型函数
// 同时返回string和number类型
// any也可以实现，但是没有类型检测，传入返回都不可控
// 使用泛型，具体类型是调用的时候决定的
function getData<T>(value:T):T{
    return value
}
getData<string>('123')
getData<number>(123)
// 泛型类
class MisClass<T>{
    public list:T[]=[]
    add(value:T):void{
        this.list.push(value)
    }
    min():T{
        var minNum = this.list[0]
        for (let i = 0; i < this.list.length; i++) {
            if(minNum>this.list[i]){
                minNum=this.list[i]
            }
        }
        return minNum
    }
}
// 实例化类 指定类型
var m1 =new MisClass<number>()
m1.add(11);
m1.add(3);
m1.add(2);
alert(m1.min())
var m2=new MisClass<string>(); 
m2.add('c');
m2.add('a');
m2.add('v');
alert(m2.min())

// 泛型接口 两种写法
interface ConfigFn1{
    <T>(value:T):T
}
var getFn1:ConfigFn1=function<T>(value:T):T{
    return value
}
getFn1<string>('123')

interface ConfigFn2<T>{
    (value:T):T
}
function getFn<T>(value:T):T{
    return value
}
var getFn2:ConfigFn2<number>=getFn
getFn2(20)

// 