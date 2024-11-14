function Input({ name, type, placeholder, setHandleKeyDown, onChange, className }) {
    return (
        <input
            name={name}
            type={type || "text"}
            placeholder={placeholder || ""}
            onChange={onChange}
            onKeyDown={setHandleKeyDown}
            className={`w-full ${className}`}
        />
    );
}

Input.propTypes = {};

export default Input;
