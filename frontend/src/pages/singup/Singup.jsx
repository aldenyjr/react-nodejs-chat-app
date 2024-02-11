import GenderCheckbox from './GenderCheckbox';

const SingUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300 mb-4">
          Sing Up
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form>
          <div>
            <label className="label p-2 mb">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input type="text" placeholder="Enter Full Name" className="input input-bordered input-primary w-full max-w-xs" />
          </div>
          <div className="mt-2 mb-2">
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input type="text" placeholder="Enter username" className="input input-bordered input-primary w-full max-w-xs" />
          </div>
          <div className="mt-2 mb-2">
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input type="password" placeholder="Enter password" className="input input-bordered input-primary w-full max-w-xs" />
          </div>

          <div className="mt-2 mb-2">
            <label className="label">
              <span className="text-base label-text">Confirm password</span>
            </label>
            <input type="password" placeholder="Enter confirm password" className="input input-bordered input-primary w-full max-w-xs" />
          </div>
          <a href="#" className="text-sm hover:underline hover:text-blue-600 inline-blocke">
            Already have an account?
          </a>
          <GenderCheckbox />
          <div>
            <button className="btn btn-block btn-sm mt-2 btn-primary">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingUp;
