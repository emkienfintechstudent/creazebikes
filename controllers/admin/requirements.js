import db from '../../config/connectDB.js';

function Requirements() {
    return {
    async index(req,res){
        const result = await  db.query(`SELECT 
        CASE 
            WHEN extract(dow FROM created_at) = 0 THEN 'Sunday'
            WHEN extract(dow FROM created_at) = 1 THEN 'Monday'
            WHEN extract(dow FROM created_at) = 2 THEN 'Tuesday'
            WHEN extract(dow FROM created_at) = 3 THEN 'Wednesday'
            WHEN extract(dow FROM created_at) = 4 THEN 'Thursday'
            WHEN extract(dow FROM created_at) = 5 THEN 'Friday'
            WHEN extract(dow FROM created_at) = 6 THEN 'Saturday'
        END AS day_of_week, 
        COUNT(*) 
    FROM users 
    GROUP BY day_of_week
    ORDER BY COUNT(*) DESC
    limit 2 
    `)
    const result1 = await db.query(`select a.id,a.name,a.email from users a left join orders b on a.id= b.user_id
    where b.user_id is null and role_id is null and  email is not null and email like '%@gmail.com' `)
    const result2 = await db.query(`SELECT AVG(total_quantity) AS avg_products_per_user
    FROM (
        SELECT user_id, SUM(quantity) AS total_quantity
        FROM orders
        GROUP BY user_id
    ) AS user_orders;`)
    const result3 = await db.query(`select a.id,a.name,sum(price * quantity) - sum(cost*quantity) as profit from products a join orders b on a.id = b.product_id
    group by a.id,a.name
    order by profit desc
    limit 5 `)
    const result4 = await db.query(`SELECT TO_CHAR(a.created_at, 'YYYY-MM') AS year_month, count(distinct user_id) total_customers,
    (sum(price*quantity) - sum(quantity*cost)) /sum(quantity) as avg_order_value
        FROM orders a
        JOIN products b ON a.product_id = b.id
        WHERE a.created_at >= NOW() - INTERVAL '12 months'
        group by TO_CHAR(a.created_at, 'YYYY-MM')
        order by year_month`)
 
    const result8 = await db.query(`select gender, min(extract(year from now()) - extract(year from birth_date)) as min_age , max(extract(year from now()) - extract(year from birth_date)) max_age from users
    where gender is not null and gender != 'NA'
    group by gender`)
    const day_of_week = result.rows
    const inactive_users = result1.rows
    const avg_products_per_user = result2.rows[0]
    const top_5_profits = result3.rows
    const monthlyAOV= result4.rows
    const min_max_age = result8.rows
    
        res.render("admin/requirements.ejs",{min_max_age:min_max_age, monthlyAOV:monthlyAOV,top_5_profits:top_5_profits,avg_products_per_user:avg_products_per_user,inactive_users:inactive_users,day_of_week:day_of_week,layout: 'admin/layouts/header_footer'})
    }
 }
}
export default Requirements;