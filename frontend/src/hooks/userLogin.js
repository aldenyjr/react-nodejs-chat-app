import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const userLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (userName, password) => {
    const sucess = handerInputError(userName, password);
    if (!sucess) return false;

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      //LocalStorage
      localStorage.setItem('chat-user', JSON.stringify(data));
      //Context
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default userLogin;

function handerInputError(userName, password) {
  if (!userName || !password) {
    toast.error('Plase fill in all fields');
    return false;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }

  return true;
}
