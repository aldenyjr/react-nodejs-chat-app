import { Link } from 'react-router-dom';
import GenderCheckbox from './GenderCheckbox';
import { useState } from 'react';
import userSingup from '../../hooks/userSingup';

const SingUp = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const { loading, signup } = userSingup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300 mb-4">
          Sing Up
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2 mb">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="input input-bordered input-primary w-full max-w-xs"
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>
          <div className="mt-2 mb-2">
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered input-primary w-full max-w-xs"
              value={inputs.userName}
              onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
            />
          </div>
          <div className="mt-2 mb-2">
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered input-primary w-full max-w-xs"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div className="mt-2 mb-2">
            <label className="label">
              <span className="text-base label-text">Confirm password</span>
            </label>
            <input
              type="password"
              placeholder="Enter confirm password"
              className="input input-bordered input-primary w-full max-w-xs"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>
          <Link to="/login" className="text-sm hover:underline hover:text-blue-600 inline-blocke">
            Already have an account?
          </Link>
          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
          <div>
            <button className="btn btn-block btn-sm mt-2 btn-primary" disabled={loading}>
              {loading ? <span className="loading loading-spinner"> </span> : 'Sing Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingUp;
