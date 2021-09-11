export default function(promises, limit) {
    return new Promise(resolve => {
        let resolvedCount = 0;
        let count = 0;
        let res = [];
        const len = promises.length;

        function next(p, index) {
            p().then(r => {
                res[index] = r;
                // succeed count
                resolvedCount ++
                // still exist promise
                if (promises.length) {
                    const p = promises.shift()
                    next(p, count)
                    count ++
                } else if(resolvedCount === len) {
                    resolve(res)
                }
            })
        }
        // start limit number promises or all
        while (count < limit && promises.length) {
            const p = promises.shift()
            next(p, count)
            count ++
        }
    })
}