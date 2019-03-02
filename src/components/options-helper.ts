
export const getSelectedOption = (itemValue: string, options: vis.SelectOption[]) => {
  return options.filter(x => x.value === itemValue)[0];
};

export const getSelectedOptions = (itemValues: string[], options: vis.SelectOption[]) => {
  if (!itemValues) { [] }
  return itemValues.map(x => getSelectedOption(x, options))
};


export const getOptionValue = (opt: any) => {
  if (!opt) { return null }
  return opt.value;
}

export const getOptionValues = (opts: any) => {
  if (!opts) { return null }
  return opts.map((x: vis.SelectOption) => x.value);
}



