import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import {useAuth} from '../../contexts/AuthContext';
import Search from '../utils/Search';
import { db } from '../../services/Firebase';

const Messages = () => {
  const [messages, setMessages] = useState(null);
  const {currentUser} = useAuth();
  const messagesHeader = ['No.', 'Date', 'Message', 'Name', 'Email']

  useEffect(() => {
    const fetchMessages = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'messages'))
        querySnapshot.forEach(doc => {
          list.push({ ...doc.data() })
        })
        setMessages(list);
      } catch (error) {
        console.log(error)
      }
    }

    fetchMessages();
  }, [])

  if(currentUser.access != 'root'){
    return(
    <div className='h-96 flex justify-center items-center' >
      <span className='md:ctext-2xl'>You Are Not Authorized To Access This Area.</span>
    </div>
    )
  }

    const onSearch = () =>{
        console.log('on serach')
    }


  return (
     <div className='min-h-[80vh] mt-10 w-full ' >

      <div className='w-full flex justify-center py-4'><Search parameter={'messages'} onSearch={onSearch} /></div>

      <div className='w-full text-sm md:text-lg flex flex-col items-center justify-center my-10' >

        <div className='bg-green-950 border border-green-900 h-10 w-full flex justify-between items-center px-2 mx-2 md:w-[80%]' >
          <span className='mx-2 font-bold text-lg'>Messages</span>
          <div className='p-2 underline text-blue-500' >
            <span className='mx-2 cursor-pointer'></span>
          </div>
        </div>

        <div className='w-full text-green-400 md:w-[80%]' >
          <div className='mx-.5 overflow-y-auto overflow-x-auto ' >
            <table className='w-full border-collapse ' >
              <thead>
                <tr className='border'>
                  {messagesHeader.map(header => (
                    <td className='p-2 border border-green-900'>{header}</td>
                  ))
                  }
                </tr>
              </thead>
              <tbody>
                {messages ? messages.map((msg, index) => [
                  <tr key={index} >

                     <td className='p-2 border border-green-900 ' >{index}</td>
                     <td className='p-2 border border-green-900 ' >{Date(msg.createdAt)}</td>
                    <td className='p-2 border border-green-900 ' >{msg.msg}</td>
                    <td className='p-2 border border-green-900 ' >{msg.name}</td>
                    <td className='p-2 border border-green-900 ' >{msg.email}</td>
                  </tr>
                ]) : 'no messages'}

              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div >
  )
}


export default Messages;
