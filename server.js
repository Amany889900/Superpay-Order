const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Order = require('./models/orderModel');
const Payment = require('./models/paymentModel');
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:4200' })); // Adjust the origin as needed



// ORDER ROUTES

app.get('/orders', async(req,res)=>{
    try {
       const orders = await Order.find({});
       res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/orders/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const order = await Order.findById(id);
        res.status(200).json(product); 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/orders',async(req,res)=>{
    
    try{

        const order = await Order.create(req.body)
        res.status(200).json(order);

    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update an order
app.put('/orders/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const order = await Order.findByIdAndUpdate(id,req.body);
        // we can not find any order in database
        if(!order){
            return res.status(404).json({message: `can not find any order with ID ${id}`});
        }
        const updatedOrder = await Order.findById(id);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete an order
app.delete('/orders/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const order = await Order.findByIdAndDelete(id);
        // we can not find any order in database
        if(!order){
            return res.status(404).json({message: `can not find any order with ID ${id}`});
        }
        res.status(200).json(order);
       
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// PAYMENT ROUTES


// Create a new payment
app.post('/payments', async (req, res) => {
    try {
        const payment = await Payment.create(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get payment details
app.get('/payments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update payment status
app.put('/payments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByIdAndUpdate(id, req.body, { new: true });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a payment
app.delete('/payments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByIdAndDelete(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


mongoose.connect('mongodb+srv://amanyehab:082003Am@orderapi.d3ybi.mongodb.net/Node-API?retryWrites=true&w=majority&appName=orderAPI')
.then(()=>{
    console.log('connected to MongoDB');
    app.listen(3000, ()=>{
        console.log('Node API app is running on port 3000')
     })
    
}).catch(()=>{
    console.log(error)
})