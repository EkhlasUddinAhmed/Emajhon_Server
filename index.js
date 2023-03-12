const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const productRouter = require("./Routers/ProductRouters");
const customerRouter = require("./AllRouters/CustomerRouter");
app.use(cors());
app.use(express.json());

app.use("/all", productRouter);
app.use('/users',customerRouter);

// Database Connection Starting Here

// DataBase:Emajhon User:EkhlasUddin  PassWord:uXV70fsmUW4JgZ0q
const uri ="mongodb+srv://EkhlasUddin:uXV70fsmUW4JgZ0q@cluster0.13y3n.mongodb.net/Emajhon?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri,config)
.then(()=>{
    console.log("DataBase Connection Successfull");
    app.listen(PORT,()=>{
        console.log(`After Connection DataBase ,Server is Running at PORT :${PORT}`)
    })
})
.catch(error=>console.log(error))
// Database Connection Ending Here

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}
