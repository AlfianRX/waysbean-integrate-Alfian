import React from 'react'
import Rupiah from 'rupiah-format'
import { API } from '../config/api'
import { useQuery } from 'react-query'
import { Table, Container } from 'react-bootstrap'
import { useState } from 'react'
import { Navbar } from '../components'


function IncomeTransactionAdmin() {

  const [showTrans, setShowTrans] = useState(false);
  const [idOrder, setIdOrder] = useState(null);

  const handleShow = (id) => {
    setIdOrder(id);
    setShowTrans(true);
  };
  const handleClose = () => setShowTrans(false);

  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });
  console.log(transactions);

  return (
    <>
      <Navbar />
      <Container className='mb-5' style={{ marginTop: 120 }}>
        <h1>Income Transaction</h1>
        <div>
          <Table hover bordered size="lg" variant="light">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Post Code</th>
                <th>Income</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((item, index) => (
                <tr onClick={() => handleShow(item.id)} key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.user?.fullName}</td>
                  <td>{item?.user?.address}</td>
                  <td>{item?.user?.postCode}</td>
                  <td className="tablePrice">{Rupiah.convert(item?.total)}</td>
                  <td
                    className={
                      item?.status === "Success"
                        ? "tableSuccess"
                        : item?.status === "Cancel"
                        ? "tableCancel"
                        : item?.status === "Pending"
                        ? "tableWaiting"
                        : "tableOtw"
                    }
                  >
                    {item?.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default IncomeTransactionAdmin