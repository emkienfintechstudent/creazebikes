import { setupProductCategory, keys, getALLProductCategory } from "../../utils/products/productCategorySetup.js";
import db from "../../config/connectDB.js"
import moment from "moment";
import crypto from 'crypto';
import https from 'https';
function OrderController() {
  return {
   async index(req,res){
    await setupProductCategory()
    const result = await db.query(`select a.id as cart_id,a.address,a.phone_number, a.created_at,c.name as status from carts a join orders b on a.id = b.cart_id
    join status c on a.status_id = c.id
    where user_id = $1 
    group by a.id ,a.address,a.phone_number,a.created_at,c.name`, [req.user.id])
    const orders = result.rows
    res.render("order.ejs",{orders : orders,productCategory: keys, productSubCategory: getALLProductCategory,user :req.user,session:req.session,layout: './layouts/headerfooter',moment:moment} )
   },
   async store(req,res){
    console.log(req.body)
    if(req.body.momo == "") {
     // https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    // parameters
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = req.session.cart.items;
    var partnerCode = 'MOMO';
    var redirectUrl = 'http://localhost:3000/payment/ipn';
    var ipnUrl = 'http://localhost:3000/payment/ipn';
    var requestType = "payWithMethod";
    var amount = '50000';
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = '';
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';
    
    // before sign HMAC SHA256 with format
    // accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    // puts raw signature
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);
    // signature
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    // json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
   
       
    });

    // Create the HTTPS objects
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    };

    // Send the request and get the response
    const momoReq = https.request(options, momoRes => {
        console.log(`Status: ${momoRes.statusCode}`);
        console.log(`Headers: ${JSON.stringify(momoRes.headers)}`);
        momoRes.setEncoding('utf8');
        momoRes.on('data', (body) => {
            console.log('Body: ');
            console.log(body);
            const response = JSON.parse(body);
            console.log('resultCode: ');
            console.log(response.resultCode);
            if (response.resultCode === 0) {
                res.redirect(response.shortLink); // Redirect to the short link
            } else {
                res.status(400).json({ error: "Payment initiation failed" });
            }
        });
        momoRes.on('end', () => {
            console.log('No more data in response.');
        });
    });

    momoReq.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        res.status(500).send(`problem with request: ${e.message}`);
    });

    // write data to request body
    console.log("Sending....");
    momoReq.write(requestBody);
    momoReq.end();
   
  
  
  
  }else if(req.body.cod ==''){
      console.log(req.session.cart)
      const address = req.body.address
      const phone=req.body.phone_number
      // thêm vào bảng cart trước    
      const date_now = new Date().toISOString().slice(0, 10);
      const result = await db.query(
        "INSERT INTO carts (items,address,phone_number,created_at,status_id) VALUES ($1, $2,$3,$4,$5) RETURNING *",
        [req.session.cart.items,address,phone,date_now,3]
      );
      const cart_id = result.rows[0].id 
      const items = req.session.cart.items
      let totalQuantity= 0
      let totalPrice = 0 
      // thêm vào bảng order
      for(let product of Object.values(items)) {
        totalQuantity +=  product.qty 
        totalPrice += product.item.price
        const result_id = await db.query(
          `select id from orders order by id desc limit 1 `
        );
        const order_id = result_id.rows[0].id +1 
        const result = await db.query(
          "INSERT INTO orders  (id,created_at, product_id,user_id,quantity,cart_id) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *",
          [order_id,date_now, product.item.id,req.user.id , product.qty, cart_id]
        );
      };
      await db.query(
        `update carts
        set total_quantity = $1, total_price = $2 
        where id = $3`,
        [totalQuantity,totalPrice,cart_id]
      );
      delete req.session.cart
      req.flash('success','Order placed successfully')
      res.redirect('/customer/orders')
    }
   
   },
  async show(req,res){
    const result =await db.query(`select items from carts
    where id = $1
    `,[req.params.id])
    await setupProductCategory()

    res.render("singelOrder.ejs",{items:result.rows[0].items,productCategory: keys, productSubCategory: getALLProductCategory,user :req.user,layout: './layouts/headerfooter',moment:moment,session:req.session})
  } 
 

}
}
export default  OrderController