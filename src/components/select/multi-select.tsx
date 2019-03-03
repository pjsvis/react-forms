import * as React from 'react'
import Select from "react-select";
import { multiSelectedOptions } from './select-options-helper';

interface Props {
  name: string;
  caption: string;
  options: select.Option[];
  values: any
  onChange(ev:any): void
}

const inputStyle = "w-100 mb2"

export const MultiSelect = (props: Props) => {

  const { name, caption, options, values, onChange } = props
  return (
    <>
      <label htmlFor={name}>{caption}</label> <br />
      <Select
        name={name}
        id={name}
        className={inputStyle}
        value={multiSelectedOptions(values[name], options)}
        options={options}
        isMulti={true}
        onChange={onChange}
      />
    </>
  )
}