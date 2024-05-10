import { setupProductCategory, keys, getALLProductCategory } from "../../utils/products/productCategorySetup.js";

 function CartController() {
    return {
       async index(req, res) {
        await setupProductCategory()
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

        }
    }
}

export default CartController;
