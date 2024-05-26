import React, { useState } from 'react'
import { } from 'firebase/firestore';

import { useAuth } from '../../contexts/AuthContext';

const Resume = () => {

  const [FWopen, setFWopen] = useState(true)
  const { currentUser } = useAuth();
  const handleFloatingActionButton = () => {
    const fw = document.getElementById('floating-window');
    if (FWopen) {
      fw.classList.add('w-96')
      fw.classList.add('h-60')
      fw.classList.remove('w-0')
      fw.classList.remove('h-0')
      setFWopen(!FWopen)
    } else {
      fw.classList.remove('w-96')
      fw.classList.remove('h-60')
      fw.classList.add('w-0')
      fw.classList.add('h-0')
      setFWopen(!FWopen)
    }
  }

  if (currentUser.access != 'root') {
    return (
      <div className='h-96 w-full flex justify-center items-center' >
        <span className=' md:text-2xl'>You Are Not Authorized To Access This Area.</span>
      </div>
    )
  }


  return (
    <div className='border border-green-900 mt-10 w-full h-full' >
      <div onClick={handleFloatingActionButton} className="border border-green-900 shadow shadow-green-700 flex justify-center items-center font-bold text-4xl text-stone-400 cursor-pointer h-14 w-14 rounded-full fixed bottom-6 right-4 bg-green-950">+</div>
      <div id='floating-window' className="border transition-all border-green-900 shadow shadow-green-700 flex justify-center items-center font-bold text-4xl text-stone-400 h-0 w-0 rounded-md fixed bottom-24 right-4 bg-green-950 overflow-hidden"></div>

      <div className="border border-green-900 p-2 h-full">
        <div className='flex my-1 flex-col border border-green-900'>
          <span className='text-xl mx-1'>Personal Details</span>
          <input className='bg-green-950 m-1 px-1 py-0.5 focus:outline-none' type="text" placeholder='Name' />
          <input className='bg-green-950 m-1 px-1 py-0.5 focus:outline-none' type="text" placeholder='Address' />
          <span className='flex'>
            <input className='bg-green-950 w-full m-1 px-1 py-0.5 focus:outline-none' type="text" placeholder='Email' />
            <input className='bg-green-950 w-full m-1 px-1 py-0.5 focus:outline-none' type="text" placeholder='Phone' />
          </span>
          <input className='bg-green-950 m-1 px-1 py-0.5 focus:outline-none' type="text" placeholder='Website Link' />
          <input className='bg-green-950 m-1 px-1 py-0.5 focus:outline-none' type="text" placeholder='Social Link' />
        </div>

        <div className='flex my-1 flex-col border border-green-900' >
          <span className='text-xl mx-1'>Objective</span>
          <textarea className='bg-green-950 m-1 px-1 py-0.5 focus:outline-none' type="text" placeholder='Objective' />
        </div>

        <div className='flex flex-col border border-green-900 my-1'>
          <span className='text-xl mx-1'>Education</span>
          <ul className='overflow-hidden'>
            <li><input className='bg-green-950 m-1 px-1 w-full py-0.5 focus:outline-none' type="text" placeholder='Education' /></li>
          </ul>
        </div>

        <div className='flex flex-col border border-green-900'>
          <span className='text-xl mx-1'>Experience</span>
          <ul className='overflow-hidden' >
            <li><input className='bg-green-950 m-1 w-full px-1 py-0.5 focus:outline-none' type="text" placeholder='Cert' /></li>
          </ul>
        </div>

        <div className='flex flex-col border border-green-900'>
          <span className='text-xl mx-1'>Skills</span>
          <ul className='overflow-hidden' >
            <li><input className='bg-green-950 m-1 w-full px-1 py-0.5 focus:outline-none' type="text" placeholder='Cert' /></li>
          </ul>
        </div>

        <div className='flex flex-col border border-green-900'>
          <span className='text-xl mx-1'>Interests</span>
          <ul className='overflow-hidden' >
            <li><input className='bg-green-950 m-1 w-full px-1 py-0.5 focus:outline-none' type="text" placeholder='Cert' /></li>
          </ul>
        </div>


        <div className='flex flex-col border border-green-900'>
          <span className='text-xl mx-1'>Achievements & Certs</span>
          <ul className='overflow-hidden' >
            <li><input className='bg-green-950 m-1 w-full px-1 py-0.5 focus:outline-none' type="text" placeholder='Cert' /></li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Resume
