##### for in // => проходит через перечисляемые свойства объекта(при итерациях используется значение, а не ключ)

```javascript
const arr = ['a', 'b', 'c', 'd', 'e', 'f'];

for (let key in arr) {} // 0 1 2 3 4 5
for (let value of arr) {} // => 'a' 'b' 'c' 'd' 'e' 'f'
```
Цикл for .. of дает возможность использовать, continue, break для контроля итераций(данный цикл, имеет широкие возможности для оптимизации)
```javascript
for (let value of arr) {
  if (value === 'c') { continue; }
  if (value === 'e') { break; }
} // => 'a' 'b' 'd'
```

[Пример выполнения, вложенных друг в друга циклов:](https://codesandbox.io/s/q9r70m39l9)



С помощью цикла for .. of можно перебирать разнообрзные коллекции:
строки, генераторы, типизированные массивы, коллекции DOM элементов

