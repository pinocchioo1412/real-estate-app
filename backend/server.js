const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Load mock database
let listings = require('./data/listings.json');
let users = require('./data/users.json');

// Thêm route cho trang chủ
app.get('/', (req, res) => {
  res.json({ message: 'Chào mừng đến với API Bất Động Sản' });
});

// GET all listings
app.get('/listings', (req, res) => {
  res.json(listings);
});

// GET a specific listing
app.get('/listings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const listing = listings.find(item => item.id === id);
  
  if (!listing) {
    return res.status(404).json({ error: 'Không tìm thấy bất động sản' });
  }
  
  res.json(listing);
});

// POST a new listing
app.post('/listings', (req, res) => {
  const newListing = { ...req.body, id: Date.now() };
  listings.push(newListing);
  fs.writeFileSync('./data/listings.json', JSON.stringify(listings, null, 2));
  res.status(201).json(newListing);
});

// REGISTER
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const exists = users.find(user => user.email === email);
  if (exists) return res.status(400).json({ error: 'Email đã tồn tại' });
  const hashed = bcrypt.hashSync(password, 8);
  const newUser = { email, password: hashed };
  users.push(newUser);
  fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
  res.status(201).json({ message: 'Đăng ký thành công' });
});

// LOGIN
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);
  if (!user) return res.status(400).json({ error: 'Email không đúng' });
  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Sai mật khẩu' });
  res.json({ message: 'Đăng nhập thành công' });
});

app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));