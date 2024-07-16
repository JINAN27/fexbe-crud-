import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';
const Detail = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);

    useEffect(() => {
        console.log("Fetching product with ID:", id);
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v2/products/${id}`);
                const responseText = await response.text();
                console.log('Response status:', response.status);
                console.log('Response text:', responseText);

                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }

                const data = JSON.parse(responseText);
                console.log("Product data received:", data);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error.message);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div className="main">
            <h2>Detail Produk</h2>
            {product ? (
                <div>
                    <p><strong>ID:</strong> {product._id}</p>
                    <p><strong>Nama:</strong> {product.name}</p>
                    <p><strong>Harga:</strong> Rp. {product.price.toLocaleString()}</p>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p><strong>Status:</strong> {product.status ? 'Active' : 'Inactive'}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Detail;
