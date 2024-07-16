// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('mongodb');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Koneksi MongoDB Native
const MongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb://localhost:27017'; // Ganti dengan URL MongoDB Anda
const dbName = 'produkDB'; // Ganti dengan nama database Anda

let db;

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  db = client.db(dbName);
  console.log('Connected to MongoDB');
});

// Endpoint untuk produk menggunakan MongoDB Native (API v1)
app.get('/api/v1/products', async (req, res) => {
  try {
    const products = await db.collection('products').find({}).toArray();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/v1/products', async (req, res) => {
  const product = req.body;
  try {
    const result = await db.collection('products').insertOne(product);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

app.put('/api/v1/products/:id', async (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  try {
    await db.collection('products').updateOne({ _id: mongodb.ObjectId(id) }, { $set: updatedProduct });
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/v1/products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.collection('products').deleteOne({ _id: mongodb.ObjectId(id) });
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
