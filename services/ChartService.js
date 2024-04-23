import db from '../config/connectDB.js'
const getCustomerDataForReport = async () => {

    const result = await db.query(`WITH cte AS (
        SELECT 
            extract(year FROM now()) - extract(year FROM birth_date) AS age 
        FROM 
            users 
    )
    SELECT 
        CASE 
            WHEN age >= 17 AND age < 30 THEN '17-30'
            WHEN age >= 31 AND age < 50 THEN '31-50'
            WHEN age >= 50 THEN '>=50'  
        END AS age_group, 
        count(*),
        ROUND(CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM cte) AS DECIMAL), 2) AS percentage
    FROM 
        cte 
    GROUP BY  
        CASE 
            WHEN age >= 17 AND age < 30 THEN '17-30'
            WHEN age >= 31 AND age < 50 THEN '31-50'
            WHEN age >= 50 THEN '>=50'  
        END;` );
    return result.rows
};
const getDataForReportLineChart1 = async () => {
    const result = await db.query(`
    SELECT TO_CHAR(a.created_at, 'YYYY-MM') AS year_month,
    SUM(price*quantity) - SUM(cost*quantity) AS profit
    FROM orders a
    JOIN products b ON a.product_id = b.id
    WHERE a.created_at >= NOW() - INTERVAL '12 months'
    GROUP BY TO_CHAR(a.created_at, 'YYYY-MM')
    order by year_month
       ` )
    return result.rows
}
export {getCustomerDataForReport,getDataForReportLineChart1}