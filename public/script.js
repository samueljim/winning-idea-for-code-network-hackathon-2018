function sendData(){
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
        data: {"code": data, "codeType": radio},
        success: function(html){
            console.log(html);
          $("#output").html(html.code);
        }
      });
}