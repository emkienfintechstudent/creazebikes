import { setupProductCategory, keys, getALLProductCategory } from "../../utils/products/productCategorySetup.js";
import db from "../../config/connectDB.js"
function BlogController() {
    return {
        async index(req, res) {
            await setupProductCategory()
            res.render("blog.ejs",{productCategory: keys, productSubCategory: getALLProductCategory,user :req.user,session:req.session,layout: './layouts/headerfooter'})

        },
      

}}
export default BlogController;