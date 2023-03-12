const express = require("express");
const customerRouter = express.Router();
const customerSchema = require("../Schemas/CustomerSchema");
const mongoose = require("mongoose");
const customerModel = new mongoose.model("Customer", customerSchema);

customerRouter.post("/addUser", async (req, res) => {
  try {
    const customerInstance = new customerModel(req.body);
    const addedCustomer = await customerInstance.save();
    res.status(200).send(addedCustomer);
    console.log("New Customer is:", addedCustomer);
  } catch (error) {
    res.status(500).send({ Error: error.message });
    console.log("Server Sided Error is Adding New Customer:", addedCustomer);
  }
});

customerRouter.get("/total", async (req, res) => {
  try {
    const totalCustomer = await customerModel.countDocuments();
    console.log("Total Customers are:", totalCustomer);
    res.status(200).send({ totalCustomer });
  } catch (err) {
    console.log("Server Sided Error in Counting ");
    res.status(500).send({ error: err.message });
  }
});

customerRouter.get("/all", async (req, res) => {
  try {
    const page = req.query.page;
    const gotCustomer = await customerModel
      .find()
      .limit(3)
      .skip(page * 3);
    res.status(200).send(gotCustomer);
    // console.log("Customer Got", gotCustomer);
  } catch (error) {
    res.status(500).send({ error: error.message });
    // console.log("Customer Got Error in Server", { error: error.message });
  }
});
customerRouter.get("/customers", async (req, res) => {
  try {
    const gotCustomers = await customerModel.find();
    res.status(200).send(gotCustomers);
    // console.log("Customer Got", gotCustomers);
  } catch (error) {
    res.status(500).send({ error: error.message });
    // console.log("Customer Got Error in Server", { error: error.message });
  }
});

customerRouter.delete("/delete/:customerID", async (req, res) => {
  try {
    const { customerID } = req.params;
    const deletedCustomer = await customerModel.findOneAndDelete(
      { _id: customerID },
      { useFindOneAndDelete: false }
    );

    res.status(200).send(deletedCustomer);
    console.log("Deleted Customer is:", deletedCustomer);
  } catch (error) {
    res.status(500).send({ Error: error.message });
    console.log("Server Error in Deleting Customer:");
  }
});

customerRouter.put("/updateCustomer/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Customer in req.body is:", req.body);
    console.log("Updated Customer Id is:", id);
    const updatedCustomer = await customerModel.findOneAndUpdate(
      { _id: id },
      {
        $set: req.body,
      },
      {
        new: true,
        useFindOneAndUpdate: false,
      }
    );
    res.status(200).send(updatedCustomer);
    console.log("Updated new customer is:", updatedCustomer);
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log("Update customer Error:");
  }
});

module.exports = customerRouter;
