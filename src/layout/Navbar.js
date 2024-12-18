import React from 'react'
export default function Navbar() {
  return (
    <div style={{position:"fixed", top:0, width:"100%",zIndex:999}}>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <h3 style={{fontFamily:"Pacifico"}}>Ticket System</h3>
                </a>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <button className='btn btn-outline-dark'>
                    <h6>Login</h6></button>
            </div>
        </nav>        
    </div>
  )
}
