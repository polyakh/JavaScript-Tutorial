```javascript
[] + [] // -> "" если операнды не числового типа то это сложение строковое оператор главный, ссылочный тип массив, будет преобразован к строке
[] + {} // -> [object Object], тип конструктор которым был создан объект

{} /// блок кода или пустой объект { console.log() }, если пустые скобки куда передеаем то это объект
```

Оператор сравнения
–0 >= null === true
–0 > null || 0 == null === false
Let r be the result of performing abstract relational comparison lval < rval. If r is true
or undefined, return false. Otherwise, return true
–!(0 < null) === !(false) === true
>= будет преобразовано в !(0 < null)
Обязательная точка с запятой
– Браузер склеит это все в 4 последовательных вызова
– В лучшем случае мы получим ошибку
– В худшем это как-то отработает и мы получим непонятный баг
```javascript
// Файл one.js
;(function () {
// Модуль one.js
})()
// Файл two.js
;(function () {
// Модуль two.js
})()
```
```javascript
var isIvan = false;
var name = 'Пётр';
var surname = 'Петров';
if (isIvan)
    name = 'Иван'; // сработает 
    surname = 'Иванович'; // будет работать без захода в if
console.log(name, surname); // Пётр Иванович
```