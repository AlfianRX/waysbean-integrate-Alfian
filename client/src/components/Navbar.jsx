import { React, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom'

import { UserContext } from "../context/userContext"

import logo from "../assets/img/waysbean_logo.png"
import iconCart from "./../assets/img/cart_icon.png"
import logoutIcon from "./../assets/img/logout_icon.png"
import { useQuery } from "react-query"
import { API } from "../config/api"


function Navbar() {

  

  const [state, dispatch] = useContext(UserContext);

  let { data: cartData } = useQuery('cartUserIdCache', async () => {
    const response = await API.get('/carts-userid');
    return response.data.data
  });

  const carts = cartData?.filter((item) => {
    return item.transaction_id === null
  });

  const isLogin = state.isLogin
  const isAdmin = state.user.status === 'admin' ? true : false;

  let navi = useNavigate()

  const logout = () => {
    console.log(state)
    dispatch({
        type: "LOGOUT"
    })
    navi("/")
}

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white fixed-top shadow">
        <div className="container-lg">
          <Link className="navbar-brand me-5" to="/">
            <img src={logo} style={{ height: 60 }} alt="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon bg-pink"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {isLogin ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 position-relative ">

                {isAdmin ? (
                  <li className="nav-item dropdown">
                    <div role="button" className="rounded-circle nav-photo ms-3" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundImage: `url(${state.user.profile.image})` }}>
                    </div>
                    <div className="dropdown-menu">
                      <div className="menu-drop" style={{ width: 300 }}>
                        <div>
                          <Link to='/add-product' className="d-flex align-items-center p-3">
                            <img src={'https://res.cloudinary.com/alfiancloud/image/upload/v1662225694/waysbean/qxeof7sumr8obxopnhzs.png'} alt="profile icon" />
                            <p className="ms-3">Add Product</p>
                          </Link>
                          <Link to='/product-list' className="d-flex align-items-center p-3">
                            <img src={'https://res.cloudinary.com/alfiancloud/image/upload/v1662225694/waysbean/qxeof7sumr8obxopnhzs.png'} alt="profile icon" />
                            <p className="ms-3">List Product</p>
                          </Link>
                        </div>

                        <span className="d-flex align-items-center p-3">
                          <img src={logoutIcon} alt="logout icon" />
                          <p className="ms-3 cursor-pointer" onClick={logout}>Logout</p>
                        </span>

                      </div>
                    </div>
                  </li>
                ) : (
                  <div className="d-flex align-items-center">
                    <li className="nav-item cursor-pointer">
                      <Link className="position-relative" to="/cart">
                        <img src={iconCart} alt="cart" />
                        {carts?.length === 0 ? <p></p> : <p className="cart-total">{carts?.length}</p>}
                      </Link>
                    </li>

                    <li className="nav-item dropdown">
                      <div role="button" className="rounded-circle nav-photo ms-3" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundImage: `url(${state.user.profile.image})` }}>
                      </div>
                      <div className="dropdown-menu">


                        <div className="menu-drop">
                          <div>
                            <Link to='/profile' className="d-flex align-items-center p-3">
                              <img src={'https://res.cloudinary.com/alfiancloud/image/upload/v1662327691/waysbean/user_2_iowt3d.png'} alt="profile icon" />
                              <p className="ms-3">Profile</p>
                            </Link>
                          </div>
                          <span className="d-flex align-items-center p-3">
                            <img src={logoutIcon} alt="logout icon" />
                            <p className="ms-3 cursor-pointer" onClick={logout}>Logout</p>
                          </span>
                        </div>


                      </div>
                    </li>
                  </div>
                )}

              </ul>

            ) : (

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button id="loginButton" type="button" className="btn btn-reverse-red px-4 py-1" data-bs-toggle="modal" data-bs-target="#login">
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn btn-red ms-3 px-4 py-1" data-bs-toggle="modal" data-bs-target="#register">
                    Register
                  </button>
                </li>
              </ul>

            )}
          </div>
        </div >
      </nav >
    </div >
  )
}

export default Navbar