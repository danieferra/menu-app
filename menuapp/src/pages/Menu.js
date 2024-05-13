import React, { useState, useEffect } from 'react';
import SimpleModal from '../components/SimpleModal';
import ConfirmationModal from '../components/ConfirmationModal';
import FullScreenSpinner from '../components/FullScreenSpinner';
import { Link } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Menu() {
    const [products, setProducts] = useState([]);
    const [notas,setNotas] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState({ visible: false, orderNumber: null });



    useEffect(() => {
        async function fetchProducts() {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/produtos`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json().then(data =>
                    data.map(product => ({
                        ...product,
                        quantity: 0  // Initialize quantity for each product
                    }))
                );
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Update quantity of products
    const updateQuantity = (id, delta) => {
        setProducts(currentProducts =>
            currentProducts.map(product =>
                product._id === id ? { ...product, quantity: Math.max(0, product.quantity + delta) } : product
            )
        );
    };

    // Calculate total quantity of all products
    const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);

    // Group and sort products by category
    const groupedProducts = products.reduce((acc, product) => {
        acc[product.categoria] = acc[product.categoria] || [];
        acc[product.categoria].push(product);
        return acc;
    }, {});

    for (let category in groupedProducts) {
        groupedProducts[category].sort((a, b) => a.nome.localeCompare(b.nome));
    }

    const handleFinalizarClick = () => {
        setIsModalVisible(true);
    };
    
    const handleModalClose = () => {
        setIsModalVisible(false);
    };
    
    const fetchLastOrderNumber = async () => {
        const response = await fetch(`${API_URL}/pedidos/last-number`);
        const data = await response.json();
        return data.lastNumber + 1; // Increment to get the next order number
    };
    
    const handleNotasChange = (event) => {
        setNotas(event.target.value);
    };
    

    
    const handleConfirmOrder = async () => {
        const nextNumber = await fetchLastOrderNumber();
        const order = {
            numero: nextNumber,
            items: products.filter(product => product.quantity > 0).map(product => ({
                produto: product._id, // Assuming 'produto' is the correct field expected by the backend
                quantidade: product.quantity
            })),
            estado: false,
            notas: notas
        };
    
        fetch(`${API_URL}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to save order');
            return response.json();
        })
        .then(data => {
            setIsModalVisible(false); // Close the order modal
            setOrderConfirmation({ visible: true, orderNumber: nextNumber }); // Show confirmation modal with the order number
            // Consider resetting product quantities here if necessary
            setProducts(products.map(p => ({ ...p, quantity: 0 })));
        })
        .catch(error => {
            console.error('Error saving order:', error);
            alert('Failed to save order.');
        });
    };
    
    

    if (isLoading) return <FullScreenSpinner/>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="centro d-flex align-items-center flex-column justify-content-center p-2">
            <div className="card col-md-6 col-12 p-3">
            <Link to={'/home'}><a className='text-dark'>Voltar</a></Link>
                <h2>Produtos</h2>
                <div className='holder'>
                {Object.keys(groupedProducts).map((category) => (
                    <div key={category}>
                        <ul className="list-group my-4">
                            <li className="list-group-item fw-bold text-uppercase">{category}</li>
                            {groupedProducts[category].map((product, index) => (
                                <li key={product._id} className="list-group-item" style={{ backgroundColor: index % 2 === 0 ? 'white' : '#e9e9f9' }}>
                                    {product.nome} - €{product.preco.toFixed(2)}
                                    <div className='buttons' style={{ float: 'right' }}>
                                        <button className='b' onClick={() => updateQuantity(product._id, -1)}>-</button>
                                        <div style={{ display: 'inline-block', width: '18px', textAlign: 'center' }}>{product.quantity}</div>
                                        <button className='b' onClick={() => updateQuantity(product._id, 1)}>+</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <label className='fw-bold'>Notas:</label>
                <textarea className="form-control" onChange={handleNotasChange} rows={4} value={notas}></textarea>
                </div>
                
                <button className='btn btn-dark mt-4' disabled={totalQuantity === 0} onClick={handleFinalizarClick}>
                    Finalizar{totalQuantity > 0 ? ` (${totalQuantity})` : ''}
                </button>
                {isModalVisible && 
                <SimpleModal 
                    onClose={handleModalClose} 
                    products={products} 
                    onSave={handleConfirmOrder}
                />
                }
                {isModalVisible && 
                <SimpleModal onClose={handleModalClose} products={products} onSave={handleConfirmOrder} />
            }
            {orderConfirmation.visible && 
                <ConfirmationModal 
                    orderNumber={orderConfirmation.orderNumber}
                    onClose={() => {
                        setOrderConfirmation({ visible: false, orderNumber: null });
                        window.location.reload(); // Refresh the page or reset form here
                    }}
                />
            }
            </div>
        </div>
    );
}

export default Menu;
