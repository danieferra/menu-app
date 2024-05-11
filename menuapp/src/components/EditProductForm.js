import React, { useState, useEffect } from 'react';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function EditProductForm({ productId, onProductUpdated }) {
    const [product, setProduct] = useState({
        nome: '',
        preco: '',
        categoria: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch the product details
    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/produtos/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Could not fetch the product data for editing.');
                }
                return response.json();
            })
            .then(data => {
                setProduct({ nome: data.nome, preco: data.preco, categoria: data.categoria });
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, [productId]);

    // Handle form submission for editing
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/produtos/${productId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: product.nome,
                    preco: product.preco,
                    categoria: product.categoria
                })
            });
            if (!response.ok) {
                throw new Error('Could not update the product.');
            }
            alert("Product updated successfully!");
            onProductUpdated();
        } catch (err) {
            alert(err.message);
        }
    };

    // Update state with form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    return (
        <div className="container mt-5">
            <h1>Edit Product</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="productName">Name:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="productName"
                            name="nome"
                            required 
                            value={product.nome} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productPrice">Price:</label>
                        <input 
                            type="number" 
                            className="form-control"
                            id="productPrice"
                            name="preco"
                            required 
                            value={product.preco} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productCategory">Category:</label>
                        <select 
                            className="form-control"
                            id="productCategory"
                            name="categoria"
                            value={product.categoria} 
                            onChange={handleInputChange}
                            required
                        >
                            <option value="entradas">Entradas</option>
                            <option value="bebidas">Bebidas</option>
                            <option value="pratos">Pratos</option>
                            <option value="sobremesas">Sobremesas</option>
                        </select>
                    </div>
                    <button type="submit" className="btn mt-4 btn-success">Update Product</button>
                </form>
            )}
        </div>
    );
}

export default EditProductForm;
