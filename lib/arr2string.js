export function arr2str(arr, str = ',') {
    if (Array.isArray(arr)) {
        return arr.join(str);
    }
    return arr;
}