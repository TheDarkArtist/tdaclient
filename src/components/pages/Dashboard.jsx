import { useState } from 'react'
import { HiMenu } from "react-icons/hi";
import { Projects, Profile, Blog, Resume, Messages, Users } from '../Dashboard';

import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ onItemClick, handleSidebar }) => {
  const sidebarItems = ['Profile', 'Projects', 'Blog', 'Resume', 'Messages', 'Users']
  return (
    <ul id='ccs' className='bg-zinc-950 w-0 md:w-60 fixed md:block overflow-hidden h-full border-r border-zinc-700 transition-all ease-in-out delay-100'>
      <li className='flex items-center py-4 px-2 text-xl bg-black text-stone-400' >
        <HiMenu className='md:hidden w-8 h-8  mr-4 text-stone-600' onClick={handleSidebar} />
        <span>Dashboard</span>
      </li>
      {sidebarItems.map((item, index) => (
        <li className='border-t border-b hover:bg-green-950 text-stone-400 border-zinc-800 cursor-pointer px-4 py-1 w-full' key={index} onClick={() => onItemClick(item)}>{item}</li>
      ))}
    </ul>
  )
}




const RightPannel = ({ selectedComponent }) => {
  const componentMap = {
    Profile,
    Projects,
    Blog,
    Resume,
    Messages,
    Users,
  }
  const SelectedComponent = componentMap[selectedComponent]
  return <div className='w-full min-h-[100%] overflow-hidden bg-black md:ml-60'>
    {SelectedComponent ? <SelectedComponent /> : <Profile />}
  </div>
}





const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleItemClick = (item) => {
    setSelectedComponent(item);
    handleSidebar();
  }

  const handleSidebar = () => {
    const ccs = document.getElementById('ccs');
    if (!open) {
      ccs.classList.remove('w-0');
      ccs.classList.add('w-60');
      setOpen(!open)
    } else {
      ccs.classList.remove('w-60');
      ccs.classList.add('w-0')
      setOpen(!open)
    }
  }

  return (
    <>
      <div className="flex fixed justify-between items-center px-2 w-full h-10 bg-green-950">
        <div>{currentUser && <HiMenu onClick={handleSidebar} className=' h-8 w-8 text-stone-400 cursor-pointer' />}</div>
        <div className='font-light text-center text-white w-full' >COMMAND CENTER</div>
        <div className='font-light text-white'>{currentUser && currentUser.username}</div>
      </div>
      {currentUser ? <div className='flex w-full min-h-[100vh]'>
        <Sidebar handleSidebar={handleSidebar} onItemClick={handleItemClick} />
        <RightPannel selectedComponent={selectedComponent} />
      </div> : <div className="flex min-h-[86vh] w-full justify-center items-center">You need to login first!</div>}
    </>
  )
}





export default Dashboard
