import db from '../../config/connectDB.js';
import moment from "moment";

function AdminProductSubcategoryController() {
    return {
     
      async index(req,res){
        const result1 = await db.query('select id,name from product_categories')
        const categories = result1.rows
        console.log(categories)
        const result = await db.query(`select a.id,a.name,a.created_by,a.created_at,a.status_id,b.name as product_category_name from product_subcategories a join product_categories b on a.product_category_id = b.id`)
         res.render("admin/product_subcategories.ejs", {categories : categories, user:req.user,moment:moment,product_subcategories:result.rows ,layout: 'admin/layouts/header_footer'})
      },
      async addNew(req,res){
        console.log(req.body)
        var get_date_now = new Date();
        const date = get_date_now.toISOString().slice(0, 10);
        const  checkSubcategoryName = await db.query(`select * from product_subcategories where name = $1`, [req.body.productCategoryName])
        const lastId = await db.query(`select id from product_subcategories order by id desc limit 1`)
        if(checkSubcategoryName.rowCount >=1){
            console.log(checkSubcategoryName.rows[0])
            res.json({message : "Category already taken"})
        }else{
            const id = parseInt(lastId.rows[0].id) +1 
            console.log(id)
            const result = await db.query(`insert into product_subcategories(id,name,created_at,created_by,status_id,product_category_id) 
            values($1,$2,$3,$4,$5,$6) returning *
            `,[id,req.body.productSubcategoryName,date,req.body.createdBy,1,req.body.categoryId])
            console.log(result.rows[0])
            res.json({message : "Success"})

        }
      },
      async detail(req, res) {
        const result = await db.query(`select name from product_categories`)
        const categories = result.rows
        const result1 = await db.query(`select a.id, b.name as product_category_name, a.name as product_subcategory_name, a.created_at, a.created_by, a.status_id from product_subcategories a join product_categories b on a.product_category_id = b.id where a.id = $1`, [req.params.id])
        const product_subcategory = result1.rows[0]
        res.render("admin/product_subcategory_detail.ejs", {categories : categories,product_subcategory:product_subcategory, user:req.user,moment:moment,product_subcategories:result.rows ,layout: 'admin/layouts/header_footer'})

      },
      async updateCategoryForSubcategory(req, res) {
        const result = await db.query(`select id from product_categories where name = $1`, [req.body.category])
        const product_category_id =  result.rows[0].id
       const result1 = await db.query(`update product_subcategories 
       set product_category_id = $1 where id = $2 returning *`,[product_category_id , req.body.productSubcategoryId] )
       console.log(result1.rows)
      },
      async editProductSubcategory(req,res){
        await db.query(`update product_subcategories
        set name = $1
        where id = ${req.params.id}`,[req.body.name])
        
      },
    }
}
export default AdminProductSubcategoryController;