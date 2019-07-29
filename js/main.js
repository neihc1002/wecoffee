$(document).ready(function () {
    var user = localStorage.getItem('user');
    if(user){
        $('#login-page').text(user);
        $('#login-page').on('click',function (e) {
            e.preventDefault();
            $('#logout').toggle();
        })
        $('#logout').on('click',function (e) {
            e.preventDefault();
            localStorage.clear('user')
            location.reload();
        })
    }else{
        $('#login-page').on('click',function (e) {
            e.preventDefault();
            location.href = "login.html"
        })
    }
})