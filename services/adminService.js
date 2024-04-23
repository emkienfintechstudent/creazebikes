import db from '../config/connectDB.js';
const topCustomers = async () => {
    const result = await db.query(`select a.name as customer_name, round(cast(sum(price) as decimal),2)  from users a join orders b on a.id = b.user_id join products c on b.product_id = c.id 
    group by a.name
    order by sum(price) desc
    limit 10`)
    return result.rows
}
const revenueReport_sql = async () => {
    const result = await db.query(`WITH 
    daily AS (
        SELECT 
            CASE 
                WHEN CAST(a.created_at AS DATE) = CURRENT_DATE THEN 1 
                WHEN CAST(a.created_at AS DATE) = CURRENT_DATE - INTERVAL '1 day' THEN 0
            END AS id,
            CASE 
                WHEN CAST(a.created_at AS DATE) = CURRENT_DATE THEN 'today' 
                WHEN CAST(a.created_at AS DATE) = CURRENT_DATE - INTERVAL '1 day' THEN 'yesterday' 
            END AS daily,
           ROUND(SUM(price)::DECIMAL, 2) AS daily_revenue,
		count(*) as daily_order 
        FROM 
            orders a 
        JOIN 
            products b ON a.product_id = b.id
        WHERE 
            CAST(a.created_at AS DATE) = CURRENT_DATE OR CAST(a.created_at AS DATE) = CURRENT_DATE - INTERVAL '1 day'
        GROUP BY  
            CASE 
                WHEN CAST(a.created_at AS DATE) = CURRENT_DATE THEN 1 
                WHEN CAST(a.created_at AS DATE) = CURRENT_DATE - INTERVAL '1 day' THEN 0
            END ,
            CASE 
                WHEN CAST(a.created_at AS DATE) = CURRENT_DATE THEN 'today' 
                WHEN CAST(a.created_at AS DATE) = CURRENT_DATE - INTERVAL '1 day' THEN 'yesterday' 
            END
    ),
    monthly AS (
        SELECT 
            CASE 
                WHEN DATE_TRUNC('month', CAST(a.created_at AS DATE)) = DATE_TRUNC('month', CURRENT_DATE) THEN 1 
                WHEN DATE_TRUNC('month', CAST(a.created_at AS DATE)) = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') THEN 0
            END AS id,
            CASE 
                WHEN DATE_TRUNC('month', CAST(a.created_at AS DATE)) = DATE_TRUNC('month', CURRENT_DATE) THEN 'this month' 
                WHEN DATE_TRUNC('month', CAST(a.created_at AS DATE)) = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') THEN 'last month' 
            END AS monthly,
           ROUND(SUM(price)::DECIMAL, 2) AS monthly_revenue,count(*) as monthly_order
        FROM 
            orders a 
        JOIN 
            products b ON a.product_id = b.id
        WHERE 
            DATE_TRUNC('month', CAST(a.created_at AS DATE)) = DATE_TRUNC('month', CURRENT_DATE) 
            OR DATE_TRUNC('month', CAST(a.created_at AS DATE)) = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
        GROUP BY 
            CASE 
                WHEN DATE_TRUNC('month', CAST(a.created_at AS DATE)) = DATE_TRUNC('month', CURRENT_DATE) THEN 1 
                WHEN DATE_TRUNC('month', CAST(a.created_at AS DATE)) = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') THEN 0
            END ,
            CASE 
                WHEN DATE_TRUNC('month', CAST(a.created_at AS DATE)) = DATE_TRUNC('month', CURRENT_DATE) THEN 'this month' 
                WHEN DATE_TRUNC('month', CAST(a.created_at AS DATE)) = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') THEN 'last month' 
            END
    ),
    weekly AS (
        SELECT 
            CASE 
                WHEN DATE_TRUNC('week', CAST(a.created_at AS DATE)) = DATE_TRUNC('week', CURRENT_DATE) THEN 1 
                WHEN DATE_TRUNC('week', CAST(a.created_at AS DATE)) = DATE_TRUNC('week', CURRENT_DATE - INTERVAL '1 week') THEN 0
            END AS id,
            CASE 
                WHEN DATE_TRUNC('week', CAST(a.created_at AS DATE)) = DATE_TRUNC('week', CURRENT_DATE) THEN 'this week' 
                WHEN DATE_TRUNC('week', CAST(a.created_at AS DATE)) = DATE_TRUNC('week', CURRENT_DATE - INTERVAL '1 week') THEN 'last week' 
            END AS weekly,
           ROUND(SUM(price)::DECIMAL, 2) AS weekly_revenue,count(*) as weekly_order
        FROM 
            orders a 
        JOIN 
            products b ON a.product_id = b.id
        WHERE 
            DATE_TRUNC('week', CAST(a.created_at AS DATE)) = DATE_TRUNC('week', CURRENT_DATE) 
            OR DATE_TRUNC('week', CAST(a.created_at AS DATE)) = DATE_TRUNC('week', CURRENT_DATE - INTERVAL '1 week')
        GROUP BY 
            CASE 
                WHEN DATE_TRUNC('week', CAST(a.created_at AS DATE)) = DATE_TRUNC('week', CURRENT_DATE) THEN 1 
                WHEN DATE_TRUNC('week', CAST(a.created_at AS DATE)) = DATE_TRUNC('week', CURRENT_DATE - INTERVAL '1 week') THEN 0
            END ,
            CASE 
                WHEN DATE_TRUNC('week', CAST(a.created_at AS DATE)) = DATE_TRUNC('week', CURRENT_DATE) THEN 'this week' 
                WHEN DATE_TRUNC('week', CAST(a.created_at AS DATE)) = DATE_TRUNC('week', CURRENT_DATE - INTERVAL '1 week') THEN 'last week' 
            END
    )
    SELECT 
      daily.id, daily_revenue,
      case when weekly_revenue is null then 0 else weekly_revenue end as weekly_revenue ,
      case when monthly_revenue is null then 0 else monthly_revenue end as monthly_revenue,
	    CASE 
        WHEN weekly_order IS NULL THEN 0 
        ELSE weekly_order 
    END AS weekly_order,
    CASE 
        WHEN daily_order IS NULL THEN 0 
        ELSE daily_order 
    END AS daily_order,
    CASE 
        WHEN monthly_order IS NULL THEN 0 
        ELSE monthly_order 
    END AS monthly_order
	
    FROM 
        daily
    LEFT JOIN 
        monthly ON daily.id = monthly.id
    LEFT JOIN 
        weekly ON daily.id = weekly.id;
     `)
    return result.rows 
}
const dataTotalProfit = async () => {
    const result = await db.query(` SELECT 
    SUM(price*quantity) - SUM(cost*quantity) AS profit
    FROM orders a
    JOIN products b ON a.product_id = b.id
    WHERE a.created_at >= NOW() - INTERVAL '12 months'`
    )
    return result.rows[0]
}
const dataForGeneralReport = async () => {
    const result = await db.query(`
    SELECT 
    EXTRACT(MONTH FROM a.created_at) AS month, 
    SUM(price * quantity) AS total_revenue, 
    COUNT(*) AS total_orders, 
    SUM(cost * quantity) AS total_cost,
    SUM(b.price * a.quantity) - SUM(b.cost * a.quantity) AS total_profit
FROM 
    orders a
JOIN 
    products b ON a.product_id = b.id
WHERE 
    DATE_TRUNC('month', a.created_at) = DATE_TRUNC('month', CURRENT_DATE) OR
    DATE_TRUNC('month', a.created_at) = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
GROUP BY 
    EXTRACT(MONTH FROM a.created_at)
    order by EXTRACT(MONTH FROM a.created_at) desc
    `)
    return result.rows
}
const dataAdmin = async () => {
        const result = await db.query(`select * from users 
        where is_admin = true`)
        return result.rows
}
export { topCustomers, revenueReport_sql,dataTotalProfit,dataForGeneralReport,dataAdmin}