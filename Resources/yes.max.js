var shortCircuitYRhhRaHycvjTwsgV_hasReturned = false, shortCircuitYRhhRaHycvjTwsgV_return, arguments = [20];
var a = arguments[0];
if (a > 5) {
    var anotherShortCircuitQPfKczOJQmPsrObO_hasReturned = false, anotherShortCircuitQPfKczOJQmPsrObO_return, arguments = [a];
    var a = arguments[0];
    if (a > 10) {
        console.log("yes");
        anotherShortCircuitQPfKczOJQmPsrObO_return = "cool";
        anotherShortCircuitQPfKczOJQmPsrObO_hasReturned = true;
    }

    if (!anotherShortCircuitQPfKczOJQmPsrObO_hasReturned) {
        console.log("maybe");
        anotherShortCircuitQPfKczOJQmPsrObO_return = "maybe";
        anotherShortCircuitQPfKczOJQmPsrObO_hasReturned = true;
    }

    shortCircuitYRhhRaHycvjTwsgV_return = anotherShortCircuitQPfKczOJQmPsrObO_return;
    shortCircuitYRhhRaHycvjTwsgV_hasReturned = true;
} else {
    console.log("no");
}

if (!shortCircuitYRhhRaHycvjTwsgV_hasReturned) {
    shortCircuitYRhhRaHycvjTwsgV_return = "no";
    shortCircuitYRhhRaHycvjTwsgV_hasReturned = true;
}

console.log(shortCircuitYRhhRaHycvjTwsgV_return);