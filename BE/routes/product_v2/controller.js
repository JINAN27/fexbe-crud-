const { ObjectId } = require('mongodb');
let db;

const setDB = (_db) => {
    db = _db;
};

const index = async (req, res) => {
    try {
        const products = await db.collection('products').find().toArray();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const view = async (req, res) => {
    try {
        const product = await db.collection('products').findOne({ _id: new ObjectId(req.params.id) });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const store = async (req, res) => {
    try {
        const { name, price, quantity, status } = req.body;
        const image = req.file;
        const newProduct = {
            name,
            price,
            quantity,
            status,
            image_url: image ? image.path : null
        };
        const result = await db.collection('products').insertOne(newProduct);
        res.status(201).json({ _id: result.insertedId, ...newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { name, price, quantity, status } = req.body;
        const image = req.file;
        const updateProduct = {
            name,
            price,
            quantity,
            status,
            image_url: image ? image.path : null
        };
        const result = await db.collection('products').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updateProduct }
        );
        if (result.matchedCount === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const result = await db.collection('products').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { setDB, index, view, store, update, destroy };
