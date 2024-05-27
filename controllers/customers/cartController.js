import { setupProductCategory, keys, getALLProductCategory } from "../../utils/products/productCategorySetup.js";

 function CartController() {
    return {
       async index(req, res) {
        await setupProductCategory()
        if(req.session.cart) { 
            if(req.session.cart.totalQty == 0 ){
                delete req.session.cart
            }
        }
        
                    res.render("shopping-cart.ejs",{productCategory: keys, productSubCategory: getALLProductCategory,user :req.user,session:req.session,layout: './layouts/headerfooter'})
            
        },
        update(req, res) {
            console.log(req.session.cart)

            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart
           
            if(!cart.items[req.body.id]){
                cart.items[req.body.id] = {
                    item: req.body,
                    qty: 1
            }
            cart.totalQty = cart.totalQty + 1
            cart.totalPrice = cart.totalPrice + req.body.price
        } else {
            cart.items[req.body.id].qty = cart.items[req.body.id].qty + 1
            cart.totalQty = cart.totalQty + 1
            cart.totalPrice =  cart.totalPrice + req.body.price
        }

        return res.json({ totalQty: req.session.cart.totalQty,totalPrice:req.session.cart.totalPrice })

        },
        async delete(req,res){
            const productId = req.body.product_id;
    
            if (req.session.cart && req.session.cart.items[productId]) {
                // Decrement total quantity and total price
                req.session.cart.totalQty -= req.session.cart.items[productId].qty;
                req.session.cart.totalPrice -= req.session.cart.items[productId].item.price * req.session.cart.items[productId].qty;
        
                // Remove the item from the cart
                delete req.session.cart.items[productId];
        
                // If the cart is empty, reset totalQty and totalPrice
                if (req.session.cart.totalQty === 0) {
                    req.session.cart.totalPrice = 0;
                }
            }
        
            res.redirect('/shopping-cart'); // Redirect back to the cart page
        }
    }
}

export default CartController;
