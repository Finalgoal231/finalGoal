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

export default SelectBoxSmall;
