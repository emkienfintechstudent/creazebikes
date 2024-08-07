import db from '../../config/connectDB.js';
import { revenueReport_sql } from '../../services/adminService.js';
function ChartData() {
    return {
        
       async revenueProfit12Months(req, res) {
        const result = await db.query(`  SELECT TO_CHAR(a.created_at, 'YYYY-MM') AS year_month,sum(price*quantity) as revenue,
        SUM(price*quantity) - SUM(cost*quantity) AS profit
        FROM orders a
        JOIN products b ON a.product_id = b.id
        WHERE a.created_at >= NOW() - INTERVAL '12 months'
        GROUP BY TO_CHAR(a.created_at, 'YYYY-MM')
        order by year_month `)
        const revenueProfit12MonthsData = result.rows
        res.json({revenueProfit12MonthsData:revenueProfit12MonthsData}); 

    },
    async revenueByCategory(req,res){
            const result = await db.query(`SELECT d.name category, round(sum(price * quantity)::decimal,3) revenue
            FROM ORDERS A
            JOIN PRODUCTS B ON A.PRODUCT_ID = B.ID
            JOIN PRODUCT_SUBCATEGORIES C ON B.PRODUCT_SUBCATEGORY_ID = C.ID
            join product_categories d on c.product_category_id = d.id
            group by d.name`)
            const revenueByCategory = result.rows 
            res.json({revenueByCategory:revenueByCategory}); 

    },
    async ordersByCategory(req,res){
        const result = await db.query(`SELECT d.name category, count(*) as total_orders 
        FROM ORDERS A
        JOIN PRODUCTS B ON A.PRODUCT_ID = B.ID
        JOIN PRODUCT_SUBCATEGORIES C ON B.PRODUCT_SUBCATEGORY_ID = C.ID
        join product_categories d on c.product_category_id = d.id
        group by d.name`)
        const ordersByCategory = result.rows 
        res.json({ ordersByCategory: ordersByCategory}); 

},
 async totalCustomers(req,res){
    const result = await db.query(`with cte as (SELECT TO_CHAR(a.created_at, 'YYYY-MM') AS year_month, count(distinct user_id) total_customers
    FROM orders a
    JOIN products b ON a.product_id = b.id
    WHERE a.created_at >= NOW() - INTERVAL '12 months'
    group by TO_CHAR(a.created_at, 'YYYY-MM')
    order by year_month)
select year_month, total_customers, coalesce(lag(total_customers) over(order by year_month asc),0)*1.1 target_total_customers from cte `)
    const totalCustomers= result.rows
    res.json({ totalCustomers:totalCustomers}); 
 },
 async revenuePerCustomer(req,res){
    const result = await db.query(` SELECT TO_CHAR(a.created_at, 'YYYY-MM') AS year_month, round(sum(price*quantity)::decimal/count(distinct user_id),2) revenue_per_customer
    FROM orders a
    JOIN products b ON a.product_id = b.id
    WHERE a.created_at >= NOW() - INTERVAL '12 months'
    group by TO_CHAR(a.created_at, 'YYYY-MM')
    order by year_month `)
    const revenuePerCustomer= result.rows
    res.json({ revenuePerCustomer:revenuePerCustomer}); 
 },
 async ordersByMonth(req,res){
    const result = await db.query(` with cte as (SELECT TO_CHAR(a.created_at, 'YYYY-MM') AS year_month,count(*)
    FROM orders a
    JOIN products b ON a.product_id = b.id
    WHERE a.created_at >= NOW() - INTERVAL '12 months'
    GROUP BY TO_CHAR(a.created_at, 'YYYY-MM')
    order by year_month )
select year_month, count as orders, round(lag(count)over(order by year_month asc)*1.1) as orders_target from cte `)
    const ordersByMonth= result.rows
    res.json({ ordersByMonth:ordersByMonth}); 
 },

 
}
}
export default ChartData;