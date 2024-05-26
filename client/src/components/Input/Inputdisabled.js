function InputDisabled({
  name,
  labelTitle,
  labelStyle,
  type,
  value,
  containerStyle,
  placeholder,
  setHandleKeyDown,
  onChange,
}) {
  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <input
        value={value}
        name={name}
        type={type || "text"}
        placeholder={placeholder || ""}
        onChange={onChange}
        onKeyDown={setHandleKeyDown}
        className="input  input-bordered w-full input-disabled"
        readOnly
      />
    </div>
  );
}

export default InputDisabled;
