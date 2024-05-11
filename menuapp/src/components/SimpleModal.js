function SimpleModal({ onClose, products, onSave }) {
    const totalPrice = products.reduce((total, product) => total + product.preco * product.quantity, 0);

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-content" style={{ margin: '15% auto', padding: '20px', border: '1px solid #888', width: 'fit-content' }}>
                
                <h2>Confirmar pedido</h2>
                <ul>
                    {products.filter(product => product.quantity > 0).map(product => (
                        <li key={product._id}>{product.quantity}x {product.nome} - Subtotal: €{(product.preco * product.quantity).toFixed(2)}</li>
                    ))}
                </ul>
                <p>Total Price: €{totalPrice.toFixed(2)}</p>
                <div className="d-flex w-100 justify-content-between">
                    <button className="btn btn-danger mr-2" onClick={onClose} >Retroceder</button>
                    <button className="btn btn-dark ml-2" onClick={onSave}>Confirmar</button>
                </div>
            </div>
        </div>
    );
}

export default SimpleModal;