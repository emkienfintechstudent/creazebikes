import { setupProductCategory, keys, getALLProductCategory } from "../../utils/products/productCategorySetup.js";
import db from "../../config/connectDB.js"
function FeedbackController() {
    return {
        async index(req, res) {
            await setupProductCategory()
            res.render("feedback.ejs",{productCategory: keys, productSubCategory: getALLProductCategory,user :req.user,session:req.session,layout: './layouts/headerfooter'})

        },
        async storeFeedback (req, res) {
            const  content = req.body.content
            const title = req.body.title
            const email = req.body.email
            var get_date_now = new Date();

            const date = get_date_now.toISOString().slice(0, 10);

            await db.query(
                "INSERT INTO feedbacks (content,title,user_id,created_at,email) VALUES ($1, $2,$3,$4,$5)",
                 [content,title,req.user.id,date,email]
             );
             req.flash('feedback_success', 'send feedback successfully') 
             res.redirect("/feedback")
    }

}}
export default FeedbackController;