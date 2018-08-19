function someCode(aParam, bParam) {
    return aParam > bParam;
}

function chekIt(j) {
    if (someCode(j, 5 - j)) {
        return "yes";
    }
    return j < 2;
}

for (var i = 0; i < 5; i++) {
    console.log(chekIt(i));
}