import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const Delete = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v2/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error.message);
            }
        };

        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v2/products/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            alert('Product deleted successfully');
            history.push('/');
        } catch (error) {
            console.error('Error deleting product:', error.message);
            alert('Failed to delete product');
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="main">
            <h2>Delete Produk</h2>
            <p>Apakah Anda yakin ingin menghapus produk ini?</p>
            <div>
                <p><strong>ID:</strong> {product._id}</p>
                <p><strong>Nama:</strong> {product.name}</p>
                <p><strong>Harga:</strong> Rp. {product.price.toLocaleString()}</p>
                <p><strong>Quantity:</strong> {product.quantity}</p>
                <p><strong>Status:</strong> {product.status ? 'Active' : 'Inactive'}</p>
            </div>
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            <button onClick={() => history.push('/')} className="btn btn-secondary">Cancel</button>
        </div>
    );
}

export default Delete;
