import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../components/Input';


const Edit = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        quantity: 0,
        status: true,
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/v2/products/${id}`);
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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/v2/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            alert('Product updated successfully');
            // Redirect or handle success as needed
        } catch (error) {
            console.error('Error updating product:', error.message);
            alert('Failed to update product');
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setProduct({
            ...product,
            [name]: newValue,
        });
    };

    return (
        <div className="main">
            <div className="card">
                <h2>Edit Product</h2>
                <br />
                <form onSubmit={handleFormSubmit}>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Product Name..."
                        label="Name"
                        value={product.name}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="price"
                        type="number"
                        placeholder="Product Price..."
                        label="Price"
                        value={product.price}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="quantity"
                        type="number"
                        placeholder="Product Quantity..."
                        label="Quantity"
                        value={product.quantity}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="status"
                        type="checkbox"
                        label="Active"
                        checked={product.status}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
