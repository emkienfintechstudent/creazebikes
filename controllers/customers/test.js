import { setupProductCategory, keys, getALLProductCategory } from "../../utils/products/productCategorySetup.js";
import db from "../../config/connectDB.js";
import moment from "moment";
import crypto from "crypto";
import https from "https";

function Test(req, res) {
    const { priceGlobal } = req.body;
    var partnerCode = "MOMO";
    var accessKey = "F8BBA842ECF85";
    var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var requestId = partnerCode + new Date().getTime() + "id";
    var orderId = new Date().getTime() + ":0123456778";
    var orderInfo = "Thanh toán qua ví MoMo";
    var redirectUrl = "https://clever-tartufo-c324cd.netlify.app/pages/home.html";
    var ipnUrl = "https://clever-tartufo-c324cd.netlify.app/pages/home.html";
    var amount = priceGlobal;
    var requestType = "captureWallet";
    var extraData = "";

    var rawSignature =
        "accessKey=" + accessKey +
        "&amount=" + amount +
        "&extraData=" + extraData +
        "&ipnUrl=" + ipnUrl +
        "&orderId=" + orderId +
        "&orderInfo=" + orderInfo +
        "&partnerCode=" + partnerCode +
        "&redirectUrl=" + redirectUrl +
        "&requestId=" + requestId +
        "&requestType=" + requestType;

    var signature = crypto
        .createHmac("sha256", secretkey)
        .update(rawSignature)
        .digest("hex");

    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: "en"
    });

    const options = {
        hostname: "test-payment.momo.vn",
        port: 443,
        path: "/v2/gateway/api/create",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody),
        },
    };

    const reqq = https.request(options, (resMom) => {
        console.log(`Status: ${resMom.statusCode}`);
        console.log(`Headers: ${JSON.stringify(resMom.headers)}`);
        resMom.setEncoding("utf8");
        resMom.on("data", (body) => {
            console.log(JSON.parse(body).payUrl);
            res.json({ payUrl: JSON.parse(body).payUrl });
        });
        resMom.on("end", () => {
            console.log("No more data in response.");
        });
    });

    reqq.on("error", (e) => {
        console.log(`Problem with request: ${e.message}`);
    });

    console.log("Sending....");
    reqq.write(requestBody);
    reqq.end();
}

export default Test;
