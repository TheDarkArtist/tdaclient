import { GoX } from "react-icons/go";
import { Link } from 'react-router-dom';
import {AiOutlineUser} from 'react-icons/ai';
import {useAlertContext} from '../contexts/AlertContext';

import {useAuth} from '../contexts/AuthContext';
import DarkMode from './utils/DarkMode';


const sbar = ({ handleSidebar, handleLoginForm }) => {

  const {currentUser, logout} = useAuth();
  const {showAlert} = useAlertContext();

  document.querySelectorAll('#sidebar-items span').forEach(li => {
    li.addEventListener('click', () => {
      handleSidebar()
    });
  });

  const handleLogout = () =>{
    logout();
    showAlert('Signed Out!');
  }

  return (
    <>
      <div id='sidebar-container' onClick={handleSidebar} className='hidden h-[100%] w-[100%] fixed  top-0 flex justify-end z-40 overflow-hidden opacity-40 bg-black'>
      </div>

      <div id='sidebar' className=' min-h-[100%] dark:bg-zinc-950 dark:text-white bg-stone-300 w-0  transition-all duration-100 ease-in-out overflow-hidden fixed top-0 right-0 z-40 flex flex-col justify-top align-bottom shadow-l shadow-lg shadow-neutral-700 '>
        <div className="bg-[#1F1F1F] text-white shadow shadow-neutral-700 mb-2 h-20 flex items-center justify-between py-2 ">
          <div className="flex items-center">
            <div className='border w-14 h-14 mx-2 flex justify-center items-center rounded-[50%] p-1' >
            <AiOutlineUser className='h-14 w-14' />
            </div>
            <div>
              <div className="font-bold">{currentUser && currentUser.name.first} {currentUser && currentUser.name.last}</div>
              <div className="text-sm">{currentUser && currentUser.username}</div>
            </div>
          </div>
          <GoX
            onClick={handleSidebar}
            className="h-7 w-7 p-1 m-2 bg-[#181818] rounded text-green-900 hover:text-green-100 cursor-pointer transition ease-in-out delay-75"
          />
        </div>
        <div id='sidebar-items' className="flex flex-col justify-start text-black dark:text-white ">
          <span> <Link  className='border-t border-b  border-red-950 flex items-center w-full font-light  h-10 px-4 py-2 hover:bg-[#3a383a56] cursor-pointer' to="/dashboard">Dashboard</Link></span>
          { !currentUser && <span className='border-t border-b  border-red-950 flex items-center w-full font-light  h-10 px-4 py-2 hover:bg-[#3a383a56] cursor-pointer' onClick={handleLoginForm}>Login</span>}
          { currentUser && <span onClick={handleLogout} className='border-t border-b  border-red-950 flex items-center w-full font-light  h-10 px-4 py-2 hover:bg-[#3a383a56] cursor-pointer' >Log Out</span>}
          <div className='border-t border-b  border-red-950 flex items-center w-full font-light  h-10 px-4 py-2 hover:bg-[#3a383a56] cursor-pointer' ><DarkMode /></div>
          <span ><Link  className='border-t border-b  border-red-950 flex items-center w-full font-light  h-10 px-4 py-2 hover:bg-[#3a383a56] cursor-pointer' to="/blog" >Blog</Link></span>
          <span ><Link  className='border-t border-b  border-red-950 flex items-center w-full font-light  h-10 px-4 py-2 hover:bg-[#3a383a56] cursor-pointer' to="about/#about-contact-send-button" >Contact</Link></span>

        </div>
      </div>
    </>
  )

}

export default sbar;
