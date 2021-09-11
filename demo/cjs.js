const promiseLimitAll = require('../lib');

const promiseFactory = (res, timeout) => {
    return () =>
        new Promise((resolve) => {
            console.count("get in pool");
            setTimeout(() => {
                resolve(res);
            }, timeout);
        });
};
console.time("start");
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
    console.timeEnd("start");
});