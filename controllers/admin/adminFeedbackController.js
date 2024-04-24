import { query } from 'express';
import db from '../../config/connectDB.js';
import moment from "moment";
import nodemailer from 'nodemailer';
import env from "dotenv"
env.config()
function AdminFeedbackController() {
    return {
        async index(req, res) {
            console.log(req.params)
            const result = await db.query(`SELECT A.ID,
            A.TITLE,
            A.CONTENT,
            c.name as status,
            A.CREATED_AT,
            A.EMAIL,
            B.NAME,
            B.PHONE_NUMBER
        FROM FEEDBACKS A
        JOIN USERS B ON A.USER_ID = B.ID
        join status c on a.status_id = c.id
        limit 10`)
        
            res.render("admin/feedbacks.ejs", { feedbacks: result.rows, layout: 'admin/layouts/header_footer', moment: moment })

        },
        async detail(req,res){
            const result = await db.query(`SELECT A.ID,
            A.TITLE,
            A.CONTENT,
            A.CREATED_AT,
            A.EMAIL,
            B.NAME,
            B.PHONE_NUMBER,
            a.reply,
            a.status_id
        FROM FEEDBACKS A
        JOIN USERS B ON A.USER_ID = B.ID
        where A.ID = $1`,[req.params.id])
        if(result.rows[0].status_id == 11) {
            db.query(`update feedbacks set status_id = 10 where id = $1`,[req.params.id])
        }
            res.render("admin/feedback_detail.ejs", {feedback: result.rows[0], layout: 'admin/layouts/header_footer', moment: moment })

        },
        async rep(req,res) {

            var transporter = nodemailer.createTransport({
                service: 'gmail',
              
                auth: {
                    user: 'crazebikescompany@gmail.com',
                    pass: process.env.EMAIL_PASS
                }
            });

            var mailOptions = {
                from: 'crazebikescompany@gmail.com',
                to: req.body.email,
                subject: 'Crazebikes rep your feedback',
                text: req.body.reply,
                html: '<p> Best regards</p><p>Thank you & Good luck!</p>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            const test =  await db.query(`update feedbacks 
            set reply = $1 , status_id = 12 
            where id = $2 
            returning *` , [req.body.reply,req.params.id])
            res.redirect(`/admin/feedbacks`);
        }
    }
}
export default AdminFeedbackController;