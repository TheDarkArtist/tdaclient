import { useEffect, useState } from 'react';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';

import {useAuth} from '../../contexts/AuthContext';
import Search from '../utils/Search';
import { db } from '../../services/Firebase';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState(null);
  const {currentUser} = useAuth();
  const blogsHeader = [<input type="checkbox" />, 'No.', 'Title', 'Author', 'Action']

  useEffect(() => {
    const fetchBlogs = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'blog'))
        querySnapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() })
        })
        setBlogs(list);
      } catch (error) {
        console.log(error)
      }
    }

    fetchBlogs();
  }, [Blog, blogs])




  if(currentUser.access != 'root'){
    return(
    <div className='h-96 flex justify-center items-center' >
      <span className='md:text-2xl'>You Are Not Authorized To Access This Area.</span>
    </div>
    )
  }

  const handleDelete = async (id) =>{
      await deleteDoc(doc(db, 'blog', id))
  }

    const onSearch = () =>{
        console.log('Dashboard >> Blog >> search()')
    }


  return (
    <div className='min-h-[80vh] mt-10 w-full ' >
      <div className='w-full flex justify-center py-4'><Search parameter={'blogs'} onSearch={onSearch} /></div>

      <div className='w-full text-sm md:text-lg flex flex-col items-center justify-center my-10' >

        <div className='bg-green-950 border border-green-900 h-10 w-full flex justify-between items-center px-2 mx-2 md:w-[80%]' >
          <span className='mx-2 font-bold text-lg'>Blogs</span>
          <div className='p-2 underline text-blue-500' >
            <span className='mx-2 cursor-pointer'>delete</span>
          </div>
        </div>

        <div className='w-full text-green-400 md:w-[80%]' >
          <div className='mx-.5 overflow-y-auto overflow-x-auto ' >
            <table className='w-full border-collapse ' >
              <thead>
                <tr className='border'>
                  {blogsHeader.map(header => (
                    <td className='p-2 border border-green-900'>{header}</td>
                  ))
                  }
                </tr>
              </thead>
              <tbody>
                {blogs ? blogs.map((blog, index) => [
                  <tr key={index} >
                    <td className='p-2 border border-green-900' ><input className='accent-green-700 ' type="checkbox" /></td>
                    <td className='p-2 border border-green-900 ' >{index}</td>
                    <td className='p-2 border border-green-900 ' >{blog.title}</td>
                    <td className='p-2 border border-green-900 ' >undefined</td>
                    <td className='p-2 border border-green-900 underline text-blue-500' >
                      <Link to={`/blog/details/${blog.id}`}><span className='mx-2 cursor-pointer'>view</span></Link>
                      <Link to={`/blog/update/${blog.id}`}><span className='mx-2 cursor-pointer'>update</span></Link>
                      <span onClick={()=>handleDelete(blog.id)} className='mx-2 cursor-pointer'>delete</span>
                    </td>
                  </tr>
                ]) : 'no blogs'}

              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div >
  )
}


export default Blog
