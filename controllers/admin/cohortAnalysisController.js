import db from '../../config/connectDB.js';
function CohortAnalysis() {
 return{
    async index(req,res){
        const result5 = await db.query(`With a as
        (Select user_id, amount, TO_CHAR(first_purchase_date,'YYYY-MM') as cohort_month,
        created_at,
        (Extract(year from created_at) - extract(year from first_purchase_date))*12 
          + Extract(MONTH from created_at) - extract(MONTH from first_purchase_date) +1
          as index
        from 
        (
        Select a.user_id, 
        round((price*quantity)::decimal,2) as amount,
        Min(a.created_at) OVER (PARTITION BY user_id) as first_purchase_date,
        a.created_at
        from orders a join products b on a.product_id = b.id
        ) as b),
        cohort_data as
        (
        Select cohort_month, 
        index,
        COUNT(DISTINCT user_id) as user_count,
        round(SUM(amount),2) as revenue
        from a
        Group by cohort_month, index
        ORDER BY INDEX
        )
        SELECT 
            cohort_month,
            SUM(CASE WHEN index = 1 THEN user_count ELSE 0 END) AS m1,
            SUM(CASE WHEN index = 2 THEN user_count ELSE 0 END) AS m2,
            SUM(CASE WHEN index = 3 THEN user_count ELSE 0 END) AS m3,
            SUM(CASE WHEN index = 4 THEN user_count ELSE 0 END) AS m4,
            SUM(CASE WHEN index = 5 THEN user_count ELSE 0 END) AS m5,
            SUM(CASE WHEN index = 6 THEN user_count ELSE 0 END) AS m6,
            SUM(CASE WHEN index = 7 THEN user_count ELSE 0 END) AS m7,
            SUM(CASE WHEN index = 8 THEN user_count ELSE 0 END) AS m8,
            SUM(CASE WHEN index = 9 THEN user_count ELSE 0 END) AS m9,
            SUM(CASE WHEN index = 10 THEN user_count ELSE 0 END) AS m10,
            SUM(CASE WHEN index = 11 THEN user_count ELSE 0 END) AS m11,
            SUM(CASE WHEN index = 12 THEN user_count ELSE 0 END) AS m12
          
        FROM 
            cohort_data
        GROUP BY 
            cohort_month
        ORDER BY 
            cohort_month;
        `)
        const result6 = await db.query(`With a as
        (Select user_id, amount, TO_CHAR(first_purchase_date,'YYYY-MM') as cohort_month,
        created_at,
        (Extract(year from created_at) - extract(year from first_purchase_date))*12 
          + Extract(MONTH from created_at) - extract(MONTH from first_purchase_date) +1
          as index
        from 
        (
        Select a.user_id, 
        round((price*quantity)::decimal,2) as amount,
        Min(a.created_at) OVER (PARTITION BY user_id) as first_purchase_date,
        a.created_at
        from orders a join products b on a.product_id = b.id
        ) as b),
        cohort_data as
        (
        Select cohort_month, 
        index,
        COUNT(DISTINCT user_id) as user_count,
        round(SUM(amount),2) as revenue
        from a
        Group by cohort_month, index
        ORDER BY INDEX
        ),
        Customer_cohort as (
        SELECT 
            cohort_month,
            SUM(CASE WHEN index = 1 THEN user_count ELSE 0 END) AS m1,
            SUM(CASE WHEN index = 2 THEN user_count ELSE 0 END) AS m2,
            SUM(CASE WHEN index = 3 THEN user_count ELSE 0 END) AS m3,
            SUM(CASE WHEN index = 4 THEN user_count ELSE 0 END) AS m4,
            SUM(CASE WHEN index = 5 THEN user_count ELSE 0 END) AS m5,
            SUM(CASE WHEN index = 6 THEN user_count ELSE 0 END) AS m6,
            SUM(CASE WHEN index = 7 THEN user_count ELSE 0 END) AS m7,
            SUM(CASE WHEN index = 8 THEN user_count ELSE 0 END) AS m8,
            SUM(CASE WHEN index = 9 THEN user_count ELSE 0 END) AS m9,
            SUM(CASE WHEN index = 10 THEN user_count ELSE 0 END) AS m10,
            SUM(CASE WHEN index = 11 THEN user_count ELSE 0 END) AS m11,
            SUM(CASE WHEN index = 12 THEN user_count ELSE 0 END) AS m12
          
        FROM 
            cohort_data
        GROUP BY 
            cohort_month
        ORDER BY 
            cohort_month)
            Select cohort_month,
          ROUND(100.00 * m1 / m1, 2) || '%' AS m1,
            ROUND(100.00 * m2 / m1, 2) || '%' AS m2,
            ROUND(100.00 * m3 / m1, 2) || '%' AS m3,
            ROUND(100.00 * m4 / m1, 2) || '%' AS m4,
            ROUND(100.00 * m5 / m1, 2) || '%' AS m5,
            ROUND(100.00 * m6 / m1, 2) || '%' AS m6,
            ROUND(100.00 * m7 / m1, 2) || '%' AS m7,
            ROUND(100.00 * m8 / m1, 2) || '%' AS m8,
            ROUND(100.00 * m9 / m1, 2) || '%' AS m9,
            ROUND(100.00 * m10 / m1, 2) || '%' AS m10,
            ROUND(100.00 * m11 / m1, 2) || '%' AS m11,
            ROUND(100.00 * m12 / m1, 2) || '%' AS m12
        from customer_cohort
        `)
    const result7 = await db.query(`With a as
    (Select user_id, amount, TO_CHAR(first_purchase_date,'YYYY-MM') as cohort_month,
    created_at,
    (Extract(year from created_at) - extract(year from first_purchase_date))*12 
      + Extract(MONTH from created_at) - extract(MONTH from first_purchase_date) +1
      as index
    from 
    (
    Select a.user_id, 
    round((price*quantity)::decimal,2) as amount,
    Min(a.created_at) OVER (PARTITION BY user_id) as first_purchase_date,
    a.created_at
    from orders a join products b on a.product_id = b.id
    ) as b),
    cohort_data as
    (
    Select cohort_month, 
    index,
    COUNT(DISTINCT user_id) as user_count,
    round(SUM(amount),2) as revenue
    from a
    Group by cohort_month, index
    ORDER BY INDEX
    ),
    Customer_cohort as (
    SELECT 
        cohort_month,
        SUM(CASE WHEN index = 1 THEN user_count ELSE 0 END) AS m1,
        SUM(CASE WHEN index = 2 THEN user_count ELSE 0 END) AS m2,
        SUM(CASE WHEN index = 3 THEN user_count ELSE 0 END) AS m3,
        SUM(CASE WHEN index = 4 THEN user_count ELSE 0 END) AS m4,
        SUM(CASE WHEN index = 5 THEN user_count ELSE 0 END) AS m5,
        SUM(CASE WHEN index = 6 THEN user_count ELSE 0 END) AS m6,
        SUM(CASE WHEN index = 7 THEN user_count ELSE 0 END) AS m7,
        SUM(CASE WHEN index = 8 THEN user_count ELSE 0 END) AS m8,
        SUM(CASE WHEN index = 9 THEN user_count ELSE 0 END) AS m9,
        SUM(CASE WHEN index = 10 THEN user_count ELSE 0 END) AS m10,
        SUM(CASE WHEN index = 11 THEN user_count ELSE 0 END) AS m11,
        SUM(CASE WHEN index = 12 THEN user_count ELSE 0 END) AS m12
      
    FROM 
        cohort_data
    GROUP BY 
        cohort_month
    ORDER BY 
        cohort_month)
    SELECT 
        cohort_month,
        (100.00 - ROUND(100.00 * m1 / m1, 2)) || '%' AS m1,
        (100.00 - ROUND(100.00 * m2 / m1, 2)) || '%' AS m2,
        (100.00 - ROUND(100.00 * m3 / m1, 2)) || '%' AS m3,
        (100.00 - ROUND(100.00 * m4 / m1, 2)) || '%' AS m4,
        (100.00 - ROUND(100.00 * m5 / m1, 2)) || '%' AS m5,
        (100.00 - ROUND(100.00 * m6 / m1, 2)) || '%' AS m6,
        (100.00 - ROUND(100.00 * m7 / m1, 2)) || '%' AS m7,
        (100.00 - ROUND(100.00 * m8 / m1, 2)) || '%' AS m8,
        (100.00 - ROUND(100.00 * m9 / m1, 2)) || '%' AS m9,
        (100.00 - ROUND(100.00 * m10 / m1, 2)) || '%' AS m10,
        (100.00 - ROUND(100.00 * m11 / m1, 2)) || '%' AS m11,
        (100.00 - ROUND(100.00 * m12 / m1, 2)) || '%' AS m12
    FROM 
        customer_cohort;
    `)
    const customerCohort = result5.rows
    const retentionCohort = result6.rows
    const churnCohort = result7.rows
    console.log(customerCohort)
    console.log(retentionCohort)
    console.log(churnCohort)
      res.render("admin/cohortAnalysis.ejs",{churnCohort:churnCohort,retentionCohort:retentionCohort,customerCohort:customerCohort,layout: 'admin/layouts/header_footer'})

    }
 }
}
export default CohortAnalysis;