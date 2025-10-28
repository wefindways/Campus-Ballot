const FormInput = ({
  label,
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  required,
  extraInfo,
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={id || name}
        className="block text-lg font-semibold text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full mt-2 rounded-lg border border-gray-300 py-3 px-4 
                  focus:ring-2 focus:outline-none focus:ring-blue-400 
                   transition-all duration-200"
      />

      {extraInfo && <p className="text-sm text-gray-500 mt-1">{extraInfo}</p>}
    </div>
  );
};

export default FormInput;
