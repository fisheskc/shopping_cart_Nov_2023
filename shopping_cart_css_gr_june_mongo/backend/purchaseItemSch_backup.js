const mongoose = require('mongoose');
const Product = require('./productSch');
const Order = require('./orderSch');
const Schema = mongoose.Schema;

const purchaseItemSchema = new Schema({
    name: {
        type: String
    },
    quantity: {
        type: Number
    },
    selectedItemPrice: {
        type: Number
    },


    product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
    }, 
    order: {
            type: Schema.Types.ObjectId,
            ref: 'Order'
    }
    
}, { timestamps: true })

const Purchaseitem = mongoose.model('Purchaseitem', purchaseItemSchema);
module.exports = Purchaseitem;



// For queries with timestamps, Mongoose adds 2 properties to each update query:

// Add updatedAt to $set
// Add createdAt to $setOnInsert
// mongoose.set('debug', true);

// const userSchema = new Schema({
//   name: String
// }, { timestamps: true });
// const User = mongoose.model('User', userSchema);

// await User.findOneAndUpdate({}, { name: 'test' });

// You'll see the below output from Mongoose debug mode:
// Mongoose: users.findOneAndUpdate({}, { '$setOnInsert': { createdAt: new Date("Sun, 27 Feb 2022 00:26:27 GMT") }, '$set': { updatedAt: new Date("Sun, 27 Feb 2022 00:26:27 GMT"), name: 'test' }}, {...})