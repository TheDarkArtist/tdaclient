import { useRef, useState } from 'react'

import { useAuth } from '../../contexts/AuthContext';

const EditProfile = ({ setEditProfile }) => {

  const { currentUser, updateCurrentUser } = useAuth();
  const inputRefs = {
    username: useRef(),
    email: useRef(),
    password: useRef(),
    name: {
      first: useRef(),
      last: useRef(),
    },
    address: {
      street: useRef(),
      city: useRef(),
      state: useRef(),
      zip: useRef(),
    },
    dob: useRef(),
    phone: useRef(),
    bio: useRef(),
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    updateCurrentUser(inputRefs)

    setEditProfile(false)
  }


  return (
    <div className='flex w-full justify-center lg:justify-start' >
      <div className='flex flex-col items-center  pt-4 rounded-md w-full px-6 max-w-[25rem] lg:w-[25rem]' >
        <div className='border rounded-[50%] h-40 w-40 border-stone-600' ></div>
        <form onSubmit={handleSubmit} className='w-full text-sm text-stone-300' >
          <span className='flex flex-col rounded-sm p-1' >
            <span className='py-1 flex flex-col flex-wrap ' >
              <span className='flex flex-col m-.5'>
                <label className='text-sm' >First Nmae</label>
                <input ref={inputRefs.name.first} defaultValue={currentUser.name.first} className='bg-zinc-900 p-1 text-sm rounded-md py-0.5 px-2 border border-stone-600 focus:outline-none' type="text" />
              </span>
              <span className='flex flex-col m-.5' >
                <label className='text-sm'>Last Name</label>
                <input ref={inputRefs.name.last} defaultValue={currentUser.name.last} className='bg-zinc-900 border text-sm border-stone-600 rounded-md py-0.5 px-2 focus:outline-none' type="text" />
              </span>
            </span>

            <span className='py-1 flex flex-col flex-wrap ' >
              <span className='flex flex-col m-.5'>
                <label className='text-sm' >Bio</label>
                <textarea ref={inputRefs.bio} defaultValue={currentUser.bio} className='bg-zinc-900 p-1 text-sm rounded-md py-0.5 px-2 border border-stone-600 focus:outline-none' />
              </span>
            </span>

            <span className='py-1 flex flex-col flex-wrap my-1' >
              <span className='flex flex-col m.5'>
                <label className='text-sm' >DOB</label>
                <input ref={inputRefs.dob} defaultValue={currentUser.dob} className='bg-zinc-900 text-sm rounded-md py-0.5 px-2 border border-stone-600 focus:outline-none' type="text" />
              </span>
              <span className='flex flex-col m-.5' >
                <label className='text-sm'>Phone</label>
                <input ref={inputRefs.phone} defaultValue={currentUser.phoneNumber} className='bg-zinc-900 border text-sm border-stone-600 rounded-md py-0.5 px-1 focus:outline-none' type="text" />
              </span>
            </span>

            <span className='flex py-1 flex-col'>
              <span className='flex flex-col' >
                <label>Username</label>
                <input ref={inputRefs.username} defaultValue={currentUser.username} className='bg-zinc-900 px-2 py-0.5 rounded-md border border-stone-600 focus:outline-none' type="text" />
              </span>
              <span className='flex flex-col'>
                <label>Email</label>
                <input ref={inputRefs.email} defaultValue={currentUser.email} className='bg-zinc-900 px-2 py-0.5 rounded-md border border-stone-600 focus:outline-none' />
              </span>
              <span className='flex flex-col'>
                <label>Password</label>
                <input ref={inputRefs.password} defaultValue={currentUser.password} className='bg-zinc-900 px-2 py-0.5 rounded-md border border-stone-600 focus:outline-none' type="password" />
              </span>
            </span>
            <span className='flex py-1 flex-col'>
              <span className='flex flex-col' >
                <label>Street</label>
                <input ref={inputRefs.address.street} defaultValue={currentUser.address.street} className='bg-zinc-900 px-2 py-0.5 rounded-md border border-stone-600 focus:outline-none' type="text" />
              </span> <span className='flex flex-col' >
                <label>City</label>
                <input ref={inputRefs.address.city} defaultValue={currentUser.address.city} className='bg-zinc-900 px-2 py-0.5 rounded-md border border-stone-600 focus:outline-none' type="text" />
              </span> <span className='flex flex-col' >
                <label>State</label>
                <input ref={inputRefs.address.state} defaultValue={currentUser.address.state} className='bg-zinc-900 px-2 py-0.5 rounded-md border border-stone-600 focus:outline-none' type="text" />
              </span> <span className='flex flex-col' >
                <label>Zip</label>
                <input ref={inputRefs.address.zip} defaultValue={currentUser.address.zip} className='bg-zinc-900 px-2 py-0.5 rounded-md border border-stone-600 focus:outline-none' type="text" />
              </span>
            </span>
          </span>
          <div className='flex mb-4 justify-end p-1' >
            <button type='submit' className='bg-green-800 px-4 rounded-md mr-1 py-1' >Update</button>
            <span onClick={() => setEditProfile(false)} className="bg-stone-800 px-4 py-1 border border-stone-400 ml-1 cursor-pointer rounded-md">cancle</span>
          </div>
        </form>
      </div>
    </div>

  )
}

export default EditProfile;
