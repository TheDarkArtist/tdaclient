import { useRef } from 'react'
import {db } from '../../services/Firebase';
import BlogBar from './ProjectBlogBar';
import {collection, addDoc, Timestamp} from  'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {useAlertContext} from '../../contexts/AlertContext';

const ProjectBlogCreate = () => {

  const titleRef = useRef();
  const bodyRef = useRef();
  const navigate = useNavigate();
  const {alert, showAlert, hideAlert} = useAlertContext();

  const addBlog = async (e) =>{
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'projectBlog'), {
        title: titleRef.current.value,
        body: bodyRef.current.value,
        languages: ['python', 'rust', 'javascript'],
        createdAt: Timestamp.fromDate(new Date()),
      })
      navigate('/projects')
      showAlert('Created');
    } catch (error) {
      console.log('tda error ' + error);
    }
  }

  const handleCancle = () =>{
    navigate('/projects')
  }

  return (
    <>
    <BlogBar />
    <div className='m-1'>
      <div className='pl-4 my-2 text-2xl font-bold'>Create Blog</div>
      <form className='flex flex-col'>
        <input required={true}  ref={titleRef} className='md:text-xl bg-zinc-100 dark:bg-zinc-950 p-1 m-1 border border-green-500 focus:outline-none' placeholder='Title' id='blog-title' type="text" />
        <textarea ref={bodyRef} className='md:text-xl bg-zinc-900 dark:bg-zinc-950 p-2 m-1 border border-green-500 focus:outline-none' placeholder='Body' id="blog-body" cols="30" rows="25"></textarea>
          <span className='flex justify-end m-1'>
          <button onClick={addBlog} className='bg-green-600 py-1 px-4 m-1'>Create</button>
          <button onClick={handleCancle} className='bg-red-700 px-4 py-1 m-1' >Cancle</button>
          </span>
      </form>
      </div>
    </>
  )
}

export default ProjectBlogCreate
