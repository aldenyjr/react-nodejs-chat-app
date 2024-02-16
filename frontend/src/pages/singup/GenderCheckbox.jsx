const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex mt-2 mb-2 items-center">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer ${selectedGender === 'male' ? 'selected' : ''}`}>
          Gender:
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-sm"
            checked={selectedGender === 'male'}
            onChange={() => onCheckboxChange('male')}
          />
          <span className="label-text">Male</span>
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer ${selectedGender === 'female' ? 'selected' : ''}`}>
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-sm"
            checked={selectedGender === 'female'}
            onChange={() => onCheckboxChange('female')}
          />
          <span className="label-text">Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
