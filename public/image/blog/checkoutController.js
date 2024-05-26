const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')
const dao = require('../DAO/dao')
const axios = require('axios')
const crypto = require('crypto');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//support parsing of application/x-www-form-urlencoded post data
app.use(express.json())
app.use(express.urlencoded({ extended:true }))


const test_payment2 = async (req,res) => {
    const total = 100000; // Bạn có thể thay đổi giá trị này tùy theo yêu cầu của bạn
    const paymentPayload = {
      total: total
    };
  
    try {
      const paymentResponse = await axios.post('http://localhost:8080/payment', paymentPayload);
      console.log("Payment Response:", paymentResponse.data);
      res.status(200).send(paymentResponse.data);
    } catch (error) {
      console.error("Error during payment:", error);
      res.status(500).send('Error during payment');
    }
}

const check = async (req,res) => {
   res.send('hihihihi')
}

const checkOut = async (req, res) => {
    try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const exchangeRates = response.data.rates;
        const usdToVnd = exchangeRates['VND'];
        
        const account = req.session.acc 
        const accid = account[0].id
        const id = 1
        const { name,email,phoneNumber,deliveryAddress } = req.body;
        await dao.insertTempo(id,accid, name, email, phoneNumber, deliveryAddress)
        const cart =  await dao.getCart(accid)   
        const total1 = cart[0].subtotal * usdToVnd
        const total = parseFloat(total1.toFixed(0));
        const paymentPayload = {
            total: total
          };
          try {
            const paymentResponses = await axios.post('http://localhost:8080/payment', paymentPayload);
            console.log("Payment Response:", paymentResponses.data);
             const link = paymentResponses.data.link
            res.redirect(link);
          } catch (error) {
            console.error("Error during paymenta:", error);
            res.status(500).send('Error during paymenta');
          }

        }catch (error) {
            console.error('Error retrieving category:', error);
            res.status(500).send('Internal Server Error');
          }
        };
        // const name = 'phuong'
        // const email = 'phuong@gmail.com'
        // const phoneNumber = '0327496707'
        // const deliveryAddress = 'linhdam'

        // Gửi mail đơn hàng
            // Tạo nội dung email từ kết quả truy vấn

const processOrder = async (req, res) => {
        try {
            
            const orderInfo = await dao.getTempo()
            const accid2 = orderInfo[0].accid
            const cart2 =  await dao.getCart(accid2)   
            const total = cart2[0].subtotal

             const name = orderInfo[0].name
            const email = orderInfo[0].email
            const phoneNumber = orderInfo[0].phoneNumber
            const deliveryAddress = orderInfo[0].deliveryAddress
            var emailContent = '';
            for (var i = 0; i < cart2.length; i++) {
                emailContent += `
                    <p>${cart2[i].name} | Price: ${cart2[i].price}$ | Amount: ${cart2[i].quantity}</p>
                `;
            }
        var nodemailer = require('nodemailer');
        
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'dienmayfin@gmail.com',
        pass: 'dqsvlscrzltpsdkj'
        }
        });
        
        var mailOptions = {
        from: 'dienmayfin@gmail.com',
        to: email,
        subject: 'Successful order from Điện máy Fin',
        html: `
            <p>Dear ${name},</p>
            <p>You just ordered from Điện máy Fin.</p>
            <p>Your delivery address is: <b>${deliveryAddress}</b></p>
            <p>Your phone number is: <b>${phoneNumber}</b></p>
            <p>Products you have ordered: 
            ${emailContent}</p>
            <p>Shipping charges: Free ship</p>
            <p>Total money: ${total}$</p>
            <p>Thank you for shopping at Điện máy Fin</p>`
        };
        
      
    //Nhập đơn hàng vào orders
    for (var i = 0; i < cart2.length; i++) {
        const accountid = cart2[i].accountid
        const productid = cart2[i].productid
        const quantity = cart2[i].quantity
        const grandtotal = cart2[i].total_price
        const totalcost = cart2[i].totalcost
        const status = 4
        await dao.insertOrder(accountid, productid, quantity,status,grandtotal,totalcost)
    }
    await dao.deleteAllCart(accid2)
    await dao.deleteTempo()
    // Render trang và truyền dữ liệu vào
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    
      } catch (error) {
        console.error('Error sending email:', error);
        // Handle email sending error (optional)
      }

    } catch (error) {
      console.error('Error retrieving category:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  module.exports = {checkOut,test_payment2,check,processOrder}