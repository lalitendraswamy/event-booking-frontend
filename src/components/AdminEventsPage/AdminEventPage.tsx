import React from 'react'
import Navbar from '../shared/navbar/navbar'
import Footer from '../shared/footer/eventsFooter'

import AdminNav from '../shared/adminNav/adminNav'

export default function AdminEventPage() {
  return (
    <div>
      <Navbar/>
      <div className='admin-bg p-3'>
       <AdminNav/>
        <div className='admin-content'>
                AVP
        </div>
      </div>
    <Footer/>
    </div>
  )
}
