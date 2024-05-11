import React from 'react';

function ToggleVisibility({ children, toggleVisibility, isFormVisible, showText }) {
    return (
        <div>
            <button className='btn btn-dark' onClick={toggleVisibility}>
                {isFormVisible ? 'Fechar' : showText}
            </button>
            {isFormVisible && children}
        </div>
    );
}

export default ToggleVisibility;
