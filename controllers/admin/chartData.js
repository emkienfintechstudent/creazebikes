import db from '../../config/connectDB.js';
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

    }
}
}
export default ChartData;