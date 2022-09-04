import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { API } from '../config/api';
import clip from './../assets/img/clip.png'
import { Navbar } from "../components";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function UpdateProduct() {

  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [product, setProduct] = useState({});
  const [dataProduct, setDataproduct] = useState([]);

  let navigate = useNavigate();
  
  const { id } = useParams()

  console.log(dataProduct);
  const [form, setForm] = useState({
    title: '',
    price: '',
    stock: '',
    desc: '',
    image: '',
  });

  useEffect(() => {
    const dataProduct = async () => {
      try {
        let response = await API.get("/product/" + id);
        setForm({
          title: response.data.data.title,
          price: response.data.data.price,
          stock: response.data.data.stock,
          desc: response.data.data.desc,
          image: response.data.data.image,
        });

        setDataproduct(response.data.data.image)
      } catch (error) {
        console.log(error);
      }
    };
    dataProduct();
  }, [id]);

  useEffect(() => {
    const dataProduct = async () => {
      try {
        const response = await API.get("/productimage/" + id);

        setProduct(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    dataProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm(({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    }));

    //handle preview image
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPreviewName(e.target.files[0].name);
    }
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      const formData = new FormData();

      if (form.image) {
        formData.set('image', form?.image[0], form?.image[0]?.name);
      }
      formData.set('title', form.title);
      formData.set('price', form.price);
      formData.set('stock', form.stock);
      formData.set('desc', form.desc);

      await API.patch("/product-update/" + id, formData, config);
     
      alert("berhasil UPDATE product");
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className='container d-flex justify-content-center'>
      <Navbar />

      <div className='row justify-content-between' style={{ marginTop: 120, width: '90%' }}>
      <div className='col-6'>

        <h2 className='text-red mb-5'>Update Product</h2>
        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <input className="form-control input-red mb-4" type="text" name='title' onChange={handleChange} placeholder={`Name Product`} value={form.title} aria-label="default input example" />
          <input className="form-control input-red mb-4" type="number" name='stock' placeholder="Stock" onChange={handleChange} value={form.stock} aria-label="default input example" />
          <input className="form-control input-red mb-4" type="number" name='price' placeholder="Price" onChange={handleChange} value={form.price} aria-label="default input example" />
          <textarea className="form-control input-red mb-4" type="text" name='desc' placeholder="Desc" onChange={handleChange} value={form.desc} aria-label="default input example" />
          <div className="mb-5">
            <input type="file" name='image' className="form-control input-file-red" id="inputGroupFile02" onChange={handleChange}/>
            <label className="form-control label-file" htmlFor="inputGroupFile02">
              <p className='m-0'> {previewName === "" ? "Photo Product" : previewName}</p>
              <img style={{ height: 20 }} src={clip} alt="clip" />
            </label>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-red mx-auto" style={{ width: '90%' }}>Save Changes</button>
          </div>
        </form>
      </div>
      <img className='col-5' style={{ height: 500}} src={preview || form.image} alt="Update Product" />
    </div >

    </div>
  )
}

export default UpdateProduct