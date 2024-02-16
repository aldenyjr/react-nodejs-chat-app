import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const userSingup = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
    const sucess = handerInputError({ fullName, userName, password, confirmPassword, gender });
    if (!sucess) return false;

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, userName, password, confirmPassword, gender }),
      });

      const data = await res.json();
      if (data.message) {
        throw new Error(data.message);
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
  return { loading, signup };
};

export default userSingup;

function handerInputError({ fullName, userName, password, confirmPassword, gender }) {
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error('Plase fill in all fields');
    return false;
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }

  return true;
}
