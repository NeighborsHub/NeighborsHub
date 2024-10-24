"use client";
import { useState } from "react";

export const useInputHandler = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = ({ target: { value } }) => setValue(value);
  return { value, onChange };
};

export const useCheckboxHandler = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = ({ target: { checked } }) => setValue(checked);
  return { checked: value, onChange };
};

export const useInputHandlerWithTypeCheck = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = ({ target: { value, validity } }) => {
    if (!validity.valid && value) return;
    setValue(value);
  };
  return { value, onChange };
};

export const useInputHandlerWithCallback = (initialValue, callback) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e.target.value);
    callback(e);
  };
  return { value, onChange };
};
