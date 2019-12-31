import React, { Fragment } from "react";
import classnames from "classnames";

const InputGroup = ({ name, placeholder, type, value, error, onChange }) => {
  return (
    <Fragment>
      <input
        className={classnames("", {
          invalid: error
        })}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p>{error}</p>}
    </Fragment>
  );
};

export default InputGroup;
