import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BlogBar = ({id, condition }) => {

  return (
    <div className='flex justify-between py-1 px-4 bg-gradient-to-tl from-green-900 via-green-700 to-green-900' >
      <Link to={'/blog'} className='text-blue-300 underline' > Blogs </Link>
      <span className='text-blue-300 underline' >
        {condition &&  <Link className='px-1' to={`/blog/delete/${id}`} >Delete</Link>}
        {condition && <Link className='px-1' to={`/blog/update/${id}`} >Update </Link>}
        <Link className='px-1 cursor-pointer' to='/blog/create'>Create</Link>

      </span>
    </div>
  )
}

export default BlogBar
