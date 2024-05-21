import db from '../../config/connectDB.js';
function RfmAnalysis() {
 return{
    async index(req,res){
    const result9 = await db.query(`with cte as 
    (select 
    b.name, b.email,
    current_date - max(a.created_at) as R,
    count(distinct a.id) as F,
    sum(price*quantity) as M 
    from orders a join users b on a.user_id = b.id join products c on a.product_id=c.id
    group by user_id,b.name,b.email),
    -- phân loại RFM
    cte1 as 
    (select name, email,
    ntile(5) over(order by R desc) as
    R_score,
    ntile(5) over(order by F ) as F_score,
    ntile(5) over(order by M ) as M_score
    from cte),
    cte2 as 
    (select name,email,
     cast(R_score as varchar)|| cast(R_score as varchar)||cast(R_score as varchar)
     as rfm_score from cte1)
     select name,email, rfm_score, segment from cte2 as a join public.segment_score as b 
     on a.rfm_score = b.scores`)
     const result10 = await db.query(`with cte as 
     (select 
     b.name, b.email,
     current_date - max(a.created_at) as R,
     count(distinct a.id) as F,
     sum(price*quantity) as M 
     from orders a join users b on a.user_id = b.id join products c on a.product_id=c.id
     group by user_id,b.name,b.email),
     -- phân loại RFM
     cte1 as 
     (select name, email,
     ntile(5) over(order by R desc) as
     R_score,
     ntile(5) over(order by F ) as F_score,
     ntile(5) over(order by M ) as M_score
     from cte),
     cte2 as 
     (select name,email,
      cast(R_score as varchar)|| cast(R_score as varchar)||cast(R_score as varchar)
      as rfm_score from cte1)
      select name,email, rfm_score, segment from cte2 as a join public.segment_score as b 
      on a.rfm_score = b.scores
      where segment in ('Loyal Customers', 'Champions', 'Potential Loyalist')`)
      const result = await db.query(`with cte as 
      (select 
      b.name, b.email,
      current_date - max(a.created_at) as R,
      count(distinct a.id) as F,
      sum(price*quantity) as M 
      from orders a join users b on a.user_id = b.id join products c on a.product_id=c.id
      group by user_id,b.name,b.email),
      -- phân loại RFM
      cte1 as 
      (select name, email,
      ntile(5) over(order by R desc) as
      R_score,
      ntile(5) over(order by F ) as F_score,
      ntile(5) over(order by M ) as M_score
      from cte),
      cte2 as 
      (select name,email,
       cast(R_score as varchar)|| cast(R_score as varchar)||cast(R_score as varchar)
       as rfm_score from cte1)
       select  segment, count(*) from cte2 as a join public.segment_score as b 
       on a.rfm_score = b.scores
	   group by segment
       `)
      const rfm_table = result9.rows
      const best_customers = result10.rows
      const segment_count = result.rows
      console.log(segment_count)
      res.render("admin/rfmAnalysis.ejs",{segment_count:segment_count,best_customers:best_customers,rfm_table :rfm_table,layout: 'admin/layouts/header_footer'})

    }
 }
}
export default RfmAnalysis;