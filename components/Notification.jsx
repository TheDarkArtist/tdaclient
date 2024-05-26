import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css';

const Notification = () => {
  return (
    <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
    />
  )
}

export const notify = (message, type = 'success') => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'info':
      toast.info(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    default:
      toast(message);
  }
};

export default Notification
