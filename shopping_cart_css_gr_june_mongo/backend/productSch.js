const mongoose = require('mongoose');
const PurchaseItemSch = require('./purchaseItemSch');
const Schema = mongoose.Schema;
// let productName = document.getElementById("id-name");

const productSchema = new Schema({
    name: {
       type: String
    },
    price: {
        type: Number
    }, 
    purchaseItem: {
        type: Schema.Types.ObjectId,
        ref: 'PurchaseItem'
    } 
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

