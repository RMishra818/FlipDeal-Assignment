const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

//server side values
let taxRate = 5;
let discountPrecentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartValue = newItemPrice + cartTotal;
  //console.log(newItemPrice + ' ' + cartTotal + ' ' + totalCartValue);
  res.send(totalCartValue.toString());
});

app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember;
  let cartTotal = parseFloat(req.query.cartTotal);
  if (isMember === 'true') {
    let discount = (cartTotal * discountPrecentage) / 100;
    let dicountedCartValue = cartTotal - discount;
    res.send(dicountedCartValue.toString());
  }
  res.send(cartTotal.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxPrice = (cartTotal * taxRate) / 100;
  res.send(taxPrice.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let days = 0;
  if (shippingMethod === 'express') {
    days = distance / 100;
  } else {
    days = distance / 50;
  }
  res.send(days.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let cost = weight * distance * 0.1;
  res.send(cost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
