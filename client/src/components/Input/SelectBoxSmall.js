import React from "react";

function SelectBoxSmall(props) {
  const { options } = props;
  return (
    <div className={`${props.container} inline-block`}>
      <select
        className={`input select-bordered ${props.class}`}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        required
      >
        <option></option>
        {options.map((o, k) => {
          return (
            <option value={o} key={k}>
              {o}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectBoxSmall;
