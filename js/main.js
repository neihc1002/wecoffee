$(document).ready(function () {
    $("#owl-demo").owlCarousel({
        slideSpeed : 50,
        items : 1, 
        autoplay:true,
        autoplayTimeout:5000,
        loop:true
    });
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
            localStorage.clear('cart')
            location.reload();
        })
        $('.item .buy').on('click',function (e) {
            e.preventDefault();
            location.href = 'menu.html'
        })
    }else{
        $('#login-page').on('click',function (e) {
            e.preventDefault();
            location.href = "login.html"
        })
        $('.item .buy').on('click',function (e) {
            e.preventDefault();
            location.href = 'login.html'
        })
    }
    
})