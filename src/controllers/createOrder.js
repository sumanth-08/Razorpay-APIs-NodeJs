import { Router } from "express";
import pkg from "razorpay";
const Razorpay = pkg;
const router = Router();

router.post("/", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.YOUR_KEY_ID,
      key_secret: process.env.YOUR_SECRET,
    });

    const { amount } = req.body;

    await instance.orders
      .create({
        amount: Math.floor(parseInt(amount) * 100),
        currency: "INR",
        receipt: "receipt#1",
        notes: {
          key1: "value3",
          key2: "value2",
        },
      })
      .then((order) => {
        return res.status(200).send(order);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    console.log(err.message);
    return res.send("something went wrong");
  }
});

export default router;
