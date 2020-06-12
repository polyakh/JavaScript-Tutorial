!Важный момент, наверху иерархии встроенных прототипов находиться Object.prototype, иногда говорят все наследуеться от объектов
```javascript
 [].__proto__.__proto__ === Object.prototype // true
// и null на вершине иерархии
 [].__proto__.__proto__.__proto__ // null
```

[Методы для работы с proto](./methods-for-work-with-prototype.md)

В JS все объекты имеют специальное скрытое свойство [[Prototype]], которое либо равно null, либо ссылается на другой объект.
У каждого объекта может быть только одна ссылка __proto__(это как резервное хранилище), __proto__ обращение к которому происходит, 
при отсутствии свойства у основанного объекта.
!!Не стоит путать __proto__ с свойством prototype, prototype связано с оператором new, при создании new F, __proto__,
нового объекта берётся с prototype функции.
```javascript
Array.prototype === [].__proto__ // true
```
Prototype используется один раз, при создании объекта, свойство prototype, в контексте обычно объект({}) не несёт нагрузки,
всё, что находиться в prototype(свойство для установки __proto__)  при создании нового экземпляра(new ...), будет записано в __proto__.
```javascript
    function Person(name) { 
        this.name = name 
    } /* пока не будет вызван контруктор через new свойство name не доступсно, Person.age === undefined
        constructor это функция он содержит ссылку на конструктор Function черезе __proto__ */
    Person.prototype.sayName = function() { console.log(this.name)};
    let person = new Person('Alex'); // person не содержит совойтвой prototype, prototype содержит Person, у person 
    // доступна ссылка __proto__
```

Мы можем записать один конструктор в прототип другому
```javascript
function Person( name ){
    this.name = name || 'Alex';
}
function Alex( age ) { this.age = age || 29 }
Person.prototype = new Alex() // Person.prototype === { Alex  age: 29, __proto__: Object}
```

Цепочка прототипов может быть длиннее:
```javascript
let animal = { eats: true };
let rabbit = { __proto__: animal };
// rabbit.__proto__: Object => animal.__proto__: Object => Object
``` 
Может быть только один [[Prototype]]. 
Объект не может наследовать от двух других объектов.

****Операция записи не использует прототип****
Прототип используется только для чтения свойств, операции записи/удаления работают напрямую с объектом.
```javascript
let animal = { walk() {/* этот метод не будет доступен в rabbit, он будет доступен только по ссылке __proto__ */}};
let rabbit = { __proto__: animal };
// rabbit => {}
```
****Свойства-аксессоры – исключение, так как запись в него обрабатывается функцией-сеттером.****
```javascript
let user = {
    name: "John",
    set name(value) {this.name = value},
    get fullName() {return this.name},
};
let admin = {
__proto__: user,
}; /* свойство name в объекте admin доступно только через прототип, когда мы обратимся к свойству admin.name, будет вызвана 
функция геттер которая запишет напрямую свойство в объект admin */
```

****Значение this****
Прототипы никак не влияют на this.
!Стрелочные функции не могут быть конструкторами, у них нет this, new Person === Person is not a constructor
Таким образом, вызов сеттера admin.name = в качестве this использует admin, а не user.
this при вызове метода будет соответствовать объекту (перед точкой [].), на котором происходит вызов, не важно 
унаследованный это метод или нет.
```javascript
let animal = { sleep() { this.isSleeping = true; }};
let rabbit = { __proto__: animal }; // модифицирует rabbit.isSleeping
rabbit.sleep(); // {isSleeping: true}, в результате методы являются общими, а состояние объекта — нет.
```

##### Переопределение метода 
Мы хотим не просто заменить метод на свой, а взять метод родителя и расширить его.
Кролик бежит так же, как и другие звери, но время от времени подпрыгивает.

```javascript
 Rabbit.prototype.run = function() {
   // вызвать метод родителя, передав ему текущие аргументы
   Animal.prototype.run.apply(this, arguments);
   this.jump();
 } // => Если вызвать просто Animal.prototype.run(), то в качестве this функция run получит Animal.prototype, 
 // а это неверно, нужен текущий объект.
```

***Цикл for in***
Цикл for..in проходит не только по собственным, но и по унаследованным свойствам объекта, сначало проходит по собственным.
Почему мы не получаем ствойтва, методы например Object поскольку у них стоит флаг, enumerable
```javascript
hasOwnProperty(); // дает возможность отфильтровать унаследованные методы, а итерироваться только по собственным.
Object.keys ,Object.values // и другие – игнорируют унаследованные свойства.
```

**F.prototype**
Если в F.prototype содержится объект, оператор new устанавливает его в качестве [[Prototype]] для нового объекта.
Рассмотрим пример:
```javascript
function User() {name: 'Alex'}
User.prototype.constructor; // доступен по умолчанию {constructor: f User()}
// Мы можем записать любой метод в prototype
User.prototype.sayName = function() {}; // User.prototype => { constructor:  User(), sayName: f }
// Когда мы вызываем 
new User(); /* Всё, что было в прототипе, будет записано как ссылка на новый объект __proto__, в свою очередь у метода
sayName значение __proto__ будет ссылка на конструктор Function у которого в свою очередь ссылка на Object */
/* Когда мы создаем любой встроенный объект Array, Date, Function они хранят свои методы в прототипе, когда мы используем литерал
[] под капотом это используется конструктор Array */
````
***Примитивы***
String, Number, Boolean, который предоставит методы и после чего исчезнет.
