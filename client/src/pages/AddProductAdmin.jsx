import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { API } from '../config/api';
import clip from './../assets/img/clip.png'
import { Navbar } from "./../components";

import kopi from './../assets/img/question.png'

function AddProductAdmin() {

  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("");

  const [form, setForm] = useState({
    title: '',
    price: '',
    stock: '',
    desc: '',
    image: '',

  });

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

  // Create function for handle insert product data with useMutation here ...
  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set('image', form.image[0], form.image[0].name);
      formData.set('title', form.title);
      formData.set('price', form.price);
      formData.set('stock', form.stock);
      formData.set('desc', form.desc);

      console.log(form)

      // Insert product data
      const response = await API.post('/product', formData, config);
      // setForm(response.data)
      console.log(response)

      alert('Produk berhasil ditambahkan!')

    } catch (error) {
      console.log(error);
    }
  })

  return (
    <div className='container d-flex justify-content-center'>
      <Navbar />

      <div className='row justify-content-between' style={{ marginTop: 120, width: '90%' }}>
      <div className='col-6'>

        <h2 className='text-red mb-5'>Add Product</h2>
        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <input className="form-control input-red mb-4" type="text" name='title' onChange={handleChange} placeholder={`Name Product`} aria-label="default input example" />
          <input className="form-control input-red mb-4" type="number" name='stock' placeholder="Stock" onChange={handleChange} aria-label="default input example" />
          <input className="form-control input-red mb-4" type="number" name='price' placeholder="Price" onChange={handleChange} aria-label="default input example" />
          <textarea className="form-control input-red mb-4" type="text" name='desc' placeholder="Desc" onChange={handleChange} aria-label="default input example" />
          <div className="mb-5">
            <input type="file" name='image' className="form-control input-file-red" id="inputGroupFile02" onChange={handleChange}/>
            <label className="form-control label-file" htmlFor="inputGroupFile02">
              <p className='m-0'> {previewName === "" ? "Photo Product" : previewName}</p>
              <img style={{ height: 20 }} src={clip} alt="clip" />
            </label>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-red mx-auto" style={{ width: '90%' }}>Add Product</button>
          </div>
        </form>
      </div>
      <img className='col-5' style={{ height: 500}} src={preview || kopi} alt="Add Product" />
    </div >

    </div>
  )
}

export default AddProductAdmin