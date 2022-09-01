import React from 'react'
import convertRupiah from 'rupiah-format'

import transactionData from './../fakeData/transactionData'
import { Navbar, TransactionCard } from '../components'

import incomeTransactionData from './../fakeData/incomeTransactionData'


function IncomeTransactionAdmin() {
  return (
    <div className='container d-flex justify-content-center'>

      <Navbar />

      <div class="modal fade" id="transactionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">

            <TransactionCard
              id={transactionData[0].id}
              day={transactionData[0].day}
              date={transactionData[0].date}
              status={transactionData[0].status}
              subTotal={transactionData[0].subTotal}
              product={transactionData[0].product}
            />

          </div>
        </div>
      </div>


      <div style={{ marginTop: 90, width: '90%' }}>

        <h3 className='text-red mb-4'>Income Transaction</h3>

        <table className="table table-hover">
          <thead>
            <tr className='table-secondary'>
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Post Code</th>
              <th>Income</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {incomeTransactionData.map((item, index) => {
              return (
                <tr className='cursor-pointer' data-bs-toggle="modal" data-bs-target="#transactionModal" key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.postCode}</td>
                  <td className='text-primary'>{convertRupiah.convert(item.income)}</td>
                  <td className={`text-${item.status === 'Waiting Approve' ? 'warning' :
                    item.status === 'Success' ? 'success' :
                      item.status === 'Cancel' ? 'danger' : 'info'
                    }`}>
                    {item.status}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default IncomeTransactionAdmin