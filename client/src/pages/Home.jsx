import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import convertRupiah from 'rupiah-format'
import { AuthModal, Navbar } from '../components'

import heroBg from './../assets/img/hero-bg.png'
import heroImg from './../assets/img/beans.png'
import iconimg from './../assets/img/waysbean_icon.png'
import { API } from '../config/api'
import { UserContext } from '../context/userContext'
import { useState } from 'react'
import { useEffect } from 'react'

function Home() {

  const [state] = useContext(UserContext)
  const navigate = useNavigate()
  const [dataProducts, setDataproducts] = useState([])
  const [order, setOrder] = useState("ASC")
    

  //. Fetching product data from database
 useEffect(() => {
  const dataProducts = async () => {
    try {
      const response = await API.get("/products");
      setDataproducts(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };
  dataProducts();
 },[])

 console.log(dataProducts);

  const detailProduct = (productId) => {
    const loginButton = document.getElementById("loginButton")
    if (state.isLogin === true) {
      navigate(`/detail-product/${productId}`)
    } else {
      loginButton.click()
    }
  }

  const sorting = (e) => {
    if (order === "ASC"){
      const sorted = [...dataProducts].sort((a, b) =>
      a[e].toLowerCase() > b[e].toLowerCase() ? 1 : -1)
      setDataproducts(sorted)
      setOrder("DSC")
    }
    if (order === "DSC"){
      const sorted = [...dataProducts].sort((a, b) =>
      a[e].toLowerCase() < b[e].toLowerCase() ? 1 : -1)
      setDataproducts(sorted)
      setOrder("ASC")
    }
  }
  
  const sortingInt = (e) => {
    if (order === "ASC"){
      const sorted = [...dataProducts].sort((a, b) =>
      a[e] > b[e] ? 1 : -1)
      setDataproducts(sorted)
      setOrder("DSC")
    }
    if (order === "DSC"){
      const sorted = [...dataProducts].sort((a, b) =>
      a[e] < b[e] ? 1 : -1)
      setDataproducts(sorted)
      setOrder("ASC")
    }
  }
  
  return (
    <div className='container'>
      <Navbar />
      <AuthModal />
      <header className='mb-5' style={{ marginTop: 120 }}>
        <div className='mx-auto position-relative' style={{ width: '90%' }}>
          <div className='hero row align-items-center' style={{ backgroundImage: `url(${heroBg})` }}>
            <div className='col-7'>
              <h1>
                <img src={iconimg} alt="waysbean icon"/>
              </h1>
              <h5 className='mt-5'>BEST QUALITY COFFEE BEANS</h5>
              <p>Quality freshly roasted coffee made just for you.<br/>
                  Pour, brew and enjoy</p>
            </div>
            <img className='col-5 hero-img' src={heroImg} alt="Hero Food" />
          </div>
        </div>
      </header>
      <main className='mx-auto text-red' style={{ width: '92%' }}>
        
        <div className='mb-5'>
          <h4 className='mb-3'>The Real Smell of Coffee</h4>
          {/* sorting button */}
          <div className="btn-group dropend">
            <button className="btn btn-red dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Sort Product
            </button>
            <ul className="dropdown-menu border" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" onClick={()=>sorting("title")}>by Name</a></li>
              <li><a className="dropdown-item" onClick={()=>sortingInt("price")}>by Price</a></li>
            </ul>
          </div>
        </div>

        <div className='row'>
          {dataProducts?.map((item) => {
            return (
              <div key={item.id} className='col-3 mb-5 px-3'>
                <div className='card bg-pink p-0 cursor-pointer' onClick={() => detailProduct(item.id)}>
                  <img src={item.image} className="card-img-top w-100 mb-2" alt={item.title} />
                  <div className="card-body p-3">
                    <div>
                      <h5 className="card-title mb-2 text-red">{item.title}</h5>
                    </div>
                    <p className="card-text mb-2">{convertRupiah.convert(item.price)}</p>
                    <p className="card-text mb-2">Stock : {item.stock}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div >
  )
}

export default Home