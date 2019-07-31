$(document).ready(function(){
    $('#59').show();
    $('.map-name .item a').on('click', function (e) {
        e.preventDefault();
        $('.map').hide();
        var id = $(this).data('id');
        $(id).show();
    })
})