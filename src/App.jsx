import { useState } from "react";

// Components
import { SignIn, SignUp } from './components/auth';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./components/routes/AppRoutes";
import Alert from "./components/utils/Alert";
import { LoadingProvider } from './contexts/LoadingContext';
import { AlertProvider } from './contexts/AlertContext';

function App() {

  const [open, setOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false)

  const handleSidebar = () => {
    const sidebar = document.querySelector("#sidebar");
    const sidebarContainer = document.querySelector("#sidebar-container");
    if (open) {
      sidebarContainer.classList.add('hidden')
      sidebar.classList.remove('w-[75%]')
      sidebar.classList.remove('md:w-80')
      sidebar.classList.add('w-0')
      setOpen(false);
    } else {
      sidebarContainer.classList.remove('hidden')
      sidebar.classList.add('w-[75%]')
      sidebar.classList.add('md:w-80')
      sidebar.classList.remove('w-0')
      setOpen(true);
    }
  };


  const handleLoginForm = () => {
    setShowLoginForm(!showLoginForm)
  }

  const handleSignupForm = () => {
    setShowSignupForm(!showSignupForm)

  }

  const handleLoginSignup = () => {
    handleLoginForm();
    handleSignupForm();
  }



  return (
    <LoadingProvider>
      <AlertProvider>
        <div id="html">
          <Alert visible={true} msg={'Account Created!'} />
          <Navbar handleSidebar={handleSidebar} handleLoginForm={handleLoginForm} />
          <Sidebar handleSidebar={handleSidebar} handleLoginForm={handleLoginForm} />
          <div className="pt-12 min-h-[100vh] md:pt-16" >
            {showLoginForm && <SignIn handleLoginForm={handleLoginForm} handleLoginSignup={handleLoginSignup} />}
            {showSignupForm && <SignUp handleSignupForm={handleSignupForm} handleLoginSignup={handleLoginSignup} />}
            <AppRoutes />
          </div>
          <div className="flex justify-center border-t min-h-10 mt-4 border-stone-500 w-full p-1">
            blah, blah, blah
          </div>
        </div>
      </AlertProvider>
    </LoadingProvider>
  );
}

export default App

