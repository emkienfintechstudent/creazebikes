import { setupProductCategory, keys, getALLProductCategory } from "../../utils/products/productCategorySetup.js";
import db from "../../config/connectDB.js"
import moment from "moment";
import bcrypt from "bcrypt";

const saltRounds = 10 //băm bật khẩu 10 vòng
function AccountController() {
    return {
        async index(req, res) {
            await setupProductCategory()
            res.render("user_account.ejs", { productCategory: keys, productSubCategory: getALLProductCategory, user: req.user, session: req.session, layout: './layouts/headerfooter', moment: moment })
        },
        async update(req, res) {
            console.log(req.body)
            const result = await db.query(`UPDATE users 
            SET name =$1,phone_number =$2,birth_date =  $3,address = $4, gender  = $5
            where  id = $6 returning *` , [req.body.name, req.body.phone_number, req.body.birth_date, req.body.address, req.body.gender, req.user.id]);
            req.user.gender = result.rows[0].gender
            req.user.phone_number= result.rows[0].phone_number
            req.user.address = result.rows[0].address
            req.user.birth_date = result.rows[0].birth_date
            req.user.name =   result.rows[0].name 
            res.json({name : req.user.name})
        },
        async getUpdatePassword(req, res) {
            await setupProductCategory()
            console.log(req.user)
            res.render("user_account_password.ejs", { productCategory: keys, productSubCategory: getALLProductCategory, user: req.user, session: req.session, layout: './layouts/headerfooter' })
        },
        async postUpdatePassword(req, res) {
            console.log(req.body);
            try {
                const oldPassword = req.body.old_password;
                const newPassword = req.body.new_password;

                // Kiểm tra xem mật khẩu cũ có khớp không
                bcrypt.compare(oldPassword, req.user.password, async (err, valid) => {
                    if (err) {
                        console.error("Error comparing passwords:", err);
                        return res.status(500).send("Internal Server Error");
                    }

                    if (valid) {
                        // Nếu mật khẩu cũ hợp lệ, tiến hành cập nhật mật khẩu mới
                        bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
                            if (err) {
                                console.error("Error hashing new password:", err);
                                return res.status(500).send("Internal Server Error");
                            }

                            try {
                                const result = await db.query("UPDATE users SET password = $1 WHERE id = $2 returning *", [hash, req.user.id]);
                                req.user.password = result.rows[0].password
                                req.flash("change_password", "update password successfully")
                                res.redirect("/user/account/profile")
                            } catch (err) {
                                console.error("Error updating password in database:", err);
                                return res.status(500).send("Internal Server Error");
                            }
                        });
                    } else {
                        req.flash("incorect_old_password", "old password is not incorect")
                        res.redirect("/user/account/profile/password")
                    }
                });
            } catch (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }
        }
    }

}


export default AccountController;

