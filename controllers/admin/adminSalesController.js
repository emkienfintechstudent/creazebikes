import db from '../../config/connectDB.js';
import moment from "moment";

function AdminSalesController() {
    return {
        async chart(req, res) {
            const result = await db.query(`SELECT  e.name, count(*) as total_orders, round(sum(price * quantity)::decimal,3) revenue 
            FROM ORDERS A
            JOIN PRODUCTS B ON A.PRODUCT_ID = B.ID
            JOIN PRODUCT_SUBCATEGORIES C ON B.PRODUCT_SUBCATEGORY_ID = C.ID
            join product_categories d on c.product_category_id = d.id
			join users e on e.id = a.user_id
			group by e.name
			order by revenue desc, total_orders desc
            limit 10`)
            const top10Customers = result.rows
            res.render("admin/sales_dashboard.ejs", {user:req.user,layout: 'admin/layouts/header_footer',top10Customers:top10Customers })
            
        }
    }
}
export default AdminSalesController;
