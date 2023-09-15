const stripe = require("stripe")("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");
const router = require("express").Router()
router.post("/create-checkout-session", async (req, res) => {
    try {
        const { items } = req.body;
      
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: "https://www.google.com", // Redirect to this URL after successful payment
        cancel_url: "https://www.google.com/cancel", // Redirect to this URL if the user cancels
      });
  
      res.json({ url: session.url });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router