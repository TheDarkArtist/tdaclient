import React from 'react'

export const generateMetadata = ({params}) =>{

    return{
     title: params.username+"'s Blogs",
    }
}

const Layout = ({children}) => {
  return (
    <div>{children}</div>
  )
}

export default Layout
