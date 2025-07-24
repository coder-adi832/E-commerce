const dotenv = require('dotenv');          
dotenv.config();

const port = 4000;

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { DefaultDeserializer } = require("v8");



app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));


//image storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

// upload function using multer

const upload = multer({storage:storage})

// creating upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'), (req,res)=>{
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
})

//creating schema for creating products

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  image: {   
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  available: {
    type: Boolean,
    default: true,
  },
})

//user scheema

const Users = mongoose.model('user',{
    name:{
      type: String,
    },
    email:{
      type: String,
      unique: true
    },
    password:{
      type: String,
    },
    cart_data:{
      type: Object,
    },
    date:{
      type: Date,
      default: Date.now
    }
})

app.post('/addproduct', async (req, res) => {
  let products = await Product.find({})
  let id
  if (products.length > 0) {
    let last_product_array = products.slice(-1)
    let last_product = last_product_array[0]
    id = last_product.id + 1
  } else {
    id = 1
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image, 
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  })

  console.log(product)

  await product.save()
  console.log("Saved")

  res.json({
    success: true,
    product: product,
  })
})

// Creating API for delelting products

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

// creating API for getting all products

app.get('/allproducts', async(req,res)=>{
    let products = await Product.find({})
    console.log("All products Fetched")
    res.send(products);
})

// endpoint for register user

app.post('/signup', async(req,res) =>{
    const oldUser = await Users.findOne({email: req.body.email})
    if(oldUser) return res.status(400).json({message: "Email already exixts"})

    let cart = {};
    for(let i =0;i<300;i++){
      cart[i] = 0;
    }

    const newUser = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cart_data: cart
    })

    await newUser.save()

    const data = {
      user: {
        id : newUser.id
      }
    }

    const token = jwt.sign(data,'sceret_ecom')

    res.json({success: true, token})
})

// endpoint for user login

app.post('/userlogin', async(req,res)=>{
    const user = await Users.findOne({email: req.body.email})

    if(user){
      const compare = req.body.password === user.password

      if(compare){
           const data = {
              user: {
              id : user.id
            }
          }

          const token = jwt.sign(data,'sceret_ecom')

          res.json({success: true, token})
        } else {
          res.json({success: false, message: "wrong password" })
          
        }
      } else {
          res.json({success: false, message: "wrong email" })
    }
})

// Get 8 most recent products
app.get('/newcollections', async (req, res) => {
  try {
    const newProducts = await Product.find({})
      .sort({ date: -1 })   // sort by date descending
      .limit(8);            // get top 8

    res.json(newProducts);
  } catch (error) {
    console.error("Error fetching new collections:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post('/addtocart', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const user = await Users.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If cart_data is null, make it an empty object
    if (!user.cart_data) user.cart_data = {};

    // If the product already exists, increment its quantity
    user.cart_data[productId] = (user.cart_data[productId] || 0) + quantity;

    await user.save();

    res.json({ success: true, cart_data: user.cart_data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post('/removefromcart', async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await Users.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.cart_data && user.cart_data[productId]) {
      delete user.cart_data[productId];
      await user.save();
    }

    res.json({ success: true, cart_data: user.cart_data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.post('/checkout', async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await Users.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart_data = {}; // clear cart

    await user.save();
    res.json({ success: true, message: "Checkout complete, cart cleared." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port" +port)
    }
    else{
        console.log("Eroor : "+error)
    }
})

