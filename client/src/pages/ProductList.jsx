import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components';
import { API } from '../config/api';
import DeleteModal from '../components/DeleteModal'
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';
import rupiahFormat from 'rupiah-format';

function ProductList() {
  let navigate = useNavigate();
  const [dataProduct, setDataproduct] = useState([]);
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (id) => {
    navigate("/product-update/" + id)
  };

  useEffect(() => {
    const dataProduct = async () => {
      try {
        const response = await API.get("/products");
        setDataproduct(response.data.data)
      } catch (error) {
        console.log(error);
      }
    };
    dataProduct();
  },[dataProduct]);

  let { data: products, refetch } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete){
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <div className='container d-flex justify-content-center'>

      <Navbar />

      <div style={{ marginTop: 120, width: '90%' }}>

        <h3 className='text-red mb-4'>List Product</h3>

    <Table striped hover bordered size="lg" variant="light">
      <thead>
        <tr>
          <th width="1%" className="text-center">No</th>
          <th className="text-center">Image</th>
          <th className="text-center">Name</th>
          <th className="text-center">Stock</th>
          <th className="text-center">Price</th>
          <th className="text-center">Description</th>
          <th colSpan={2} className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {dataProduct.map((item, index) => (
        <tr key={index}>
          <td className="align-middle text-center">{index + 1}</td>
          <td className="align-middle">
          <img
              src={item.image}
              style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",}}
              alt={item.title}
              />
          </td>
          <td className='align-middle'>{item.title}</td>
          <td className='align-middle'>{item.stock}</td>
          <td className="align-middle">
              {rupiahFormat.convert(item.price)}
          </td>
          <td className="align-middle">{item.desc.substring(0, 20)}...</td>
          <td className="align-middle">
                  <Button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    className="btn-sm btn-danger me-2"
                    style={{ width: "135px" }}
                  >
                    Delete
                  </Button>
                  </td>
                  <td className="align-middle">
                  <Button
                  onClick={() => {
                    handleEdit(item.id);
                  }}
                    className="btn-sm btn-success "
                    style={{ width: "135px" }}
                  >
                    Update
                  </Button>
                </td>
        </tr>
        ))}
      </tbody>
    </Table>
    </div>
    <DeleteModal
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />           
    </div>
  )
}

export default ProductList