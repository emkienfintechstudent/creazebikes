import { setupProductCategory, keys, getALLProductCategory } from "../utils/products/productCategorySetup.js";
import db from "../config/connectDB.js"
function ProductController() {
  return {
   async index(req,res){
    await setupProductCategory()
    console.log(req.user)
    const result1 = await db.query(`SELECT distinct a.size FROM products as a join product_subcategories as b 
    on a.product_subcategory_id = b.id join product_categories as c 
    on b.product_category_id = c.id
    where b.name = $1 and c.name=$2` ,[req.params.subcategory,req.params.category])
    const sizes = result1.rows
    const result2 = await db.query(`SELECT distinct a.color FROM products as a join product_subcategories as b 
    on a.product_subcategory_id = b.id join product_categories as c 
    on b.product_category_id = c.id
    where b.name = $1 and c.name=$2` ,[req.params.subcategory,req.params.category])
    const colors = result2.rows
    const result = await db.query(`SELECT a.name,a.price,a.image,a.id,c.name as product_category_name FROM products as a join product_subcategories as b 
    on a.product_subcategory_id = b.id join product_categories as c 
    on b.product_category_id = c.id
    where b.name = $1 and c.name=$2`,[req.params.subcategory,req.params.category]);
    const products = result.rows 
    res.render("product.ejs",{categorySort:req.params.category,subcategorySort: req.params.subcategory ,colors:colors, sizes : sizes, productCategory: keys, productSubCategory: getALLProductCategory,products: products,session:req.session,user :req.user,layout: './layouts/headerfooter' })
   },
   async detailProduct(req,res){
    await setupProductCategory();
      
    const result_1 = await db.query(`SELECT * FROM products where id=$1`, [req.params.id])
    const detail_product = result_1.rows[0]
    //  Phần Compatible products
    const result_2 = await db.query(`SELECT a.name,a.price,a.image,a.id,c.name as product_category_name FROM products as a join product_subcategories as b 
    on a.product_subcategory_id = b.id join product_categories as c 
    on b.product_category_id = c.id
    where  c.name=$1 limit 6`,[req.params.category]); 
    const compatible_Products = result_2.rows
    res.render("detail.ejs",{productCategory: keys, productSubCategory: getALLProductCategory,detail_product:detail_product,compatible_Products:compatible_Products ,session:req.session,user :req.user,layout: './layouts/headerfooter'})
  },
  async searchProduct(req,res){
    const productSearch= req.body.productSearch.toLowerCase()

    await setupProductCategory()
    const result = await db.query(`
    with lower_product_name as (
      select id, lower(name) as name from products
      )
      select a.name,a.price,a.image,a.id,c.name as product_category_name FROM products as a join product_subcategories as b 
          on a.product_subcategory_id = b.id join product_categories as c 
          on b.product_category_id = c.id join lower_product_name  d on a.id = d.id
        where d.name like '%' || $1 || '%' `, [productSearch]);
  const products = result.rows 
  console.log(result.rowCount)
  if( result.rowCount == 0) {
    req.flash("product_not_found", " Try different or more general keywords")
  }
  res.render("product.ejs",{ productCategory: keys, productSubCategory: getALLProductCategory,products: products,session:req.session,user :req.user,layout: './layouts/headerfooter' })
  },
  async productSort(req,res){
    await setupProductCategory()
    console.log(req.body)
    let minMaxArray = req.body.min_max.split(',');
    let min = parseInt(minMaxArray[0], 10);
    let max = parseInt(minMaxArray[1], 10);
   
    let result
    if(req.body.color == "all" && req.body.size == 'all'){
      result = await db.query(`SELECT a.name,a.price,a.image,a.id,c.name as product_category_name FROM products as a join product_subcategories as b 
      on a.product_subcategory_id = b.id join product_categories as c 
      on b.product_category_id = c.id
      where b.name = $1 and c.name=$2 and a.price between $3 and $4`,[req.body.subcategory,req.body.category,min,max]);
      console.log(result.rows)
    }else if(req.body.color !=="all" && req.body.size == 'all') {
      result = await db.query(`SELECT a.name,a.price,a.image,a.id,c.name as product_category_name FROM products as a join product_subcategories as b 
      on a.product_subcategory_id = b.id join product_categories as c 
      on b.product_category_id = c.id
      where b.name = $1 and c.name=$2 and price between $3 and $4 and color = $5`,[req.body.subcategory,req.body.category,min,max,req.body.color]);
    }
    else{
      result = await db.query(`SELECT a.name,a.price,a.image,a.id,c.name as product_category_name FROM products as a join product_subcategories as b 
      on a.product_subcategory_id = b.id join product_categories as c 
      on b.product_category_id = c.id
      where b.name = $1 and c.name=$2 and price between $3 and $4 and size = $5 and color =$6`,[req.body.subcategory,req.body.category,min,max,req.body.size,req.body.color]);
    }
    const products = result.rows 
    const result1 = await db.query(`SELECT distinct a.size FROM products as a join product_subcategories as b 
    on a.product_subcategory_id = b.id join product_categories as c 
    on b.product_category_id = c.id
    where b.name = $1 and c.name=$2` ,[req.body.subcategory,req.body.category])
    const sizes = result1.rows
    const result2 = await db.query(`SELECT distinct a.color FROM products as a join product_subcategories as b 
    on a.product_subcategory_id = b.id join product_categories as c 
    on b.product_category_id = c.id
    where b.name = $1 and c.name=$2` ,[req.body.subcategory,req.body.category])
    const colors = result2.rows
    console.log(products)
    res.render("product.ejs",{sizes : sizes, colors : colors,categorySort:req.body.category,subcategorySort: req.body.subcategory ,productCategory: keys, productSubCategory: getALLProductCategory,products: products,session:req.session,user :req.user,layout: './layouts/headerfooter' })
  }
}
}
export default ProductController