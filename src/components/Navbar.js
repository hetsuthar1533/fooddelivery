import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Modal from '../Model';
import Cart from '../screens/Cart';
import { useCartDispatch, useCart } from './contexReducer';


function Navbar() {
  let data = useCart();

  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate()
  const userName = localStorage.getItem("userName");
  console.log(userName);



  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // window.location.href = "/";
    // useNavigate('/')
    navigate('/login')


  }
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-success">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 fst-italic" to="/">Go Food</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                </li>
                {(localStorage.getItem("authToken")) ?
                  <li className="nav-item">
                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                  </li>
                  : ""}
              </ul>
              {(!localStorage.getItem("authToken")) ?
                <div className='d-flex'>
                  {/* <div>   </div> */}
                  <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                  <Link className="btn bg-white text-success mx-1 " to="/createuser">Signup</Link>
                </div>
                :
                <div>
                  <span className="text-white mx-2">Hello, {userName}!</span>

                  <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                    My Cart {''}
                    <Badge pill bg='danger'>{data.items.length}</Badge>
                  </div>
                  {cartView ? <Modal onClose={() => { setCartView(false) }} ><Cart /></Modal> : null}
                  <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout</div>
                </div>
              }
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar;
