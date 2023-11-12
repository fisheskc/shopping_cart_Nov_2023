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
    totalPurchasesItems: {
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
// Mongoose automatically adds createdAt & updatedAt timestamps to the schema & updates
// the updatedAt timestamp automatically
})

purchaseItemSchema.method.name = function() {
    console.log("Hello there from Purchaseitem")
}

const Purchaseitem = mongoose.model('Purchaseitem', purchaseItemSchema);
module.exports = Purchaseitem;

const storedPurchase = async (name, id) => {
    console.log(`This is item here`)
    let findPurchaseItem = await Purchaseitem.find();
    console.log(`This is findPurchaseItem here`);
    console.log(findPurchaseItem);
    let findName = await Purchaseitem.find().select({name : 1, _id: 0})
    console.log(`This is findName here`)
    
    // if the purchaseitem name does not exist in the DB, add this to the selected items for purchasing
    if(findName !== findName) {
        let purchaseitem = new Purchaseitem({name, quantity, selectedItemPrice});
        return purchaseitem
        // if the purchaseitem name does exist and has quantities, add this to that item
        // cannot get this to work
    } else {
         // how do I make these items undefined here & work with the schema?
        let purchaseitem = new Purchaseitem({name, quantity, selectedItemPrice});
        let findSelectedPrice = await Purchaseitem.find().select({selectedItemPrice: 1, _id: 0})
        console.log(`--------------------This is storedPurchaseName here -----------------------`)
        console.log(findSelectedPrice)
        let findQuantity = await Purchaseitem.find().select({quantity : 1, _id: 0})
        // adding the same item quantity here, if it exits,  
        findQuantity = this.quantity + this.quantity
        console.log("This is findQuantityhere ----------------")
        console.log(findQuantity)

        const order = await Order.findOne()
        console.log(findName)
    }
   
}

storedPurchase()
