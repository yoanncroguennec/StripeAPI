require('dotenv').config()
const express = require('express')
const app = express()
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);
const bodyParser = require("body-parser")
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());


app.post("/api/payment", cors(), async (req, res) => {
  let { amount, id } = req.body
  console.log("amount & id :", amount, id);
const stripeToken = req.body.stripeToken;
  try {
    const payement = await stripe.charges.create({
      amount: 2000,
      currency: "eur",
      description: "La description de l'objet acheté",
      // payement_method: id,
      // confirm: true,
      source: stripeToken,
    })
    res.json({
      message: "Payement réussi",
      success: true,
    }) 
  } catch (error) {
    console.log("erreur", error);
    res.json({
      message: "Payement échoué",
      success: false,
    })   
  }
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started in ${process.env.PORT } mode.`);
});
