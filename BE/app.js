const express = require('express');
const app = express();
const logger = require('morgan');
const mongodb = require('./config/mongodb');
const productRoutes = require('./routes/product_v2/routes');
const cors = require('cors'); 

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongodb.connect().then((client) => {
    const db = client.db('eduwork');
    productRoutes.setDB(db);

    app.use('/api/v2', productRoutes.router);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Gagal menghubungkan ke MongoDB:', err.message);
    process.exit(1); 
});
