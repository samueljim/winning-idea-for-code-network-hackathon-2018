var shortCircuitLNXJvocKYpamrfaZ_hasReturned = false, shortCircuitLNXJvocKYpamrfaZ_return, arguments = [20];
var a = arguments[0];
if (a > 5) {
    var anotherShortCircuitgfQXUjMYIODckfWI_hasReturned = false, anotherShortCircuitgfQXUjMYIODckfWI_return, arguments = [a];
    var a = arguments[0];
    if (a > 10) {
        console.log("yes");
        anotherShortCircuitgfQXUjMYIODckfWI_return = "cool";
        anotherShortCircuitgfQXUjMYIODckfWI_hasReturned = true;
    }

    if (!anotherShortCircuitgfQXUjMYIODckfWI_hasReturned) {
        console.log("maybe");
        anotherShortCircuitgfQXUjMYIODckfWI_return = "maybe";
        anotherShortCircuitgfQXUjMYIODckfWI_hasReturned = true;
    }

    shortCircuitLNXJvocKYpamrfaZ_return = anotherShortCircuitgfQXUjMYIODckfWI_return;
    shortCircuitLNXJvocKYpamrfaZ_hasReturned = true;
} else {
    console.log("no");
}

if (!shortCircuitLNXJvocKYpamrfaZ_hasReturned) {
    shortCircuitLNXJvocKYpamrfaZ_return = "no";
    shortCircuitLNXJvocKYpamrfaZ_hasReturned = true;
}

console.log(shortCircuitLNXJvocKYpamrfaZ_return);