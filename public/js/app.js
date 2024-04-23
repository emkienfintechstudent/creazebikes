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


