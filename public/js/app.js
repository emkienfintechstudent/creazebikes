let addToCart = document.querySelectorAll('.add-to-cart-btn')
const userForm = document.getElementById('userForm');
function updateCart(product) {
    axios.post('/update-cart', product).then(res => {
        cartCounter.innerText = res.data.totalQty
        cartTotalPrice.innerText = Math.round(res.data.totalPrice,2)
        
    })
    .catch(err => {
    })
}
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
       let product = JSON.parse(btn.dataset.product)
        updateCart(product)
    })
})


var myText = document.getElementById("my-text exampleInputComments");
var result = document.getElementById("result");
var limit = 500;
result.textContent = 0 + "/" + limit;
console.log(myText)
myText.addEventListener("input",function(){
    var textLength = myText.value.length;
    result.textContent = textLength + "/" + limit;
    console.log(textLength)
    console.log(limit)
    if(textLength > limit){
        myText.style.borderColor = "#ff2851";
        result.style.color = "#ff2851";
    }
    else{
        myText.style.borderColor = "#b2b2b2";
        result.style.color = "#737373";
    }
});


