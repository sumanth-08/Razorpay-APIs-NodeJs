import express from "express";
import createOrder from "./src/controllers/createOrder.js";
import verifyPayment from "./src/controllers/verifySignature.js";
import refundPayment from "./src/controllers/refund.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api/payment/create/order", createOrder);
  app.use("/api/payment/verify", verifyPayment);
  app.use("/api/payment/refund", refundPayment);
};

export default routes;
