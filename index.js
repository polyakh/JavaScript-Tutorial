// class Cat {
//     getNameFunction = () => null;
// }
// class Animal extends Cat {}

// class Cat {
//     getName () { return null };
// }
// class Animal extends Cat {}
//
//
// const arr = Array(1e6).fill(Animal);
// arr.forEach(el => new el());

class TestSingleMethods {
    method1(){}
    method2(){}
    method3(){}
    method4(){}
    method5(){}
    method6(){}
    method7(){}
}
class TestArray {
    array = [method1(){}, method1(){}]
}

const arr = Array(1e6).fill(Test);
arr.forEach(el => new el());


const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${used} MB`);