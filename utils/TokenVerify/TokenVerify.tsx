import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TokenVerify: React.FC<{ onExpire: () => void }> = ({ onExpire }) => {
  useEffect(() => {
    toast.error('Session expired, please login again...', {
      position: "top-right",
      autoClose: 1500,
      onClose: onExpire
    });
    
  }, [onExpire]);

  return <ToastContainer />;
};

export default TokenVerify;