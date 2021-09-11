# Promise Limit All

[![npm](https://img.shields.io/npm/v/promise-limit-all.svg) ![npm](https://img.shields.io/npm/dm/promise-limit-all.svg)](https://www.npmjs.com/package/promise-limit-all)

This package let you control the number of async function at the same time

## Demo

```js
const promiseLimitAll = require('promise-limit-all');

const promiseFactory = (res, timeout) => {
    return () =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(res);
            }, timeout);
        });
};

promiseLimitAll(
    [
        promiseFactory(1, 1000),
        promiseFactory(2, 2000),
        promiseFactory(3, 2000),
        promiseFactory(4, 1000),
        promiseFactory(5, 1000),
        promiseFactory(6, 500),
        promiseFactory(7, 500)
    ],
    3
).then((res) => {
    const str = res.join(",");
    console.log(str);
});
```

Output: 
```
1,2,3,4,5,6,7
```
