import React, { useState } from 'react';
import Input from '../../components/Input';
import './index.scss';

const Tambah = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [status, setStatus] = useState(true); 
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/v2/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    price,
                    quantity,
                    status,
                }),
            });
            if (!response.ok) {
                throw new Error('Gagal menyimpan produk');
            }
            alert('Produk berhasil disimpan');
           
            setName('');
            setPrice('');
            setQuantity('');
            setStatus(true);
        } catch (error) {
            console.error('Error saving product:', error.message);
            setErrorMessage('Gagal menyimpan produk. Silakan coba lagi.');
        }
    };

    return (
        <div className="main">
            <div className="card">
                <h2>Tambah Produk</h2>
                <br />
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <Input name="quantity" type="number" placeholder="Quantity Produk..." label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <Input name="status" type="checkbox" label="Active" checked={status} onChange={(e) => setStatus(e.target.checked)} />
                    <button type="submit" className="btn btn-primary">Simpan</button>
                </form>
            </div>
        </div>
    );
}

export default Tambah;
