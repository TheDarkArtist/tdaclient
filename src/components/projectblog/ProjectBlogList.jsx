import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../../services/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { RotatingLines } from 'react-loader-spinner';

import BlogBar from './ProjectBlogBar';
import Search from '../utils/Search';

import { useLoadingContext } from '../../contexts/LoadingContext';

const ProjectBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const { loading, showLoading, hideLoading } = useLoadingContext();

  useEffect(() => {
    const fetchBlogs = async () => {
      showLoading();
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'projectBlog'))
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        })
        setBlogs(list);
        setFilteredBlogs(list);
      }
      catch (err) {
        console.log(err)
      }
      hideLoading();
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
      {loading ? (<div className='fixed flex top-1/2 w-full justify-center'><RotatingLines height="40" width="40" /></div>) : (
      <div>
        <div className='py-6 w-full flex justify-center' ><Search parameter={'projects'} onSearch={handleSearch} /></div>
        <div className='m-1' >
          <div className='mx-2' >
            <div className=' text-xl md:px-8'>My GitHub Projects</div>
            <div className='text-sm text-black dark:text-green-100 md:px-8'>These projects will open on github for now, though, in future, i plan to add a kind of blog where i will describe each of these projects in detail with comment section.</div>
            <ul className='flex flex-wrap justify-start w-full  py-2' >
              {blogs ? filteredBlogs.map((blog) => (
                <Link key={blog.id} className='w-full md:mx-6 my-2 md:w-[30%] md:min-w-[25rem] md:max-w-[35rem]' to={`details/${blog.id}`}>
                  <div className='w-full border rounded-b border-green-500 my-2 lg:mx-2 shadow-md shadow-green-700' >
                    <div className='bg-green-700 dark:bg-red-900 w-full px-2 text-white font-bold py-1'>{blog.title}</div>
                    <div className='flex w-full justify-end pr-2' >
                      {blog.languages.map((language) => (<span key={blog.id} className=' m-1 text-sm font-bold text-red-950 dark:text-green-400'>{language}</span>))}
                    </div>
                  </div>
                </Link>
              )) : ' no blogs found '}

            </ul>
          </div>
        </div>
      </div>)}
    </>
  )
}

export default ProjectBlogList



