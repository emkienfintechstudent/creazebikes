import db from '../../config/connectDB.js';
import moment from "moment";

function AdminSalesController() {
    return {
        async chart(req, res) {
            res.render("admin/sales_dashboard.ejs", {layout: 'admin/layouts/header_footer' })
            
        }
    }
}
export default AdminSalesController;
