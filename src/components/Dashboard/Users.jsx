import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { useAuth } from '../../contexts/AuthContext';
import Search from '../utils/Search';
import { db } from '../../services/Firebase';

const Users = () => {
  const [users, setUsers] = useState(null);
  const { currentUser } = useAuth();
  const usersHeader = [<input type="checkbox" />, 'No.', 'Name', 'Username', 'Access', 'Email', 'Action']

  useEffect(() => {
    const fetchUsers = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'users'))
        querySnapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() })
        })
        setUsers(list);
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsers();
  }, [])


  if (currentUser.access != 'root') {
    return (
      <div className='h-96 flex justify-center items-center' >
        <span className='md:text-2xl' >You Are Not Authorized To Access This Area</span>
      </div>
    )
  }

    const onSearch = () => {
        console.log('Dashboard >> Users >> search()');
     }



  return (
    <div className='min-h-[80vh] mt-10 w-full ' >
      <div className='w-full flex justify-center py-4'><Search parameter={'users'} onSearch={onSearch} /></div>

      <div className='w-full text-sm md:text-lg flex flex-col items-center justify-center my-10' >

        <div className='bg-green-950 border border-green-900 h-10 w-full flex justify-between items-center px-2 mx-2 md:w-[80%]' >
          <span className='mx-2 font-bold text-lg'>Users</span>
          <div className='p-2 underline text-blue-500' >
            <span className='mx-2 cursor-pointer'>delete</span>
          </div>
        </div>

        <div className='w-full text-green-400 md:w-[80%]' >
          <div className='mx-.5 overflow-y-auto overflow-x-auto ' >
            <table className='w-full border-collapse ' >
              <thead>
                <tr className='border'>
                  {usersHeader.map(header => (
                    <td className='p-2 border border-green-900'>{header}</td>
                  ))
                  }
                </tr>
              </thead>
              <tbody>
                {users ? users.map((user, index) => [
                  <tr key={index} >
                    <td className='p-2 border border-green-900' ><input className='accent-green-700 ' type="checkbox" /></td>
                    <td className='p-2 border border-green-900 ' >{index}</td>
                    <td className='p-2 border border-green-900 ' >{user.name.first + ' ' + user.name.last}</td>
                    <td className='p-2 border border-green-900 ' >{user.username}</td>
                    <td className='p-2 border border-green-900 ' >{user.access}</td>
                    <td className='p-2 border border-green-900 ' >{user.email}</td>
                    <td className='p-2 border border-green-900 underline text-blue-500' >
                      <span className='mx-2 cursor-pointer'>view</span>
                      <span className='mx-2 cursor-pointer'>delete</span>
                    </td>
                  </tr>
                ]) : 'no users'}

              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div >
  )
}

export default Users
