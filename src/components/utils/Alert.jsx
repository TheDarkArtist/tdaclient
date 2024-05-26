import React, { useEffect } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { motion } from 'framer-motion';
import { useAlertContext } from '../../contexts/AlertContext';

const Alert = () => {
  const { alert, hideAlert } = useAlertContext();

  if (!alert)
    return null;

  const { message } = alert;

  useEffect(()=>{
    const timeoutId = setTimeout(()=>{
      hideAlert();
    },3000)
    return () => clearTimeout(timeoutId)
  },[hideAlert])

  return (
    <motion.div
     initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.5 }} 
      className={`fixed top-28 right-4 py-2 px-4 border border-green-700 w-96 bg-black text-white rounded-md`}
    >
      <div className='flex'>
      <p>{message}</p>
      <button className="ml-2 absolute right-2 top-2" onClick={hideAlert}>
        <AiOutlineClose />
      </button>
      </div>
    </motion.div>
  );
}

export default Alert  
