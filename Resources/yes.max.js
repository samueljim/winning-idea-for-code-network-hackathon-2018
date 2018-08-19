var shortCircuitlvSVbszAxXZSPHLW_hasReturned = false, shortCircuitlvSVbszAxXZSPHLW_return, arguments = [20];
var a = arguments[0];
if (a > 5) {
    var anotherShortCircuitYWgTjnGyZBiWIABE_hasReturned = false, anotherShortCircuitYWgTjnGyZBiWIABE_return, arguments = [a];
    var a = arguments[0];
    if (a > 10) {
        console.log("yes");
        anotherShortCircuitYWgTjnGyZBiWIABE_return = "cool";
        anotherShortCircuitYWgTjnGyZBiWIABE_hasReturned = true;
    }

    if (!anotherShortCircuitYWgTjnGyZBiWIABE_hasReturned) {
        console.log("maybe");
        anotherShortCircuitYWgTjnGyZBiWIABE_return = "maybe";
        anotherShortCircuitYWgTjnGyZBiWIABE_hasReturned = true;
    }

    shortCircuitlvSVbszAxXZSPHLW_return = anotherShortCircuitYWgTjnGyZBiWIABE_return;
    shortCircuitlvSVbszAxXZSPHLW_hasReturned = true;
} else {
    console.log("no");
}

if (!shortCircuitlvSVbszAxXZSPHLW_hasReturned) {
    shortCircuitlvSVbszAxXZSPHLW_return = "no";
    shortCircuitlvSVbszAxXZSPHLW_hasReturned = true;
}

console.log(shortCircuitlvSVbszAxXZSPHLW_return);