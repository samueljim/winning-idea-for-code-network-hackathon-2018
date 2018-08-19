
var bubbleSortecIxgBjuilZplQkB_return
,

swapped
,
a=[
33
,
103
,
3
,
726
,
200
,
984
,
198
,
764
,
9
] /* <-- array */
,
bubbleSortecIxgBjuilZplQkB_hasReturned=!1
,
arguments=[
a
] /* <-- array */

;a=arguments[0]

;do/* opening function --> */ {
swapped=!1
;for(
var i=0;i<a.length-1;i++
)/* opening function --> */ {
if(
a[i]>a[i+1]
)/* opening function --> */ {
var temp=a[i]
;a[i]=a[i+1]
,
a[i+1]=temp
,
swapped=!0
} /* <-- end of function */ 
} /* <-- end of function */ 
} /* <-- end of function */ while(
swapped
)
;console.log(
a
);