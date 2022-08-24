const btn = document.querySelectorAll("button");



// Lấy thông tin
btn.forEach(function(button, index) {
    // console.log(button, index);
    button.addEventListener("click", function(event) {
        var btnItem = event.target; //Click vào sẽ chọn đúng phần tử
        var product = btnItem.parentElement;
        var productImg = product.querySelector("img").src;
        var productTen = product.querySelector("H1").innerText;
        var productGia = product.querySelector(".price").innerText;
        //console.log(productImg, productTen, productGia);
        addCart(productImg, productTen, productGia);

    })

})

// Thêm sản phẩm
function addCart(productImg, productTen, productGia) {

    var addtr = document.createElement("tr");

    //Nếu sp trùng thì tăng số lượng
    var cartItem = document.querySelectorAll("tbody tr");
    for (var i = 0; i < cartItem.length; i++) {
        var productT = document.querySelectorAll(".title")
        if (productT[i].innerHTML == productTen) {
            alert("Sản phẩm đã tồn tại trong giỏ hàng");
            return
        }
    }

    var trcontent = '<tr><td style="display: flex; align-items: center;"><img style="width:70px" src="' + productImg + '" alt=""></td><td><span class="title">' + productTen + '</span></td><td><p>' + productGia + '</p></td><td> <input style="width:30px; outline:none;" type="number" value="1" min="1"> </td><td><p class="tongTungMon"></p></td><td style="cursor:pointer;"> <i class="far fa-trash-alt">X</i></td></tr>';
    addtr.innerHTML = trcontent
    var cartTable = document.querySelector('tbody');
    // console.log(cartTable)
    cartTable.append(addtr);
    alert("Thêm sản phẩm thành công");
    // Tổng tiền
    tongTienTungMon()
    tongTien()
    xoa()
}

function tongTienTungMon() {
    var cartItem = document.querySelectorAll("tbody tr");
    var tongTungMon = 0
    for (var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector("input").value;
        console.log('Số lương: ' + inputValue)
        var productGia = cartItem[i].querySelector("p").innerHTML;
        //console.log(inputValue, productGia)
        tongTungMon = inputValue * productGia;

    }
    cartItem.innerHTML = tongTungMon;

    //console.log(cartTong)
    tangSoLuong()

}


function tongTien() {
    var cartItem = document.querySelectorAll("tbody tr");
    var Sum = 0;
    for (var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector("input").value;

        var productGia = cartItem[i].querySelector("p").innerHTML;
        //console.log(inputValue, productGia)
        tongTungMon = inputValue * productGia;

        Sum += tongTungMon;

    }
    var cartTong = document.querySelector(".price-total span")
    cartTong.innerHTML = Sum.toLocaleString('de-DE')
        //console.log(cartTong)
    tangSoLuong()

}
//Xóa sản phẩm

function xoa() {
    var cartItem = document.querySelectorAll("tbody tr");
    for (var i = 0; i < cartItem.length; i++) {
        var productT = document.querySelectorAll("td .far")
        productT[i].addEventListener("click", function(event) {
            var xoasp = event.target
            var cartItem = xoasp.parentElement.parentElement
            cartItem.remove();
            tongTien()

        })
    }
}
// Nếu sản phẩm đã có trong giỏ hàng thì sẽ tăng số lượng
function tangSoLuong() {
    var cartItem = document.querySelectorAll("tbody tr");
    for (var i = 0; i < cartItem.length; i++) {
        var soLuong = document.querySelector("td input")
        soLuong.addEventListener("change", function() {
            tongTien()
        })

    }
}

// Thanh toán
function checkout() {
    var cartItem = document.querySelector("tbody");
    alert("Thanh toán thành công!");
    cartItem.remove();
    tongTien()

}