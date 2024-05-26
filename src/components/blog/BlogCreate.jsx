import React, { useRef } from 'react'
import {db } from '../../services/Firebase';
import BlogBar from './BlogBar';
import {collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {useAlertContext} from '../../contexts/AlertContext';

const BlogCreate = () => {

  const titleRef = useRef();
  const bodyRef = useRef();
  const navigate = useNavigate();
  const {alert, showAlert} = useAlertContext();

  const addBlog = async (e) =>{
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'blog'), {
        title: titleRef.current.value,
        body: bodyRef.current.value
      })
      navigate('/blog')
      showAlert('Blog Created!');
    } catch (error) {
      console.log('tda error ' + error);
    }
  }

  const handleCancle = () =>{
    navigate('/blog')
  }

  return (
    <>
    <BlogBar />
    <div className='m-1'>
    <div className='font-bold text-2xl pl-4 my-2'>Create Blog</div>
      <form className='flex flex-col'>
        <input required ref={titleRef} className='text-xl bg-zinc-100 dark:bg-zinc-950 p-1 m-1 border border-green-500 focus:outline-none' placeholder='Title' id='blog-title' type="text" />
        <textarea required ref={bodyRef} className='text-xl bg-zinc-100 dark:bg-zinc-950 p-2 m-1 border border-green-500 focus:outline-none' placeholder='Body' id="blog-body" cols="30" rows="10"></textarea>
          <span className='flex justify-end m-1'>
          <button onClick={addBlog} className='bg-green-600 py-1 px-4 m-1'>Create</button>
          <button onClick={handleCancle} className='bg-red-700 px-4 py-1 m-1' >Cancle</button>
          </span>
      </form>

      </div>
    </>
  )
}

export default BlogCreate
