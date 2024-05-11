import React, { useEffect, useState } from 'react';
import CreateProductForm from "../components/CreateProductForm";
import EditProductForm from "../components/EditProductForm";
import ToggleVisibility from "../components/ToggleVisibility";
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function EditarMenu() {
    const [products, setProducts] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editProductId, setEditProductId] = useState(null);


var editIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>;

var deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_URL}/produtos`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleProductCreatedOrUpdated = () => {
        fetchProducts(); // Re-fetch products to reflect the changes
        setIsFormVisible(false); // Close the form
        setEditProductId(null); // Reset the editing ID
    };

    const startEdit = (productId) => {
        setEditProductId(productId);
        setIsFormVisible(true);
    };

     const deleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`${API_URL}/produtos/${productId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete the product');
                }
                // Refresh the products after deletion
                setProducts(products.filter(product => product._id !== productId));
                alert('Product deleted successfully!');
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Error deleting product.');
            }
        }
    };

    return (
        <div className="centro d-flex align-items-center flex-column justify-content-center">
            <div className="card col-md-6 col-12 p-3">
                <h3>Produtos</h3>
                <ToggleVisibility 
                    showText={editProductId ? "Editar Produto" : "Adicionar Produto"}
                    toggleVisibility={() => setIsFormVisible(!isFormVisible)}
                    isFormVisible={isFormVisible}
                >
                    {editProductId ? (
                        <EditProductForm
                            productId={editProductId}
                            onProductUpdated={handleProductCreatedOrUpdated}
                        />
                    ) : (
                        <CreateProductForm
                            onProductCreated={handleProductCreatedOrUpdated}
                        />
                    )}
                </ToggleVisibility>

                {!isFormVisible && (
                    <div className='holder'>
                    <ul className="list-group mt-4">
                        {products.map((product,index) => (
                            <li key={product._id} className="list-group-item" style={{ backgroundColor: index % 2 === 0 ? 'white' : '#e9e9f9' }}>
                                <div className='d-flex justify-content-between' >
                                    <div>{product.nome} - €{product.preco.toFixed(2)}</div>
                                    <div>
                                            <span onClick={() => startEdit(product._id)} style={{cursor: 'pointer'}}>{editIcon}</span>
                                            <span onClick={() => deleteProduct(product._id)} style={{cursor: 'pointer', marginLeft: '10px'}}>{deleteIcon}</span>
                                        </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditarMenu;
