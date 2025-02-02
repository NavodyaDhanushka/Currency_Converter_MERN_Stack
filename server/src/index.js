const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());

//all currency
app.get("/getAllCurrencies" , async (req, res)=> {

    const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=449a16321566420bbeeef44dbc3f7984`;

    try {
        const namesResponce = await axios.get(nameURL);
        const nameData = namesResponce.data;
    
        return res.json(nameData);
    } catch (err) {
        console.error(err)
        
    }

});

//get target amount
app.get("/convert" , async (req, res) => {
    const {
        date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query

        try {
            const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=449a16321566420bbeeef44dbc3f7984`;

           const dataResponce = await axios.get(dataUrl);
           const rates = dataResponce.data.rates;

           //rates
           const sourceRate = rates[sourceCurrency];
           const targetRate = rates[targetCurrency]; 

           //final target val
           const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
           
           return res.json(targetAmount.toFixed(2));

           
        } catch (err) {
            console.error(err)
        }
})

//listen to a port
app.listen( 5000 , ()=> {
    console.log("Server Started");
});