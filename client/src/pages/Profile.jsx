import React, { useContext } from 'react'
import { Navbar } from '../components'
import { UserContext } from '../context/userContext'
import { API } from '../config/api';
import { useQuery } from 'react-query';
import Rupiah from 'rupiah-format';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';


function Profile() {
  
  let navigate = useNavigate();
  const [state] = useContext(UserContext);
 
  const handleUpdate = (id) => {
    navigate("/profile-update/" + id)
  }

  const handleClick = () => {
    navigate("/")
  }

  let { data: transactions } = useQuery('transactionsCache', async () => {
    const response = await API.get('/user-transaction');
    console.log(transactions);
    return response.data.data
  });

  return (
    <div className='container d-flex justify-content-center'>
      <Navbar />
      <div className='row' style={{ marginTop: 120, width: '90%' }}>
        <div className='col-5'>
          <h3 className='text-red mb-4'>My Profile</h3>
          <div className='row'>
            <img className='col-5' src={state?.user?.profile?.image} 
            style={{height:"10rem"}}
            alt={state?.user?.fullName} />
            <div className='col-6'>
              <h5 className='mb-2 text-brown'>Full Name</h5>
              <p>{state?.user?.fullName}</p>
              <h5 className='mb-2 text-brown'>Email</h5>
              <p>{state?.user?.email}</p>
              <h5 className='mb-2 text-brown'>Phone</h5>
              <p>{state?.user?.profile?.phone}</p>
              <h5 className='mb-2 text-brown'>Postal Code</h5>
              <p>{state?.user?.profile?.post_code}</p>
              <h5 className='text-brown'>Address</h5>
              <p>{state?.user?.profile?.address}</p>
            </div>
            <button className='btn btn-red'
            style={{width:"40%", marginTop:"20px"}}
            onClick={() => {
              handleUpdate(state?.user?.id)
            }}
            >Update Profile</button>
          </div>
        </div>

        <div className='col-7'>
          <h3 className='text-red mb-4'>My Transaction</h3>
          {transactions?.length !== 0 ?(
            <div className='overflowTrans'>
              {transactions?.map((item, index) => (
                <div className="profileCard mb-3" key={index} >
                  <div className="contentCardLeft">
                    {item?.product?.map((data, idx) => (
                      <div className="mapContent" key={idx}>
                        <img
                          src={
                            data?.product?.image
                          }
                          alt="coffee"
                        />
                        <ul>
                          <li className="profileCardTitle">
                            {data?.product?.title}
                          </li>
                          <li className="profileCardDate">
                            <strong>Monday</strong>,06 September 2022
                          </li>
                          <li className="profileCardToping">Qty: {data?.qty}</li>
                          <li className="profileCardPrice">
                            Price: {Rupiah.convert(data?.product?.price)}
                          </li>
                          <li className="profileCardToping">
                            <strong>
                              Sub Total :{" "}
                              {Rupiah.convert(data?.qty * data?.product?.price)}
                            </strong>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div
                    className={
                      "Success"
                        ? "contentCardRight Success"
                        : "Cancel"
                        ? "contentCardRight Cancel"
                        : "contentCardRight Otw"
                    }
                  >
                    <img src={'https://res.cloudinary.com/alfiancloud/image/upload/v1662566498/waysbean/Icon_1_leg6vi.png'} alt="logo" />
    
                    <QRCode value="git re" bgColor="transparent" size={80} />
                    <span>
                      <p>{item?.status}</p>
                    </span>
                    <p className="profileSubTotal">Total : {item?.total}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='position-absolute top-50 start-50 translate-middle'>
              <img src={"https://res.cloudinary.com/alfiancloud/image/upload/v1662555859/waysbean/image_processing20210614-29082-1jfipct_vtubtu.jpg"}
              alt={'Transaction 0'} style={{width:"250px"}}/>
              <h5 className='nildata text-red'>No transaction history</h5>              
              <button className='btn btn-red nilbtn'
              onClick={handleClick}
              >Browse Product</button>
            </div>
          )}
          

        </div>

      </div>
    </div>
  )
}

export default Profile