function anotherShortCircuit(a) {
    if (a > 10) {
        console.log("yes");
        return "cool";
    }
    console.log("maybe");
    return "maybe";
}
function shortCircuit(a) {
    if (a > 5) {
        return anotherShortCircuit(a);
    } else {
        console.log("no");
    }
    return "no";
}
console.log(shortCircuit(20));