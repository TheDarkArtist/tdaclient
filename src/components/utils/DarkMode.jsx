import React, { useEffect, useRef, useState } from 'react'

const DarkMode = () => {
  const e = document.getElementById('html');
  const [darkMode, setDarkMode ] = useState(()=>{
    const storedMode = localStorage.getItem('darkMode')
    return storedMode ? JSON.parse(storedMode): true;
  });

  useEffect(() =>{
    darkMode ? e.classList.add('dark') : e.classList.remove('dark')
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])


  const handleDarkMode = () =>{
    setDarkMode((prevMode) => !prevMode)

  }


  return (
    <div className='flex text-sm'>
    <div className='pr-2'>DarkMode</div>
    <input type='checkbox' checked={darkMode} onChange={handleDarkMode}/>
    </div>
  )
}

export default DarkMode
