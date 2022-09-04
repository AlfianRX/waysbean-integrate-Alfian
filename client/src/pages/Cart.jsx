import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import convertRupiah from 'rupiah-format'
import { API } from '../config/api'
import { Modal, Form, Button } from "react-bootstrap";
import bin from './../assets/img/bin.png';
import ModalCart from '../components/ModalPay';
import { useQuery } from 'react-query';
import { Navbar } from '../components'
import { UserContext } from '../context/userContext'
import { useState } from 'react'
import { useMutation } from 'react-query'

function Cart() {

  const navigate = useNavigate();
  const [productsID, setProductsID] = useState([])
 
  const [show, setShow] = useState(false); // modal result
  const [showAddress, setShowAddress] = useState(false); // modal pay

  const handleClose = () => setShow(false);
  const handleCloseAddress = () => setShowAddress(false);
  
  let { data: cart, refetch } = useQuery("cartsCache", async () => {
    const response = await API.get("/carts-userid");
    return response.data.data;
  });

  //arithmatic
  let resultTotal = cart?.reduce((a, b) =>{
    return a + b.qty * b.subtotal;
  }, 0);
  

  let qtyTotal = cart?.reduce((a, b) => {
    return a + b.qty;
  }, 0)


  let handleDelete = async (id) => {
    await API.delete(`/cart/` + id);
    refetch();
  };

  const increaseQty = async (idProduct) => {
    try {
      const result = cart.find(({ id }) => id === idProduct);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Basic " + localStorage.token,
        }
      };

      const body = JSON.stringify({
        qty: result.qty +1,
      });

      await API.patch("/cart/" + idProduct, body, config);
      refetch();
      console.log(result.qty);
    } catch (error) {
      console.log(error);
    }
  };
  
  const decreaseQty = async (idProduct) => {
    try {
      const result = cart.find(({ id }) => id === idProduct);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Basic " + localStorage.token,
        }
      };

      const body = JSON.stringify({
        qty: result.qty -1,
      });

      await API.patch("/cart/" + idProduct, body, config);
      refetch();
      console.log(result.qty);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowAddress = () => setShowAddress(true);

   
 
// pay midtrans
useEffect(() => {
  //change this to the script source you want to load, for example this is snap.js sandbox env
  const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
  //change this according to your client-key
  const myMidtransClientKey = "-";

  let scriptTag = document.createElement("script");
  scriptTag.src = midtransScriptUrl;
  // optional if you want to set script attribute
  // for example snap.js have data-client-key attribute
  scriptTag.setAttribute("data-client-key", myMidtransClientKey);

  document.body.appendChild(scriptTag);
  return () => {
    document.body.removeChild(scriptTag);
  };
}, []);

// handlebuy

const form = {
  total: resultTotal,
};
const handleSubmit = useMutation(async (e) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify(form);
  const response = await API.post("/transaction", body, config);
  const token = response.data.data.token;

  window.snap.pay(token, {
    onSuccess: function (result) {
      console.log(result);
      navigate("/profile");
    },
    onPending: function (result) {
      console.log(result);
      navigate("/profile");
    },
    onError: function (result) {
      console.log(result);
    },
    onClose: function () {
      alert("you closed the popup without finishing the payment");
    },
  });
  await API.patch("/cart", body, config);
});

  return (
    <div className='container d-flex justify-content-center'>
      <Navbar />
      <div className='text-red' style={{ marginTop: 120, width: '90%' }}>

        <h3 >My Cart</h3>
        <div className='row justify-content-between'>
          <p>Review Your Order</p>
          <div className='col-7 '>
            {cart?.map((item, index) => {
              return (
                <div className='cart row pt-3 mb-4'>

                      <div key={index} className='d-flex justify-content-between mb-3'>
                        <div className='cart-image col-2' style={{ backgroundImage: `url(${item?.product?.image})` }}>
                        </div>
                        <div className='col-8 d-flex flex-column justify-content-evenly align-items-start'>
                          <p className='m-0'>{item.product.title}</p>
                        <span>

                          <div className='tothe-left'>
                            <span>
                              <button
                                className="btnIncDec"
                                onClick={() => decreaseQty(item.id)}
                              >
                                -
                              </button>
                            </span>
                            <p className='bg-pink px-2 rounded'>{item?.qty}</p>
                            <span>
                              <button
                                className="btnIncDec"
                                onClick={() => increaseQty(item.id)}
                              >
                                +
                              </button>
                            </span>
                          </div>
                        </span>
                        </div>
                        <div className='col-2 text-end d-flex flex-column justify-content-evenly align-items-end'>
                          <p className='m-0'>{convertRupiah.convert(item?.qty * item?.product?.price)}</p>
                          <img className='cursor-pointer trash' src={bin} alt='erase' style={{ height: 20 }} onClick={() => handleDelete(item.id)} />
                        </div>
                      </div>
                </div>
              )
            })}
          </div>
          <div className='col-4 h-50'>
            <div >
              <div className='cart d-flex justify-content-between pt-2 mb-3'>
                <div className='d-flex flex-column'>
                  <p className='mb-2'>Subtotal</p>
                  <p className='mb-2'>Qty</p>
                </div>

                <div className='d-flex flex-column'>
                  <p className='mb-2'>{convertRupiah.convert(resultTotal)}</p>
                  <p className='mb-2'>{qtyTotal}</p>
                </div>
              </div>

              <div className='d-flex justify-content-between'>
                <p>Total</p>
                <p>{convertRupiah.convert(resultTotal)}</p>
              </div>

            </div>

            <div className="d-grid gap-2 mt-5">
              <button className="btn btn-red" 
              type="button" onClick={(e) => handleSubmit.mutate(e)}>
                Checkout</button>
            </div>

          </div>
        </div>
      </div>

      <ModalCart showTrans={show} close={handleClose} />
      <Modal 
      show={showAddress} 
      onHide={handleCloseAddress}
      className="contained-modal-title-vcenter"
      centered
      >
        <div className="address p-3">
        <h3 className="text-red">Confirm Your Purchased Item</h3>

                  {<div>
                  <button
                  type="button"
                  className="pt-2 pb-2 mt-2 btn btn-red"
                  style={{
                    width: "100%",
                  }}
                  >
                  Pay
                </button>
                  </div>}
                  {<div>
                  <button
                  type="button"
                  className="pt-2 pb-2 mt-2 btn btn-reverse-red"
                  style={{
                    width: "100%",
                  }}
                  onClick={handleCloseAddress}>
                  Cancel
                </button>
                  </div>}
          </div>
      </Modal>
    </div>
    )}

export default Cart