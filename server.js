require('dotenv').config()
const express = require('express')
const app = express()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser")
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());


app.post("/api/payment", cors(), async (req, res) => {
  let { amount, id } = req.body
  console.log("amount & id :", amount, id);

  try {
    const payement = await stripe.payementIntents.create({
      amount: amount,
      currency: "eur",
      description: "La description de l'objet acheté",
      payement_method: id,
      confirm: true,
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
