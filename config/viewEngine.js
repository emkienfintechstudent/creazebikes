import express from "express"; 
import flash from 'express-flash'
const configViewEngine = (app) => {
    // cấu hình body-parser để xử lý dữ liệu 
app.use(express.urlencoded({extended:true}))
// cấu hình tệp tĩnh
app.use(express.static("public"))
app.set("view engine", "ejs");
app.use(flash())
}
export default configViewEngine;