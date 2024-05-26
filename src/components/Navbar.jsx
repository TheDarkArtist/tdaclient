import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

import {useAuth} from '../contexts/AuthContext';


const Navbar = ({handleSidebar, handleLoginForm}) => {
  const {currentUser} = useAuth();

  return ( 
    <div className="h-12 md:h-14 lg:h-14 flex justify-between items-center fixed border-b border-stone-500 px-1 md:px-2 bg-gradient-to-b text-white from-red-950 via-red-950 to-black shadow-b shadow-zinc-900 shadow-sm w-full z-30">
      <div className="hover:shadow-blue-500 flex justify-center items-center">
        <div className="text-xl mx-1  ">TheDarkArtist</div>
      </div>

      <div className="hidden md:block">To Infinity & Beyond</div>
      <div>
        <div className="flex items-center ">
          <div className="px-1 lg:px-2 hover:text-slate-400 cursor-pointer">
            <Link to="/">Home</Link>
          </div>
          <div className="px-1 lg:px-2 hover:text-slate-400 cursor-pointer">
            <Link to="/projects">Projects</Link>
          </div>
          <div className="px-1 lg:px-2 hover:text-slate-400 cursor-pointer">
            <Link to="/about">About</Link>
          </div>
          { !currentUser && <div onClick={handleLoginForm} className="px-1 lg:px-2 hidden md:block hover:text-slate-400 cursor-pointer">
            login
          </div>}
          <div className="ml-1 md:ml-2 lg:mx-2 cursor-pointer">
              <AiOutlineUser onClick={handleSidebar} className="border p-[2px] rounded-[50%] w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
