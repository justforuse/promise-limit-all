(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.promiseLimitAll = factory());
}(this, (function () { 'use strict';

    function index(promises, limit) {
        return new Promise(resolve => {
            let resolvedCount = 0;
            let count = 0;
            let res = [];
            const len = promises.length;

            function next(p, index) {
                p().then(r => {
                    res[index] = r;
                    // succeed count
                    resolvedCount ++;
                    // still exist promise
                    if (promises.length) {
                        const p = promises.shift();
                        next(p, count);
                        count ++;
                    } else if(resolvedCount === len) {
                        resolve(res);
                    }
                });
            }
            // start limit number promises or all
            while (count < limit && promises.length) {
                const p = promises.shift();
                next(p, count);
                count ++;
            }
        })
    }

    return index;

})));
