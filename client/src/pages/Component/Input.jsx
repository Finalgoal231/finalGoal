export const Input = (prop) => {
  return (
    <div className="mb-4">
      <input
        type={prop.type}
        placeholder={`Enter your ${prop.name} here...`}
        name={prop.name}
        value={prop.value}
        className="w-full h-[52px] px-[12px] text-gray-700 border border-gray-300 hover:border-gray-500 rounded-[3px] outline-none focus:border-2 focus:border-gray-700"
        onChange={prop.onChange}
        required
      />
    </div>
  );
};
