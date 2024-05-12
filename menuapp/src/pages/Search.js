import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [numero, setNumero] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate(); // Use navigate for programmatic navigation

    const handleChangeNumero = (event) => {
        const value = event.target.value;
        setNumero(value);
        setIsButtonDisabled(value === ''); // Disable button if input is empty
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
                        onKeyDown={(event) => {
                            // List of allowed key values besides numeric digits
                            const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Delete'];
                          
                            // Check if the key pressed is not a digit and not an allowed key
                            if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
                              event.preventDefault();
                            }
                          }}
                    />
                    <button
                        className="btn btn-dark mt-4"
                        onClick={handleSearch}
                        disabled={isButtonDisabled}
                    >
                        Procurar
                    </button>
                </div>
            </div>
        </>
    );
}

export default Search;
