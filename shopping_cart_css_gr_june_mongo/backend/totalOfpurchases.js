
// totalOfPurchases function here

// module.exports.purchaseItemSchema = async(req, res, item,id) => {
//     let storedPurchase = await Purchaseitem.findById(id);
//     console.log("This is storedPurchase here")
//     console.log(storedPurchase)
//     let purchaseItem = await Purchaseitem(req.body.id);
//     let findSelectedPrice = await Purchaseitem.find().select({selectedItemPrice: 1, _id: 0})
//     const product = await Product.findById(id);
//     const order = await Order.findOne()

    // let sumTotalPurchasesItems = () => {
    //     let totalPurchasesItem = findSelectedPrice.reduce((acc, item) => {
    //     return acc + item.selectedItemPrice
    //     }, 0)
    //     console.log("This is totalPurchasesItem")
    //     console.log(totalPurchasesItem)
    //     return totalPurchasesItem; 
    // }
  
    // find the purchaseitem/does it exist?
    // if(!purchaseItem) {
    //     let totalPurchasesItems = sumTotalPurchasesItems() 
    //     // a new instance of Purchaseitem is created here & totalPurchasesItems is added to the PurchasesItems DB
    //     let purchaseitems = new Purchaseitem({quantity, product, selectedItemPrice, order, totalPurchasesItems});
    //     purchaseitems.name = product.name;
    //     // await order.save();
    //     await product.save();
    //     return purchaseitems.save();
    // }
// }


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