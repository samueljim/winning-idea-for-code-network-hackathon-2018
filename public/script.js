// function sendData() {
$("#input").keyup(function () {
    var data = $("#input").val();
    var radio = $("input[type='radio']:checked").val();



    console.log(data);
    console.log(radio);
    /*fetch('/', {
        method: 'post',
        body: data,
    })
    .then(function (fulfilled) {
        console.log(fulfilled);
    })
    .catch(function (error){
        console.log(error.message);
    });*/

    $.ajax({
        url: "/",
        cache: false,
        method: 'POST',
        data: { "code": data, "codeType": radio },
        success: function (data) {
            console.log("%c" + data, "background: blue; color: white;");
            $("#output").html(data.code);
            $("#error").text(data.msg);
        },
        error: function (error) {
            console.log("%c" + error.responseText, "background: red; color: white; font-size: large");
            $("#error").text(error.responseText);
        }
    });
});

// }