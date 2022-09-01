import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import convertRupiah from 'rupiah-format'

import { AuthModal, Navbar } from '../components'

import heroBg from './../assets/img/hero-bg.png'
import heroImg from './../assets/img/beans.png'
import iconimg from './../assets/img/waysbean_icon.png'

import productsData from './../fakeData/productsData'
import { UserContext } from '../context/userContext'

function Home() {

  const [state] = useContext(UserContext)
  const navigate = useNavigate()

  let loginButton

  useEffect(() => {
    loginButton = document.getElementById('loginButton')
  }, []);


  const detailProduct = (productId) => {
    if (state.isLogin === true) {
      navigate(`/detail-product/${productId}`)
    } else {
      loginButton.click()
    }
  }

  return (
    <div className='container'>
      <Navbar />
      <AuthModal />
      <header className='mb-5' style={{ marginTop: 90 }}>
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
        <h4 className='mb-5'>Let's Order</h4>
        <div className='row'>
          {productsData.map((item) => {
            return (
              <div key={item.id} className='col-3 mb-5 px-3'>
                <div className='card bg-pink p-0 cursor-pointer' onClick={() => detailProduct(item.id)}>
                  <img src={item.img} className="card-img-top w-100 mb-2" alt={item.name} />
                  <div className="card-body p-3">
                    <div>
                      <h5 className="card-title mb-2 text-red">{item.name}</h5>
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