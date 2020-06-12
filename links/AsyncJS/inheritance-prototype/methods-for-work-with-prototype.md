Object.
create - мы можем создать новый объект у которого будет ссылка(__proto__, на другой объект) и при необходимости свойствами, описываемые дескрипторами.
мы можем использовать совместно [defineProperty](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
```javascript
let obj = {
  getFirstName: function(){ return this.firstName },
};
let myObj = Object.create( obj, { firstName: { value: "Boris" }, }); /* myObj __proto__: { getFirstName: f, __proto__: Object }
myObj будет содержать ссылку на объект с методом getFirstName, который содержит ссылку на Object*/
new Parent(); // создание экземпляра с выполнением конструктора Parent
Object.create(Parent.prototype); // создание экземпляра без выполнения конструктора Parent
function Foo() {} Foo.prototype = Parent.prototype;
new Foo(); // тоже что делает Object.create
``` 
getPrototypeOf(obj) Метод возвращает прототип(__proto__) переданного объекта.
Возвращает obj.__proto__ 
```javascript
Object.__proto__; // содержит ссылку на конструктор Function
Object.getPrototypeOf(Object) // constructor: Function
```

setPrototypeOf() позволяет установить или изменить прототип указанному объекту.
Изменение прототипа [[Prototype]] объекта является, очень медленной операцией, если вы заботитесь о производительности, 
мы никогда не должны изменять прототип [[Prototype]] объекта. Вместо этого создайте объект с нужным прототипом [[Prototype]], с помощью метода Object.create().
```javascript
const obj = { getName: function(){ return this.name } };
const newObj = Object.create(obj, { name: { value: 'Alex', } }); // obj.__proto__: {getName: f, __proto__: Object}
Object.setPrototypeOf(obj, {}); // obj: { __proto__: Object }