import { React, useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import convertRupiah from 'rupiah-format'
import { API } from '../config/api'

import { Navbar } from '../components'
import { UserContext } from '../context/userContext'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

function DetailProduct() {

  let navigate = useNavigate();

  const [state, _] = useContext(UserContext)
  const user_id = state.user.id

  const [getProduct, setGetProduct] = useState({})
  const { id } = useParams()
  const getDetailProduct = async () => {
    const response = await API.get(`/product/${id}`)
    setGetProduct(response.data.data)
  }

  useEffect(() => {
    getDetailProduct()
  },[])

 const handleCart = useMutation(async (e) => {
  try {
    e.preventDefault()

    const config = {
      headers: {
        'Content-type': "application/json"
      },
    };

    let dataCart = {
      product_id : getProduct?.id,
      subtotal : getProduct?.price,
      user_id : user_id,
    }

    const body = JSON.stringify(dataCart);

    const response = await API.post('/cart', body, config);
    console.log(response);
    navigate("/cart")
  } catch (error) {
    console.log(error);
  }
 })
  

  return (
    <div>
      <Navbar />
      <div className='container d-flex justify-content-center'>
        <div className='row' style={{ marginTop: 120, width: '90%' }}>
          <img className='col-5' style={{height:"33rem"}} src={getProduct?.image} alt={getProduct?.title} />
          <div className='col-7 text-red'>
            <h1 >{getProduct?.title}</h1>
            <p>Stock : {getProduct?.stock}</p>
            <form onSubmit={(e) => handleCart.mutate(e)}>
              <div>
                <div className='row'>
                  <p>{getProduct?.desc}</p>                  
                </div>
              </div>
              <div className='d-flex justify-content-between mt-5'>
                <h5>Price</h5>
                <h5>{convertRupiah.convert(getProduct?.price)}</h5>
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