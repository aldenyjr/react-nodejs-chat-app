import { useState } from 'react';
import { Link } from 'react-router-dom';
import userLogin from '../../hooks/userLogin';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loading, login } = userLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2 mb">
              <span className="text-base label-text text-gray-300">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered input-primary w-full max-w-xs"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-2 mb-2">
            <label className="label">
              <span className="text-base label-text text-gray-300">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered input-primary w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 inline-blocke mt-2 text-gray-600">
            {"Don't"} have account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 btn-primary text-gray-300">  {/* disabled={loading} */}
              {loading ? <span className="loading loading-dots loading-sm"></span> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
