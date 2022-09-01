import React from 'react'
import convertRupiah from 'rupiah-format'

import logo from './../assets/img/waysbean_logo.png'
import qrDummy from './../assets/img/qr-dummy.png'

function TransactionCard(props) {

  console.log(props.product)
  return (
    <div className="card bg-pink" style={{ maxWidth: 540, marginBottom: props.mb }}>
      <div className="row g-0 pt-3 px-3">

        <div className="col-md-8">
          {props.product.map((item) => {
            return (
              <div className="bg-pink" style={{ maxWidth: 540 }}>
                <div className="row g-0 align-items-center mb-3">

                  <div className="col-md-4">
                    <img src={item.img} className="img-fluid rounded-start" alt={item.name} />
                  </div>

                  <div className="col-md-8">
                    <div className="card-body text-red p-0 ps-3">
                      <h5 className="card-title">{item.name}</h5>
                      <small className='text-small'>
                        <p className="card-text"><strong> {props.day}</strong> {props.date}</p>
                        <p className='mb-2'><span className='text-brown'>Qty:</span>
                           1
                          </p>
                        <p className='text-brown'>Price: {convertRupiah.convert(item.price)}</p>
                      </small>
                    </div>
                  </div>

                </div>

              </div>
            )
          })}
        </div>

        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
          <img src={logo} className="img-fluid rounded-start mb-3" alt="Logo Waysbuck" />
          <img src={qrDummy} className="img-fluid rounded-start mb-3" alt="QR Code" />
          <p className='text-info bg-info bg-opacity-10 px-2'>{props.status}</p>
          <p>Sub Total: {convertRupiah.convert(props.subTotal)}</p>
        </div>

      </div>
    </div>
  )
}

export default TransactionCard
