const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// const { MongoStore } = require('connect-mongo');
// const session = require('express-session')
// const MongoStore = require('connect-mongo');
// const MongoStore = require('connect-mongo')(session);
// const ejsMate = require('ejs-mate');
const ejsMate = require('ejs');
const methodOverride = require('method-override');
const Product = require('./backend/productSch');
const Purchaseitem = require('./backend/purchaseItemSch');
const Order = require('./backend/orderSch');
const { v4: uuidv4 } = require('uuid');

// const dbUrl = 'mongodb://127.0.0.1:27017/shoppingcart'

mongoose.connect('mongodb://127.0.0.1:27017/shoppingcart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true
    
})

// const store = new MongoStore({
//     url: dbUrl,
//     secret: 'thisshouldbeabettersecret!',
//     touchAfter: 24 * 60 * 60
// });

// store.on("error",function(e) {
//     console.log("Session store error", e)
// })

// const sessionConfig = {
//     store,
//     name: 'session',
//     secret: 'thisshouldbeabettersecret!',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }

// app.use(session(sessionConfig))

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

// view directory of EJS
// app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.set('trust proxy', 1);

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'));


// app.get('/', (req,res) => {
//     res.send("User session")
// })

// localhost:3000 - home page
app.get('/', (req, res) => {
    res.render('home')
})

// display the product to the webpage, {products} - this will render
// the products to the webpage
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', {products})
    // res.send('New here')
})

app.get('/products/new', async (req, res) => {
    res.render('products/new')
    // res.send('New here')
})

app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('purchaseItem')
    const purchaseitems = await Purchaseitem.find({ product: product }, 'quantity');
    // const product = await Product.findById(req.params.id).populate('purchaseitem').exec()
    // const product = await Product.findById(req.params.id).populate({path: 'purchaseitem', populate:'quantity'})
    console.log("This Get product ID")
    console.log(product)
    res.render('products/show', {product, purchaseitems})
    // res.send('New here')
})

app.post('/products', async(req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/products')
})

// this shows the purchaseitem on products show.ejs
app.get('/products/:id/purchaseitems/purchaseNew', async (req, res) => {
    const {id} = req.params
    console.log("This is purchaseitem new here")
    console.log(id)
    const product = await Product.findById(id)
    console.log(product)
    // res.send('New here')
    res.render('purchaseitems/purchaseNew', {product})
    // res.send('New purchaseitems here')
})

app.post('/products/:id/purchaseitems', async(req, res) => {
    const {id} = req.params;
    console.log("This is the id of the product")
    console.log(id)
    const product = await Product.findById(id);
    console.log("This is product");
    console.log(product)
    console.log("This is product id");
    console.log(product._id)
    const {name, price, quantity} = req.body;
    // const {name, price, quantity, createdDateAt} = req.body;
    // const purchaseitem = new Purchaseitem({price, quantity});
    const order = await Order.findOne()
    console.log("This is the order")
    console.log(order)
    // // Tell Mongoose to set `createdAt`, but skip `completedAt`
    // This url = https://mongoosejs.com/docs/timestamps.html#:~:text=Mongoose%20schemas%20support%20a%20timestamps,this%20document%20was%20last%20updated
    // const order = new Order({ timestamps: { createdDateAt: true, updatedDateAt: false } })
    // console.log("This is order date for the purchaseitem")
    // console.log(order)
    console.log("This is purchaseItemById")
    // Existing purchaseitem is found
    const purchaseItemById = await Purchaseitem.findOne({'product':id})
    console.log(purchaseItemById)
  
    // Price if individual item here
    let selectedItemPrice = product.price * quantity
    
    //Need price for multiple order of item
    // if statement: if item is undefined, need new object
    // const orderId = order._id;
    console.log("------------------------------------------------")
    
    // This everything in the Purchaseitem schema
  
    console.log("This is purchaseitem, creating a link to order id")
    let purchaseitem = new Purchaseitem({quantity, product, selectedItemPrice, order});
    purchaseitem.name = product.name;
   
    console.log(purchaseitem)
    // await order.save();
    await product.save();
    await purchaseitem.save();

   let findSelectedPrice = await Purchaseitem.find().select({selectedItemPrice: 1, _id: 0})
//    let findSelectedPrice = await Purchaseitem.find({}, 'findSelectedPrice')
   console.log(`This is findSelectedPrice`) 
   console.log(findSelectedPrice) 

   let totalPurchasesItems = findSelectedPrice.reduce((acc, item) => {
   return acc + item.selectedItemPrice
   }, 0)
  
   console.log("This is totalPurchasesItems")
   console.log(totalPurchasesItems)
//    let totalPurchasesItems = Object.values(findSelectedPrice).map((item) => {
//     return item + item
//    })
//    console.log("This is totalPurchasesItems")
//    console.log(totalPurchasesItems)
//    return totalPurchasesItems
    // console.log(`This is orderId`)
    // console.log(orderId)
    
    // res.send(purchaseitem)
    res.redirect(`/products/${id}`)
})


app.get('/purchaseitems', async (req, res) => {
    const purchaseitems = await Purchaseitem.find({})
    console.log(purchaseitems)
    res.render('purchaseitems/index', {purchaseitems})
    // res.send('Show page here')
})

app.get('/purchaseitems/:id', async (req, res) => {
    const order = await Order.findById(req.params.id).populate('order')
    // const purchaseitems = await Purchaseitem.find({order: order}, 'createdDateAt')
    
    res.render('purchaseitems/show')
    // res.send('Show page here')
})

app.listen(3000, () => {
    console.log("App is listening on Port 3000")
})



















