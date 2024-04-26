import db from '../../config/connectDB.js';
function StatusController() {
    return {
    async update(req,res) {
        console.log(req.body)
        const result = await db.query( `update ${req.body.table}
        set status_id = $1
        where id = $2 returning *` ,[req.body.status,req.body.id])
        
      }}
}
export default StatusController;