import React, { useEffect, useState } from 'react'

const TopLoadingBar = () => {
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timeout);

  }, []) 

  return (
     loading ? <div className='bg-blue-400 z-50 h-20 w-full' ></div> : null
  )
}

export default TopLoadingBar
