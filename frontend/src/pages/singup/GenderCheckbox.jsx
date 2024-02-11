const GenderCheckbox = () => {
  return (
    <div className="flex mt-2 mb-2 items-center">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          Gender:
          <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
          <span className="label-text">Male</span>
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
          <span className="label-text">Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
