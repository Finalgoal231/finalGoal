import React from "react";

function SelectBoxBig(props) {
  const { options } = props;
  return (
    <div className={`${props.container} flex items-center`}>
      <label className="w-40">{props.label}</label>
      <select
        className={`input select-bordered ${props.class}`}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      >
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

export default SelectBoxBig;
