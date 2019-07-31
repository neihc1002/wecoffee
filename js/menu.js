$(document).ready(function () {
    if(localStorage.getItem('user')!==null){
        $('.cart').show()
        $('.cag').hide()
    }else{
        $('.cart').hide()
        $('.cag').show()
    }
    updateTotal()
    $('.item-info a').on('click', function (e) {
        e.preventDefault()
        if(localStorage.getItem('user')===null){
            location.href = 'login.html'
            return;
        }
        $('.quantity').text('1')
        var name = $(this).parent().find('h5').text();
        var image = $(this).parent().parent().parent().find('.item-image').attr('src');
        var modal = $('#order-modal');
        modal.find('.item-name').text(name)
        modal.find('.item-image').attr("src", image);
        modal.find('[name=price]').val($(this).data('price'))
        modal.find('[name=id]').val($(this).data('id'))
        $('.price-modal').text(formatNumber($('#order-modal').find('[name=price]').val(), '.', ','));
        modal.modal();

    })
    $('.btn').on('click', function (e) {
        e.preventDefault();
        var quan = $('.quantity').text();
        quan -= $(this).data('number');
        if (quan > 1) {
            $('.quantity').text(quan)
            $('.price-modal').text(formatNumber(quan * $('#order-modal').find('[name=price]').val(), '.', ','));
        } else {
            $('.quantity').text(1)
            $('.price-modal').text(formatNumber($('.quantity').text() * $('#order-modal').find('[name=price]').val(), '.', ','));
        }
    })

$('.pay').on('click',function (e) {
    e.preventDefault();
    var cart = JSON.parse(localStorage.getItem("cart"));
    var his = JSON.parse(localStorage.getItem('his'));
    if(cart){
        if(his){
            his.push({id:his[his.length-1]+1,cart:cart,date:new Date()});
        }else{
            his=[];
            his.push({id:1,cart:cart,date:new Date()})
        }
    }
    localStorage.setItem("his", JSON.stringify(his));
    localStorage.removeItem('cart')
    location.reload()
})

    $('.btnAdd').on('click', function (e) {
        e.preventDefault();
        var existId =$('#order-modal').find('[name=id]').val();
        var isNew = true;
        if (typeof (Storage) !== "undefined") {
            var cart = JSON.parse(localStorage.getItem("cart"));
            if (cart) {
                
                console.log(cart)
                for (var i = 0; i < cart.length; i++) {  //loop through the array
                    if (cart[i].id ===existId ) {
                        cart[i].quantity = parseInt(cart[i].quantity) + parseInt($('.quantity').text());
                        isNew = false;
                    }
                }
            } else {
                cart = [];
                var i = { id: $('#order-modal').find('[name=id]').val(), quantity: $('.quantity').text(), name: $('.item-name').text(), price: $('#order-modal').find('[name=price]').val() };
                cart.push(i);
                isNew = false;
            }

            if(isNew){
                var i = { id: $('#order-modal').find('[name=id]').val(), quantity: $('.quantity').text(), name: $('.item-name').text(), price: $('#order-modal').find('[name=price]').val() };
                cart.push(i);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            updateTotal()
            $('#order-modal').modal('toggle')
        } else {
        }
    })
})


function updateTotal() {
    var total = 0;
    var list = "";
    var cart = JSON.parse(localStorage.getItem("cart"));
    if(cart){
        cart.forEach(function (item) {
            var subt = item.price*item.quantity;
            total += subt;  //Do the math!
            list+='<p style="text-transform:uppercase;font-size:13px"><span class="item-quantity">'+item.quantity+'</span>'+item.name+'<span style="margin-left: 30px;font-weight: bold">'+formatNumber(subt, '.', ',')+'</span>đ</p>'
        })
        // for (var i = 0; i < cart.length; i++) {  //loop through the array
        //     var subt = cart[i].price*cart[i].quantity;
        //     total += subt;  //Do the math!
        //     list+='<p style="text-transform:uppercase;font-size:13px"><span class="item-quantity">'+cart[i].quantity+'</span>'+cart[i].name+'<span class="total" style="margin-left: 30px;font-weight: bold">'+formatNumber(subt, '.', ',')+'</span>đ</p>'
        // }
    }
    $('.order-list').html(list);
    $('.total').text(formatNumber(total, '.', ','));
}
