export const getRandomItems = (arr, n) => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

export const getRandomChars = (length) => {
    const chars = ",./;'[]\\<>?:\"{}|!@#$%^&*()_+-=";
    let result = "";
    const getChar = (chars) => chars.charAt(Math.floor(Math.random() * chars.length));
    for (let i = 0; i < length; i++) {
        result += getChar(chars);
    }
    return result;
}

export const calculateLikeness = (a, b) => {
    let likeness = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] == b[i]) {
            likeness++;
        }
    }
    return likeness;
}

export const getArrayOfFillers = (total, n) => {
    const approxSize = Math.floor(total/n);
    const delta = Math.floor(approxSize*0.3);
    const min = approxSize - delta;
    const fillers = [];
    for (let i = 0; i < n-1; i++) {
        const num = min + Math.floor(Math.random() * delta * 2)
        total = total - num;
        fillers[i] = getRandomChars(num);
    }
    fillers[n-1] = getRandomChars(total);
    return fillers;
}