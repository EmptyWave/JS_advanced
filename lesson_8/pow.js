let pow = (x, n) => {
    if (x<0 || n<0){
        return null
    }
    if (parseInt(x) !== x || parseInt(n) !== n){
        return null
    }
    let result = 1;
    for (let i = 0; i < n; i++){
        result *= x;
    }
    return result
};