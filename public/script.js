var textarea = document.querySelector("input");
textarea.addEventListener('keydown', autosize);

function autosize(){
    var el = this;
    setTimeout(function(){
        el.style.cssText = 'height:auto;padding:0;';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
    
    }, 0);
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