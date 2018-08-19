var a = [33, 103, 3, 726, 200, 984, 198, 764, 9];
var bubbleSortRPzayJ_MIzrKhNeS_hasReturned = false, bubbleSortRPzayJ_MIzrKhNeS_return, arguments = [a];
var a = arguments[0];
var swapped;
do {
    swapped = false;
    for (var i = 0; i < a.length - 1; i++) {
        if (a[i] > a[i + 1]) {
            var temp = a[i];
            a[i] = a[i + 1];
            a[i + 1] = temp;
            swapped = true;
        }
    }
} while (swapped);

bubbleSortRPzayJ_MIzrKhNeS_return;
console.log(a);