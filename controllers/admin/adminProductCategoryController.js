import db from '../../config/connectDB.js';
import moment from "moment";

function AdminProductCategoryController() {
    return {
      async index(req,res){
        const result = await db.query(`select  id,name, status_id, created_at, created_by from product_categories
        `)
         res.render("admin/product_categories.ejs", {user: req.user,moment:moment,product_categories:result.rows ,layout: 'admin/layouts/header_footer'})

      }
      ,
      async addNew(req,res){
        console.log(req.body)
        var get_date_now = new Date();
        const date = get_date_now.toISOString().slice(0, 10);
        const  checkCategoryName = await db.query(`select * from product_categories where name = $1`, [req.body.productCategoryName])
        const lastId = await db.query(`select id from product_categories order by id desc limit 1`)
        if(checkCategoryName.rowCount >=1){
            console.log(checkCategoryName.rows[0])
            res.json({message : "Category already taken"})
        }else{
            const id = parseInt(lastId.rows[0].id) +1 
            console.log(id)
            const result = await db.query(`insert into product_categories(id,name,created_at,created_by) 
            values($1,$2,$3,$4) returning *
            `,[id,req.body.productCategoryName,date,req.body.createdBy])
            console.log(result.rows[0])
            res.json({message : "Success"})

        }
      },
      async detail (req,res){

      }
    }
}
export default AdminProductCategoryController;