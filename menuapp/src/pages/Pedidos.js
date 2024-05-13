import React, { useState, useEffect } from "react";
import FullScreenSpinner from "../components/FullScreenSpinner";
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch pedidos
  const fetchPedidos = () => {
    fetch(`${API_URL}/pedidos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPedidos(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPedidos();  // Fetch immediately on component mount
    const intervalId = setInterval(fetchPedidos, 10000);  // Set up the interval to fetch pedidos every 10 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const updateStatus = async (id) => {
    setIsLoading(true);
    fetch(`${API_URL}/pedidos/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: true })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not update the order status');
        }
        return response.json();
    })
    .then(() => {
        setIsLoading(false);
        // Update the local state to reflect the change
        setPedidos(pedidos.map(pedido => 
            pedido._id === id ? { ...pedido, estado: true } : pedido
        ));
    })
    .catch(error => {
        console.error("Error updating status: ", error);
        setError(error.message);
        setIsLoading(false);
    });
};

  if (isLoading) return <FullScreenSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="centro d-flex align-items-center flex-column justify-content-center">
      <div className="card col-md-6 col-12 p-3">
      <Link to={'/home'}><a className='text-dark'>Voltar</a></Link>
        <h2>Pedidos</h2>
        <div className="holder">
            <table className="table table-striped">
            <thead>
                <tr>
                <th>Nº</th>
                <th>Items</th>
                <th>Status</th>
                <th>Notas</th>
                <th>Data</th>
                <th>Acções</th>
                </tr>
            </thead>

            <tbody>
    {pedidos.map(pedido => (
        <tr key={pedido._id}>
            <td className="fw-bold">{pedido.numero}</td>
            <td>
                {pedido.items.map((item, index) => (
                    <div key={index}>
                        {item.quantidade}x {item.produto ? item.produto.nome : 'Product ID: ' + item.produto} <br/>
                    </div>
                ))}
            </td>
            <td>
                <span style={{ fontWeight: 'bold', color: pedido.estado ? 'green' : 'red' }}>
                    {pedido.estado ? 'Entregue' : 'Por fazer'}
                </span>
            </td>
            <td>{pedido.notas}</td>
            <td>{new Date(pedido.createdAt).toLocaleString()}</td>
            <td>
                {!pedido.estado && (
                    <button className="btn btn-sm btn-success" onClick={() => updateStatus(pedido._id)}>
                        Marcar como Entregue
                    </button>
                )}
            </td>
        </tr>
    ))}
</tbody>

            </table>
        </div>
      </div>
    </div>
  );
}

export default Pedidos;
