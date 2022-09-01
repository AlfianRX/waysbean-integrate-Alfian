import React from 'react'

import toping from './../assets/img/question.png'

import { AddForm, Navbar } from './../components'

function AddTopingAdmin() {
  return (
    <div className='container d-flex justify-content-center'>
      <Navbar />
      <AddForm name='Toping' img={toping} />
    </div>
  )
}

export default AddTopingAdmin