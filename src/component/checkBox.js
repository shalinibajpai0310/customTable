import React from "react";

const CheckBox = props => {
  const { id, name,checked,onChange } = props;
  return (
    <li className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        name={id}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={id}>
        {name}
      </label>
    </li>
  );
};
export default CheckBox;
