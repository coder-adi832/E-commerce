const dotenv = require('dotenv');
dotenv.config();

const port = 4000;

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload API
app.post('/upload', upload.single('product'), async (req, res) => {
  try {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);

    res.json({ success: 1, image_url: result.secure_url });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ success: 0, message: 'Upload failed' });
  }
});



// Product Schema
const Product = mongoose.model('Product', {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now },
  quantity: { type: Number, required: true },
});

// User Schema
const Users = mongoose.model('User', {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cart_data: { type: Object },
  date: { type: Date, default: Date.now },
});

// Add product
app.post('/addproduct', async (req, res) => {
  const products = await Product.find({});
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    quantity: req.body.quantity,
  });

  await product.save();
  res.json({ success: true, product });
});

// Remove product
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
});

// Get all products
app.get('/allproducts', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// Register user
app.post('/signup', async (req, res) => {
  const oldUser = await Users.findOne({ email: req.body.email });
  if (oldUser) return res.status(400).json({ message: 'Email already exists' });

  const cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const newUser = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cart_data: cart,
  });

  await newUser.save();

  const token = jwt.sign({ user: { id: newUser.id } }, 'secret_ecom');
  res.json({ success: true, token });
});

// User login
app.post('/userlogin', async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.json({ success: false, message: 'Wrong email' });

  if (req.body.password === user.password) {
    const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: 'Wrong password' });
  }
});

// Get new collections
app.get('/newcollections', async (req, res) => {
  const newProducts = await Product.find({}).sort({ date: -1 }).limit(8);
  res.json(newProducts);
});

// Add to cart
app.post('/addtocart', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const user = await Users.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (!user.cart_data) user.cart_data = {};
  user.cart_data[productId] = (user.cart_data[productId] || 0) + quantity;

  await user.save();
  res.json({ success: true, cart_data: user.cart_data });
});

// Remove from cart
app.post('/removefromcart', async (req, res) => {
  const { userId, productId } = req.body;

  const user = await Users.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.cart_data && user.cart_data[productId]) {
    delete user.cart_data[productId];
    await user.save();
  }

  res.json({ success: true, cart_data: user.cart_data });
});

// Checkout — clear cart
app.post('/checkout', async (req, res) => {
  const { userId } = req.body;

  const user = await Users.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.cart_data = {};
  await user.save();

  res.json({ success: true, message: 'Checkout complete, cart cleared.' });
});

// Create payment intent (Stripe)
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'inr',
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
