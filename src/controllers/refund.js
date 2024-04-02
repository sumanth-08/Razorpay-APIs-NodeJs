import { Router } from "express";
const router = Router();
import pkg from "razorpay";
const Razorpay = pkg;

router.post("/", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.YOUR_KEY_ID,
      key_secret: process.env.YOUR_SECRET,
    });

    const { payment_id } = req.body;

    await instance.payments
      .refund(payment_id, {
        //   amount: 100,  // full amount will refunded
        speed: "normal", // optimum
        //   notes: {
        //     notes_key_1: "Beam me up Scotty.",
        //     notes_key_2: "Engage",
        //   },
        //   receipt: "Receipt No. 31",
      })
      .then((refund) => {
        return res.status(200).send(refund);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("something went wrong");
  }
});

export default router;
