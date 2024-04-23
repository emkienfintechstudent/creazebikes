import db from '../config/connectDB.js'
const getUserById = async (id) => {

    const result = await db.query(`SELECT id,name,email,phone_number FROM users 
    where  id = $1 ` ,[id]);
    return result.rows[0]
}
const getAllUsers = async () => {
    const result = await db.query("SELECT id,name,email,created_at,phone_number FROM users");
    const users = result.rows
    return users
}
const getAllProducts = async () => {
    const result = await db.query("SELECT * FROM products");
    const products = result.rows
    return products
}
const getAllProductCategory = async ()=> {
   const result = await db.query(`SELECT a.name as cate_name, b.name as subcate_name FROM product_categories as a 
   join product_subcategories as b on a.id = b.product_category_id `);
   const product_categories = result.rows
   const category_object = product_categories.reduce((acc, item) => {
    const key = item.cate_name;
  
    // Nếu key chưa tồn tại, tạo key mới và gán một mảng con
    if (!acc[key]) {
      acc[key] = [];
    }
  
    // Thêm phần tử vào mảng con tương ứng với key
    acc[key].push({ subcate_name: item.subcate_name });
  
    return acc;
  }, {});
  return category_object
}
const getBestSellerProduct = async() => {
  const result = await db.query(`select a.product_id as id, d.name as product_category_name,b.name,b.image, count(*),b.price from orders as a join products as b 
  on a.product_id = b.id join product_subcategories as c on b.product_subcategory_id = c.id join product_categories as d on c.product_category_id  = d.id
  group by a.product_id ,b.name,b.price,b.image, d.name
  order by count(*) desc
  limit 8 `)
  return result
}
const getFeaturedProducts = async() => {
  const result = await db.query(`with cte as (
    SELECT a.name,a.price,a.image,a.id,c.name as product_category_name , RANK() OVER(PARTITION BY c.name ORDER BY price DESC,sum(d.quantity) desc) as  Rank FROM products as a join product_subcategories as b 
        on a.product_subcategory_id = b.id join product_categories as c 
        on b.product_category_id = c.id join orders as d on d.product_id = a.id
      
      group by a.name,a.price,a.image,a.id,c.name
    )
    select * from  cte 
    where rank =1 `)
  return result.rows
}
export  {getUserById,getAllUsers,getAllProducts,getAllProductCategory,getBestSellerProduct,getFeaturedProducts}
