import db from '../../config/connectDB.js';
import moment from "moment";
import { setupProductCategory, keys, getALLProductCategory } from "../../utils/products/productCategorySetup.js";

function AdminProductController() {
    return {
        
       async index(req, res) {
        await setupProductCategory();

        const result1 = await db.query('select id,name from product_categories')
        const categories = result1.rows
        const result = await db.query (`select a.id as product_id,a.image as image, a.name as product_name, d.name as product_catgegory_name,a.price, a.status_id,sum(quantity) quantity, sum(price) revenue, sum(price) - sum(cost) profit,sum(cost) as cost  from products a join orders b on a.id=b.product_id
  join product_subcategories c on a.product_subcategory_id = c.id join product_categories d
  on c.product_category_id = d.id
  group by a.id,a.image , a.name, d.name ,a.price, a.status_id limit 10 `)
  res.render("admin/products.ejs", {productCategory: keys,productSubCategory: getALLProductCategory,user:req.user, categories : categories,products:result.rows,layout: 'admin/layouts/header_footer'})
       },

      async AdminDetailProduct(req, res,){
        await setupProductCategory();

        const result = await db.query (`select a.*,b.name as product_subcategory_name,  c.name as product_category_name from products a join product_subcategories b on a.product_subcategory_id = b.id 
join product_categories c on b.product_category_id = c.id
where a.id = ${req.params.id} `)
        res.render("admin/product_detail.ejs", {productCategory: keys,productSubCategory: getALLProductCategory,layout: 'admin/layouts/header_footer', product:result.rows[0],moment:moment })
      },
      async editProduct(req,res){
        await db.query(`update products 
        set name = $1, description = $2,color= $3, size = $4, cost =$5,price = $6
        where id = ${req.params.id}`,[req.body.name,req.body.description,req.body.color,req.body.size,req.body.cost,req.body.price])
        res.redirect(`/admin/product/${req.params.id}`)
      },
      async addNew(req,res){
        console.log(req.body)
        var get_date_now = new Date();
        const date = get_date_now.toISOString().slice(0, 10);
        const lastId = await db.query(`select id from products order by id desc limit 1`)
        const id = parseInt(lastId.rows[0].id) +1 
        const  checkProductName= await db.query(`select * from products where name = $1`, [req.body.name])
        const result = await db.query(`select id  from product_subcategories where name = $1`, [req.body.subcategory])
        const subcategory_id = result.rows[0].id
        if( checkProductName.rowCount >=1){
          console.log(checkProductName.rows[0])
          res.json({message : "Product already taken"})
      }else{
          console.log(id)
          const result = await db.query(`insert into products(id,product_subcategory_id,name,description,color,size,cost,price,image,created_at,status_id) 
          values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *
          `,[id,subcategory_id,req.body.name,req.body.description,req.body.color,req.body.size,req.body.cost, req.body.price,req.body.image,date ,1 ])
          console.log(result.rows[0])
          res.json({message : "Success"})

      }
      },
      async updateSubcategoryForProduct(req,res){ 
      console.log(req.body)
      const result = await db.query(`select id from product_subcategories where name = $1`, [req.body.Subcategory])
       const product_subcategory_id =  result.rows[0].id
       console.log(product_subcategory_id)
      const result1 = await db.query(`update products 
      set product_subcategory_id = $1 where id = $2`,[product_subcategory_id, req.body.productId])
      console.log(result1.rows)
    }
     
    }
}
export default AdminProductController;