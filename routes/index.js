var express = require('express');
var router = express.Router();
const Razorpay = require("razorpay");
// const { default: products } = require('razorpay/dist/types/products');


// https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/#12-instantiate-razorpay
// key id and secret id fill kro
var instance = new Razorpay({
  key_id: 'rzp_test_At8ItZ7PYLTd2i',
  key_secret: 'run8FpzGxj2inXlAof6hguxl',
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create/orderId', function(req, res, next) {
var options = {
  amount: 5100000,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11"
};
instance.orders.create(options, function(err, order) {
  console.log("order succesfully created",order);
  res.send(order)
});
});

 // khud se likho
router.post('/api/payment/verify',(req,res)=>{
  const razorpayOrderId = req.body.response.razorpay_order_id;
  const razorpayPaymentId = req.body.response.razorpay_payment_id;
  const signature = req.body.response.razorpay_signature;
  const secret = run8FpzGxj2inXlAof6hguxl;
  var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');
const result = validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
res.send(result);
})

module.exports = router;



// keyid = rzp_test_At8ItZ7PYLTd2i
// key secret= run8FpzGxj2inXlAof6hguxl