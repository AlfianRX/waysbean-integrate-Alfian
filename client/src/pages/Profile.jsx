import React, { useContext } from 'react'
import { Navbar, TransactionCard } from '../components'
import { UserContext } from '../context/userContext'

import transactionData from './../fakeData/transactionData'

function Profile() {

  const [state] = useContext(UserContext)

  return (
    <div className='container d-flex justify-content-center'>
      <Navbar />
      <div className='row' style={{ marginTop: 90, width: '90%' }}>
        <div className='col-5'>
          <h3 className='text-red mb-4'>My Profile</h3>
          <div className='row'>
            <img className='col-5' src={state.user[0].photo} alt={state.user[0].name} />
            <div className='col-6'>
              <h5 className='mb-2 text-brown'>Full Name</h5>
              <p>{state.user[0].name}</p>
              <h5 className='text-brown'>Email</h5>
              <p>{state.user[0].email}</p>
            </div>
          </div>
        </div>

        <div className='col-7'>
          <h3 className='text-brown mb-4'>My Transaction</h3>
          {transactionData.map((item) => {
            return <TransactionCard
              mb='1rem'
              id={item.id}
              day={item.day}
              date={item.date}
              status={item.status}
              subTotal={item.subTotal}
              product={item.product}
            />
          })}

        </div>

      </div>
    </div>
  )
}

export default Profile