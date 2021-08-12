import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Switcher = ({
  onChange,
  defaultValue,
  disabled,
  onText,
  offText,
  labelPosition,
  value,
  size,
}) => {
  const [state, setState] = useState(false);

  const onChangeHandler = () => {
    const value = !state;
    onChange(value);
    setState(value);
  };

  useEffect(() => {
    if (defaultValue) {
      setState(true);
      onChange(true);
    }
  }, []);

  useEffect(() => {
    setState(value);
  }, [value]);

  const labelClasses = {
    left: "label-Left",
    right: "label-Right",
    top: "label-Top",
    bottom: "label-Bottom",
  };

  const width = size === "big" ? 85 : "small" ? 55 : undefined;
  const height = size === "big" ? 35 : "small" ? 25 : undefined;
  const widthBall = size === "big" ? 30 : "small" ? 20 : undefined;
  const heightBall = size === "big" ? 30 : "small" ? 20 : undefined;

  return (
    <div
      className={`${labelClasses[labelPosition]} ${disabled ? "disabled" : ""}`}
    >
      {state ? onText : offText}
      <div
        className={state ? "switcher" : "switcherOff"}
        onClick={onChangeHandler}
        style={{
          "--v-width": `${width}px`,
          "--v-height": `${height}px`,
          "--v-widthBall": `${widthBall}px`,
          "--v-heightBall": `${heightBall}px`,
        }}
      >
        <div className={state ? "circle" : "circleOff"}></div>
      </div>
    </div>
  );
};

Switcher.defaultProps = {
  disabled: false,
  size: "small",
  labelPosition: "left",
  defaultValue: false,
  value: false,
};

Switcher.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.bool,
  disabled: PropTypes.bool,
  onText: PropTypes.string,
  offText: PropTypes.string,
  labelPosition: PropTypes.string,
  value: PropTypes.bool,
  size: PropTypes.string,
};

export default Switcher;
