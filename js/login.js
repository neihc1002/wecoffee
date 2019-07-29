$(document).ready(function () {
    $('.btn-login').on('click', function (e) {
        e.preventDefault();
        $(this).parent().hide();
        $('.reg-form').show();
    })
    $('.btn-reg').on('click', function (e) {
        e.preventDefault();
        var ho = $('[name=ho]').val()
        var ten =  $('[name=ten]').val();
        var name = ho+' '+ten;
        if(name.trim().length>0){
            localStorage.setItem("user", name);
        }
        alert("Đăng nhập thành công! Quay về trang chủ")
        location.href = "index.html"
    })
    $('.login-another-email').on('click', function (e) {
        e.preventDefault();
        $('.login-form').hide();
        $('.login-form-email').show();
    })
    $('.login-another-phone').on('click', function (e) {
        e.preventDefault();
        $('.login-form-email').hide();
        $('.login-form').show();
    })
    $('.btn-login-email').on('click', function (e) {
        e.preventDefault();
        var name = $('[name=email]').val().replace(/@.*$/,"");
        localStorage.setItem("user", name);
        alert("Đăng nhập thành công! Quay về trang chủ")
        location.href = "index.html"
    })
    
})