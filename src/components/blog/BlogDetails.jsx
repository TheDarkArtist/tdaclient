import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/Firebase';
import { useParams } from 'react-router-dom';
import { DNA } from 'react-loader-spinner';

import BlogBar from './BlogBar';
import MarkdownRenderer from '../utils/MarkdownRenderer';
import { useLoadingContext } from '../../contexts/LoadingContext';

const BlogDetails = () => {
  const [blog, setBlog] = useState([]);
  const { id } = useParams();
  const { loading, showLoading, hideLoading } = useLoadingContext();

  useEffect(() => {
    const fetchBlog = async () => {
      showLoading();
      const docRef = doc(db, 'blog', id)
      const docSnap = await getDoc(docRef);
      setBlog(docSnap.data());
      hideLoading();
    }
    fetchBlog()
  }, []);


  return (
    <>
      <BlogBar id={id} condition={true} />
      {loading ? (<div className='fixed flex w-full top-1/2 justify-center' ><DNA /></div>) : (
        <div>
          <div className='flex justify-center' >
            <div className='p-4 w-full md:max-w-[60rem]' >
              <div className='text-2xl font-bold text-stone-200' >{blog.title}</div>
              <div className='py-4'> <MarkdownRenderer content={blog.body} /> </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BlogDetails
