import { FcSupport } from "react-icons/fc";

const Message = ({msg}) => {
  return (
    <div className="px-2 p-1 w-full border-t border-b border-pink-500 bg-gradient-to-br from-red-950 via-cyan-950 to-red-950  flex items-center z-40 shadow-md shadow-zinc-700 hover:font-bold" >
      <FcSupport className=" mr-2" /> 
      <p>{msg}</p>
    </div>
  );
};

export default Message;

