function someCode(aParam, bParam) {
    return aParam > bParam;
}

function chekIt() {
    if (someCode(i, Math.random())) {
        return "yes";
    }
    return i < 2;
}

for (let i = 0; i < 5; i++) {
    chekIt(i);
}