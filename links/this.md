#### Ключевое слово this в JavaScript

this это указатель на определенный объект, если это метод объекта, контекст в котором выпл. функция.

Рассмотрим пример, который демонстрирует преимущество this:
```javascript
const user = {
    name: 'John',
    getFullName: function() {
        console.log(this.name + ' ' + user.name);
    }
} // если мы захотим переименовать объект user, у нас не будет необходимости изменить его имя во всех подобных методах
// this.name => 'John' 
```

!! this внутри функции всегда ссылаться на объект, который вызывает эту функцию как метод.
Когда функция выз. просто как функция, а не как метод какого-либо объекта, this указывает на window(global)


##### Когда использовать this следует наиболее осторожно
- использовании метода в качестве функции обратного вызова;
- использовании this внутри замыкания — во внутренней функции;
- присваивании метода;
- заимствовании метода.

```javascript
// => метода в качестве функции обратного вызова
const user = {
    name: 'Alex',
    clickHandler: function() {console.log(this.name);}
};
btn.addEventListener('click', user.clickHandler); // мы передали метод объекта user, в качестве функции 
// обратного вызова, котора будет вызвана в контексте объекта button
```
чтобы this.name действительно указывал на свойство name объекта user 
```javascript
btn.addEventListener('click', user.clickHandler.call(user)); // мы передали метод объекта user, в качестве функции 
```
```typescript
function repeatOperation(count: number, callback: () => void): void {
    console.log("start");
    for (let i = 0; i < count; i++) {
        callback();
        // контекст данной функции - глобальный объект. Если в функции callback используется контекст он тоже будет ссылаться на глобальный объект.
    }
    console.log("stop");
}

let settings = {
    displayName: "object",

    test1: function () {
        repeatOperation(3, (function () {
            console.log(this.displayName);
        })); // в данном случае this указывает на объект window
        // bind
        repeatOperation(3, (function () {
                console.log(this.displayName);
        }).bind(this)); // в данном случае this указывает на объект window
    },

    test2: function() {
        repeatOperation(3, () => console.log(this.displayName)) // arrow function захватывает контекст, в котором была создана)
    } 
};

settings.test1();
settings.test2();
```

```javascript
// => this внутри замыкания — во внутренней функции;
const users = {
    age: 28,
    runUsers: function() {
      const age = this.age; // присвоить значением this в переменную во внешней функции и использовать ее в замыкании
      ['Alex', 'John'].map(function(person) {
          // console.log('this', this.age, 'person', person) // => this.age = undefined(window), замыкание не может 
          // получить доступ к значению this внешней функции(в отличии от других переменных внешней функции), например 
          // const age = this.age; 
          console.log('this', age, 'person', person) // => age = 28, 
      }) // это у нас внутренняя функция (замыкание). она имеет собственный this
    } // this указывает на window, поскольку не может получить доступ к this внешней функции
};
users.runUsers(); // => 28
```

```javascript
// => присваивание метода переменной;
const users = {
   data: [{name: 'Emmie Adams'}],
   showFirst: function() {console.log(this.data[0].name);}
};

const showFirstUser = users.showFirst; // сохраниили метод объекта users в переменную
showFirstUser();  // => this.data[0].name = undefined вызов просиходит в глобальном объекте window, необходимо явно 
                  // указать значение this, стоит помнить это <функция выз. просто как функция а не как метод 
                  // какого-либо объекта, this => window(global)> 
users.showFirst.bind(users); // => Emmie Adams                                
```
obj.method()// две операции получить метод через точку второй её вызвать, как у нас работает this, результат точки это reference type который хранит в себе функцию объект, 
и еще что-то это не стабильное значение.
```javascript
(f = obj.method)() // в первой группе скобок это referens type, вызов это уже нет просто функция если что-то делаем после получения метода this теряем.
```

```javascript
// => this при заимствовании методов;
const customer = {
    age: null
};

const manager = {
    age: null,
    getAge: function() { this.age = 'Alex';}
};

customer.age = manager.getAge(); // метод getAge будет вызван в контексте объекта manager. 

console.log(customer); // age = undefined, функция manager.getAge() вызывается в контексте объекта manager, 
                       // соответственно значение свойства age будет установлено у объекта manager
console.log(manager);  // age = 30 

manager.getAge.apply(customer); // => явно указываем контекст выполнения метода getAge 
console.log(customer); // age = 26
console.log(manager);  // age = null                            
```