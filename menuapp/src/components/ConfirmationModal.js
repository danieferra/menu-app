function ConfirmationModal({ orderNumber, onClose }) {
    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-content" style={{ margin: '15% auto', padding: '20px', border: '1px solid #888', width: '80%' }}>
                <h4 className="text-center">Pedido Confirmado</h4>
                <p style={{fontSize:'xx-large',textAlign:'center'}}>{orderNumber}</p>
                <button className="btn btn-dark" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ConfirmationModal;