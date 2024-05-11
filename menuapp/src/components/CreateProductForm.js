import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function CreateProductForm({onProductCreated}) {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState('entradas');

    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = { nome, preco, categoria };

        try {
            const response = await fetch(`${API_URL}/produtos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const data = await response.json();
            console.log('Product created:', data);
            // Clear form fields after successful submission
            setNome('');
            setPreco('');
            setCategoria('entradas');
            alert("Product successfully added!");
            onProductCreated();

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container mt-5">
    <h1>Criar Novo Produto</h1>
    <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
            <label htmlFor="productName">Nome:</label>
            <input 
                type="text" 
                className="form-control" 
                id="productName"
                required 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
            />
        </div>
        <div className="form-group my-2">
            <label htmlFor="productPrice">Preço:</label>
            <input 
                type="number" 
                className="form-control"
                id="productPrice"
                required 
                value={preco} 
                onChange={(e) => setPreco(e.target.value)} 
            />
        </div>
        <div className="form-group my-2">
            <label htmlFor="productCategory">Categoria:</label>
            <select 
                className="form-control"
                id="productCategory"
                value={categoria} 
                onChange={(e) => setCategoria(e.target.value)}
                required
            >
                <option value="entradas">Entradas</option>
                <option value="bebidas">Bebidas</option>
                <option value="pratos">Pratos</option>
                <option value="sobremesas">Sobremesas</option>
            </select>
        </div>
        <button type="submit" className="btn btn-dark mt-2">Adicionar</button>
    </form>
</div>

    );
}

export default CreateProductForm;
