var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        akp: null
    },
    created: function () {

    }

})

$(document).ready(function () {
    console.log("hei");


    $.ajax({
        url: '/api/ruter',
        type: 'GET',
        success: function (data) {
            app.akp = data;
            console.log(data);
        },
        error: function (data) {
            console.log("feil! " + data)
        }
    });

});