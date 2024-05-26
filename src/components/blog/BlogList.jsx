import { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';

import { db } from '../../services/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import {useLoadingContext} from '../../contexts/LoadingContext';

import BlogBar from './BlogBar';
import Search from '../utils/Search';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const {loading, showLoading, hideLoading}  = useLoadingContext();

  useEffect(() => {
    const fetchBlogs = async () => {
      showLoading();
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'blog'))
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        })
        setBlogs(list);
        setFilteredBlogs(list); 
      }
      catch (err) {
        console.log(err)
      }
      hideLoading()
    }


    fetchBlogs();
  }, []);

  const handleSearch = (searchTerm) =>{
    const filtered = blogs.filter(blog=>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredBlogs(searchTerm === '' ? blogs : filtered)
  }


  return (
    <>
      <BlogBar />

      {loading ? (<div className='absolute flex w-full top-1/2 justify-center' ><RotatingLines height='40' width='40' strokeColor='red' /></div>) : (

      <div>
      <div className='py-6 w-full flex justify-center' ><Search parameter={'blogs'} onSearch={handleSearch} /></div>
      <div className='flex justify-center p-1 w-full' >
        <ul className='w-full p-1 md:w-[80%]'>
          {blogs ? filteredBlogs.map((blog, index) => (
            <Link key={index} to={`details/${blog.id}`}>
              <li key={index} className='bg-gradient-to-bl w-full min-h-[5rem] overflow-hidden border border-green-700 rounded-b  my-4'>
                <div className='bg-red-900 w-full px-2 font-bold text-white py-1'>{blog.title}</div>
                <div className='px-2 py-1 text-sm font-bold '>{blog.body.substring(0,100)}...</div>
                <div className=' text-right text-sm pb-0.5 pr-1 text-stone-400' >June 2. 2005</div>
              </li>
            </Link>
          )) : ' no blogs found '}
        </ul>
      </div>
      </div>
      )}
    </>
  )
}

export default BlogList
