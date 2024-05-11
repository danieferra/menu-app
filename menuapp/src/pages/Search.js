import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [numero, setNumero] = useState('');
    const navigate = useNavigate(); // Use navigate for programmatic navigation

    const handleChangeNumero = (event) => {
        setNumero(event.target.value);
    };

    useEffect(() => {
        // Dynamically load the Lordicon library
        const script = document.createElement('script');
        script.src = "https://cdn.lordicon.com/lordicon.js";
        script.async = true;
        document.body.appendChild(script);
        
        // Clean up the script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSearch = () => {
        // Navigate to the Waiting component with state
        navigate('/waiting', { state: { pedidoNumero: numero } });
    };

    return (
        <>
            <div className="centro d-flex align-items-center flex-column justify-content-center">
                <div className="text-center d-flex flex-column align-items-center">
                    <lord-icon
                        src="https://cdn.lordicon.com/tzcxtdxq.json"
                        trigger="loop"
                        delay="1500"
                        style={{ width: "100px", height: "100px" }}
                    ></lord-icon>
                    <p className="fw-bold text-dark">Relaxa <br/> enquanto preparamos o teu pedido...</p>
                    <input
                        className="form-control text-center"
                        onChange={handleChangeNumero}
                        value={numero}
                        placeholder='Nº do pedido'
                    />
                    <button className="btn btn-dark mt-4" onClick={handleSearch}>Procurar</button>
                </div>
            </div>
        </>
    );
}

export default Search;
