import { React, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import convertRupiah from 'rupiah-format'

import productsData from './../fakeData/productsData'
import { Navbar } from '../components'
import { CartContext } from '../context/cartContext'

function DetailProduct() {

  const { id } = useParams()

  const product = productsData.filter((item, index) => {
    return item.id === Number(id)
  })

  let [cart, setCart] = useContext(CartContext)
  let [totalPrice, setTotalPrice] = useState(product[0].price)

  const handleSubmit = (e) => {
    e.preventDefault()
    setCart(cart++)
  }


  return (
    <div>
      <Navbar />
      <div className='container d-flex justify-content-center'>
        <div className='row' style={{ marginTop: 90, width: '90%' }}>
          <img className='col-5' style={{height:"33rem"}} src={product[0]?.img} alt={product[0]?.name} />
          <div className='col-7 text-red'>
            <h1 >{product[0]?.name}</h1>
            <p>Stock : {product[0]?.stock}</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <div className='row'>
                  <p>{product[0]?.desc}</p>                  
                </div>
              </div>
              <div className='d-flex justify-content-between mt-5'>
                <h5>Total</h5>
                <h5>{convertRupiah.convert(totalPrice)}</h5>
              </div>
              <div className='d-grid gap-2 mt-5'>
                <button className='btn btn-red d-grid gap-2'>Add Cart</button>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div>
  )
}

export default DetailProduct