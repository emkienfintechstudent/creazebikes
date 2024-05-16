import db from '../../config/connectDB.js';
import moment from "moment";

function AdminMarketingChartController() {
    return {
        async chart(req, res) {
            res.render("admin/marketing_chart.ejs", {layout: 'admin/layouts/header_footer' })
            
        }
    }
}
export default AdminMarketingChartController;
