MockDate
========

Lib based on https://www.npmjs.com/package/mockdate

## Example ##
Added the ability to specify hours and minutes

```javascript
MockDate.set('2000-11-22', { hours: 10, minutes: 30 });
new Date().getHours() // 10
new Date().getMinutes() // 30
```

## Test ##
```javascript
npm test
```
