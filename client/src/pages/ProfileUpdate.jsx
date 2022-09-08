import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query';
import { API } from '../config/api';
import clip from './../assets/img/clip.png'
import { Navbar } from "../components";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserContext } from '../context/userContext';

function UpdateProfile() {

  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [profile, setProfile] = useState({});
  const [dataProfile, setDataprofile] = useState([]);

  let navigate = useNavigate();
  
  const { id } = useParams()

  const [form, setForm] = useState({
    phone: '',
    address: '',
    post_code: '',
    image: '',
  });

  useEffect(() => {
    const dataProfile = async () => {
      try {
        let response = await API.get("/profile/" + id);
        setForm({
          phone: response.data.data.phone,
          address: response.data.data.address,
          post_code: response.data.data.post_code,
          image: response.data.data.image,
        });
        
        setDataprofile(response.data.data)
      } catch (error) {
        console.log(error);
      }
    };
    dataProfile();
  }, [id]);

   useEffect(() => {
     const dataProfile = async () => {
       try {
         const response = await API.get("/profileimage/" + id);

         setProfile(response.data.image)
         console.log(response.data);
       } catch (error) {
         console.log(error);
       }
     };
     dataProfile();
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
        formData.set('image', form?.image[0], form?.image[0].name);
      }
      formData.set('phone', form.phone);
      formData.set('address', form.address);
      formData.set('post_code', form.post_code);

      await API.patch("/profile-update/" + id, formData, config);
     
      alert("UPDATE Profile Success");
      navigate("/profile")
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className='container d-flex justify-content-center'>
      <Navbar />

      <div className='row justify-content-between' style={{ marginTop: 120, width: '90%' }}>
      <div className='col-6'>

        <h2 className='text-red mb-4'>Update Your Profile</h2>
        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <input className="form-control input-red mb-4" type="text" name='phone' onChange={handleChange} placeholder={`Phone Number`} value={form.phone} aria-label="default input example" />
          <input className="form-control input-red mb-4" type="text" name='address' placeholder="Address" onChange={handleChange} value={form.address} aria-label="default input example" />
          <input className="form-control input-red mb-4" type="text" name='post_code' placeholder="Post Code" onChange={handleChange} value={form.post_code} aria-label="default input example" />
          <div className="mb-5">
            <input type="file" name='image' className="form-control input-file-red" id="inputGroupFile02" onChange={handleChange}/>
            <label className="form-control label-file" htmlFor="inputGroupFile02">
              <p className='m-0'> {previewName === "" ? "Photo Profile" : previewName}</p>
              <img style={{ height: 20 }} src={clip} alt="clip" />
            </label>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-red mx-auto" style={{ width: '90%' }}>Save Changes</button>
          </div>
        </form>
      </div>
      <div className='col-5 mt-9' style={{marginTop:"60px"}} >
        <img style={{ height: 300, width: 200}} src={preview || form.image} alt="Update Profile" />
      </div>
    </div >

    </div>
  )
}

export default UpdateProfile