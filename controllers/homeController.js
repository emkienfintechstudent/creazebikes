import db from '../config/connectDB.js';
import {getBestSellerProduct,getFeaturedProducts} from "../services/CRUDService.js"
import { setupProductCategory, keys, getALLProductCategory } from "../utils/products/productCategorySetup.js";

function HomeController() {
  return {
    async index(req,res){
      await setupProductCategory();
      // scoll tabs
      const result = await db.query(`SELECT a.id,a.image,a.name,a.price, c.name as product_category_name  FROM products a join product_subcategories b on a.product_subcategory_id = b.id
      join product_categories c on b.product_category_id = c.id
      group by a.id,a.image,a.name,a.price, c.name 
      ORDER BY a.created_at LIMIT 6`);
      // best seller 
      const result1 = await getBestSellerProduct();
      const bestSellerProducts = result1.rows
      // featured products 
      const result2 = await getFeaturedProducts()
      /// hot sales 
      const result3 = await db.query(`SELECT a.id,a.image,a.name,a.price, c.name as product_category_name  FROM products a join product_subcategories b on a.product_subcategory_id = b.id
      join product_categories c on b.product_category_id = c.id
	  where a.price < 30 
      group by a.id,a.image,a.name,a.price, c.name 
	  order by a.price 
	  limit 6`)
    const hot_sales = result3.rows
          res.render("home.ejs", {hot_sales:hot_sales, scroll_tabs: result.rows, productCategory: keys, productSubCategory: getALLProductCategory,bestSellerProducts:bestSellerProducts ,user:req.user,session:req.session,featured_products : result2, layout: './layouts/headerfooter' });
   
    }
  }
}

export default HomeController
