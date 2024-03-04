export function throttle(func, wait) {
    let timeout;
    let previous = 0;

    return function () {
        const context = this;
        const args = arguments;
        const now = Date.now();

        if (now - previous > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            func.apply(context, args);
            previous = now;
        } else if (!timeout) {
            timeout = setTimeout(function () {
                func.apply(context, args);
                previous = now;
            }, wait - (now - previous));
        }
    };
}