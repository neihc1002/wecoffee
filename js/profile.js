$(document).ready(function () {
    if (user) {
        user = JSON.parse(user);
        $('.my-name').text(user.name);
    }
    $('.btn-his').on('click', function (e) {
        $('.history').show();
        $('.history-list').show();
        $('.history-detail').hide();
        $('.favorite').hide();
        
    })
    $('.btn-favorite').on('click', function (e) {
        $('.favorite').show();
        $('.history').hide();
    })
    $('.logout').on('click', function (e) {
       localStorage.clear();
       location.href = 'index.html'   
    })
})

var view = function () {
    $('.history-list').hide();
    $('.history-detail').show();
}

var cancleOrder = function(){
    $('#cancel-order-modal').modal();
}
var yescancle = function () {
    $('.history-list tbody tr')[0].remove();
    $('#cancel-order-modal').modal('toggle');
}