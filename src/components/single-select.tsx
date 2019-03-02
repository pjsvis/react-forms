import * as React from 'react'
import Select from "react-select";
import { singleSelectedOption as selectedOption, multiSelectedOptions } from './select-options-helper';

interface Props {
  name: string;
  caption: string;
  options: vis.SelectOption[];
  values: any
  onChange(ev: any): void
}

const inputStyle = "w-100 mb2"

export const SingleSelect = (props: Props) => {

  const { name, caption, options, values, onChange } = props
  return (
    <>
      <label htmlFor={name}>{caption}</label> <br />
      <Select
        name={name}
        id={name}
        className={inputStyle}
        value={selectedOption(values[name], options)}
        options={options}
        onChange={onChange}
      />
    </>
  )
}
