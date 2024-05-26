import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {useAlertContext} from '../../contexts/AlertContext';

import tda from "../../assets/tda.png"
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from '../../contexts/AuthContext';



const SignIn = ({ handleLoginForm, handleLoginSignup }) => {
        const { user, login, forgotPassword } = useAuth();
        const identifierRef = useRef();
        const passwordRef = useRef();
        const navigate = useNavigate();
        const {alert, showAlert} = useAlertContext();

        const handleOnSubmit = async (e) => {
                e.preventDefault();
                login(identifierRef.current.value.trim(), passwordRef.current.value.trim());
                navigate('/');
                handleLoginForm();
                showAlert('Signed In!');
        };

        const handleForgotPassword = () => {
                forgotPassword(identifierRef.current.value)
                showAlert('Password Rest Link Sent!');
        }

        return (
                <>
                        <div onClick={handleLoginForm} className="h-[100%] absolute top-0 z-30 w-full backdrop-blur-sm flex justify-center shadow-inner shadow-lg shadow-orange-900"></div>
                        <div className="w-full h-0 flex justify-center" >
                                <div className="flex fixed flex-col justify-start items-stretch bg-blue-950 p-2 min-h-[35rem] md:min-h-[30rem] z-40 w-[80%] md:w-[20rem] top-40 border border-red-500 shadow shadow-orange-900 rounded-md ">
                                        <div className="w-full mb-2 text-center text-blue-300 text-2xl font-bold">Sign In</div>
                                        <AiOutlineClose onClick={handleLoginForm} className="absolute right-4 top-4" />
                                        <div className="w-full flex justify-center py-6"><img className="mix-blend-overlay h-32 w-40 animate-pulse" src={tda} alt="" /></div>
                                        <form className="flex flex-col items-center w-full" onSubmit={handleOnSubmit}>
                                                <input required type="text" ref={identifierRef} placeholder="Email/Username" className="bg-green-800 focus:outline-none py-1 px-2 my-1 w-[90%]" />
                                                <input required type="password" ref={passwordRef} placeholder="Password" className="bg-green-800 focus:outline-none py-1 px-2 my-1 w-[90%]" />
                                                <button className="bg-blue-800 my-2 px-2 py-1 w-[90%]" >Sign In</button>
                                        </form>
                                        <div className="flex w-full my-2 justify-evenly" >
                                                <div onClick={handleLoginSignup} className="cursor-pointer flex w-full justify-center text-blue-400 hover:text-blue-500" >Create Account</div>
                                                <div onClick={handleForgotPassword} className="cursor-pointer flex w-full justify-center text-blue-400 hover:text-blue-500" >Forgot Password</div>
                                        </div>
                                        <div className="flex my-4 flex-col w-full px-4" >
                                                <div className="px-1 py-2 flex flex-wrap" >
                                                </div>
                                        </div>

                                </div>
                        </div>
                </>
        )

}


export default SignIn;
