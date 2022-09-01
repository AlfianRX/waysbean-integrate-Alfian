import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import clip from './../assets/img/clip.png'




function AddForm(props) {
  
  const [product, setProduct] = useState({});
  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("");

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPreviewName(e.target.files[0].name);
    }
  };

  const navigate = useNavigate()
  let modalClose
  useEffect(() => {
    modalClose = document.getElementById('modalClose')
  })

  const handleModal = () => {
    modalClose.click()
    navigate('/')
  }

  return (
    <div className='row justify-content-between' style={{ marginTop: 90, width: '90%' }}>
      <div className='col-6'>
        <div  onClick={handleModal} class="modal fade" id="successModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div data-bs-dismiss="modal" id='modalClose'></div>
          <div  onClick={handleModal} class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content thanks-message">

              <div class="modal-body">
                <p>Add {props.name} Success</p>
              </div>

            </div>
          </div>
        </div>
        <h2 className='text-red mb-5'>{props.name}</h2>
        <form>
          <input className="form-control input-red mb-4" type="text" name='name' onChange={handleChange} placeholder={`Name ${props.name}`} aria-label="default input example" />
          <input className="form-control input-red mb-4" type="number" name='price' placeholder="Price" onChange={handleChange} aria-label="default input example" />
          <div className="mb-5">
            <input type="file" className="form-control input-file-red" id="inputGroupFile02" onChange={handleChange}/>
            <label className="form-control label-file" htmlFor="inputGroupFile02">
              <p className='m-0'> {previewName === "" ? "Photo Product" : previewName}</p>
              <img style={{ height: 20 }} src={clip} alt="clip" />
            </label>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-red mx-auto" style={{ width: '90%' }} type="button" data-bs-toggle="modal" data-bs-target="#successModal">Add {props.name}</button>
          </div>
        </form>
      </div>
      <img className='col-5' src={preview || props.img} alt="Add Product" />
    </div >
  )
}

export default AddForm