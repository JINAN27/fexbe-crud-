import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Home = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/v2/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`/api/v2/products/${productId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            alert('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error.message);
            alert('Failed to delete product');
        }
    };

    return (
        <div className="main">
            <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
            <div className="search">
                <input type="text" placeholder="Masukkan kata kunci..." />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th className="text-right">Price</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td className="text-right">{`Rp. ${product.price}`}</td>
                            <td className="text-center">
                                <Link to={`/detail/${product._id}`} className="btn btn-sm btn-info">Detail</Link>
                                <Link to={`/edit/${product._id}`} className="btn btn-sm btn-warning">Edit</Link>
                                <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
