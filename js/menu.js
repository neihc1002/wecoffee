$(document).ready(function () {
    updateTotal()
    $('.item-info a').on('click', function (e) {
        e.preventDefault()
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

function formatNumber(nStr, decSeperate, groupSeperate) {
    nStr += '';
    x = nStr.split(decSeperate);
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + groupSeperate + '$2');
    }
    return x1 + x2;
}
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