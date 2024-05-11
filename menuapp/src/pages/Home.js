import React from 'react';
import { Link } from 'react-router-dom'


function Home() {
    
    return (
        <div className="centro d-flex align-items-center flex-column justify-content-center p-2">
            <div className="card col-md-6 col-12 p-3">
                <div className='row'>
                <Link to={'/editarMenu'} className='col-6' style={{padding:'10px',textAlign:'center',textDecoration:'none',color:'#1e1e1e',fontWeight:'bold'}}>
                <div style={{backgroundColor:'#efefef',padding:'20px',borderRadius:'12px'}}>Editar Menu</div>
                </Link>
                <Link to={'/pedir'} className='col-6' style={{padding:'10px',textAlign:'center',textDecoration:'none',color:'#1e1e1e',fontWeight:'bold'}}>
                <div style={{backgroundColor:'#efefef',padding:'20px',borderRadius:'12px'}}>Registar pedidos</div>
                </Link>
                <Link to={'/verpedidos'} className='col-6' style={{padding:'10px',textAlign:'center',textDecoration:'none',color:'#1e1e1e',fontWeight:'bold'}}>
                <div style={{backgroundColor:'#efefef',padding:'20px',borderRadius:'12px'}}>Ver pedidos</div>
                </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
