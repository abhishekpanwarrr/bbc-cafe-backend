import express from "express";
const router = express.Router();
import stripePackage from "stripe";

const stripe = stripePackage(
  "sk_test_51HQwePHYJlX07yeuB38UUE9R0jEPbiPhnIgVRK2glxVUk7mhLo4C4bkb0EjylgCIWJmRTFQ787r58QZ061c94Vid00HheYJ52c"
);
router.post("/intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});
export default router;
