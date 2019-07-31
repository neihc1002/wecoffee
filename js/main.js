$(document).ready(function () {
    var user = localStorage.getItem('user');
    if(user){
        $('#login-page').hide();
        $('#profile').show();
    }else{
        $('#profile').hide();
        $('#login-page').show();
    }
    
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