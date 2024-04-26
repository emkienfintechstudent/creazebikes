import db from '../../config/connectDB.js';
import moment from "moment";

function AdminProductController() {
    return {
      async productSubCategories(req,res){
        const result = await db.query(`select a.id,a.name,a.created_by,a.created_at,a.status_id,b.name as product_category_name from product_subcategories a join product_categories b on a.product_category_id = b.id`)
         res.render("admin/product_subcategories.ejs", {moment:moment,product_subcategories:result.rows ,layout: 'admin/layouts/header_footer'})

      }
      ,
       async index(req, res) {
        const result = await db.query (`select a.id as product_id,a.image as image, a.name as product_name, d.name as product_catgegory_name,a.price, a.status_id,sum(quantity) quantity, sum(price) revenue, sum(price) - sum(cost) profit,sum(cost) as cost  from products a join orders b on a.id=b.product_id
  join product_subcategories c on a.product_subcategory_id = c.id join product_categories d
  on c.product_category_id = d.id
  group by a.id,a.image , a.name, d.name ,a.price, a.status_id`)
  res.render("admin/products.ejs", {products:result.rows,layout: 'admin/layouts/header_footer'})
       },
      async AdminDetailProduct(req, res){
        res.render("admin/product_detail.ejs")
      }
    }
}
export default AdminProductController;