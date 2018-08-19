var textarea = document.querySelector("textarea");
textarea.addEventListener('keydown', autosize);

function autosize(){
    
}

function sendData(){
    var data = $("#input").val();

    console.log(data);
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
        data: {"code": data },
        success: function(html){
            console.log(html);
          $("#output").html(html.code);
        }
      });
}