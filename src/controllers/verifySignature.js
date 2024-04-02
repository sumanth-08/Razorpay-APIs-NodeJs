import { Router } from "express";
const router = Router();
import * as crypto from "crypto";

router.post("/", async (req, res) => {
  try {
    let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    let expectedSignature = crypto
      .createHmac("sha256", process.env.YOUR_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("signatureByClient", req.body.razorpay_signature);
    console.log("expectedSignature", expectedSignature);
    
    let verifySignatureResponse = false;

    if (expectedSignature === req.body.razorpay_signature) {
      verifySignatureResponse = true;
    }

    return res.json({
      response: verifySignatureResponse,
    });
  } catch (err) {
    console.log(err.message);
    return res.send("something went wrong");
  }
});

export default router;
