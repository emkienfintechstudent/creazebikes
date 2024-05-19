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
    const day_of_week = result.rows

        res.render("admin/requirements.ejs",{day_of_week:day_of_week,layout: 'admin/layouts/header_footer'})
    }
 }
}
export default Requirements;