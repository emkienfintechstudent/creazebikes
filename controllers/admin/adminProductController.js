import db from '../../config/connectDB.js';
import moment from "moment";

function AdminProductController() {
    return {
     
       async index(req, res) {
        const result = await db.query (`select a.id as product_id,a.image as image, a.name as product_name, d.name as product_catgegory_name,a.price, a.status_id,sum(quantity) quantity, sum(price) revenue, sum(price) - sum(cost) profit,sum(cost) as cost  from products a join orders b on a.id=b.product_id
  join product_subcategories c on a.product_subcategory_id = c.id join product_categories d
  on c.product_category_id = d.id
  group by a.id,a.image , a.name, d.name ,a.price, a.status_id limit 10 `)
  res.render("admin/products.ejs", {products:result.rows,layout: 'admin/layouts/header_footer'})
       },

      async AdminDetailProduct(req, res){
        const result = await db.query (`select a.*,b.name as product_subcategory_name,  c.name as product_category_name from products a join product_subcategories b on a.product_subcategory_id = b.id 
join product_categories c on b.product_category_id = c.id
where a.id = ${req.params.id} `)
        res.render("admin/product_detail.ejs", {layout: 'admin/layouts/header_footer', product:result.rows[0],moment:moment })
      },
      async editProduct(req,res){
 
        await db.query(`update products 
        set name = $1, description = $2,color= $3, size = $4, cost =$5,price = $6
        where id = ${req.params.id}`,[req.body.name,req.body.description,req.body.color,req.body.size,req.body.cost,req.body.price])
        res.redirect(`/admin/product/${req.params.id}`)
      }
    }
}
export default AdminProductController;