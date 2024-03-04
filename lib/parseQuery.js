export function parseQuery() {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    const params = {};
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        const key = decodeURIComponent(pair[0]);
        const value = decodeURIComponent(pair[1]);
        // eslint-disable-next-line no-prototype-builtins
        if (params.hasOwnProperty(key)) {
            if (Array.isArray(params[key])) {
                params[key].push(value);
            } else {
                params[key] = [params[key], value];
            }
        } else {
            params[key] = value;
        }
    }
    return params;
}