
export const singleSelectedOption = (itemValue: string, options: vis.SelectOption[]) => {
  return options.filter(x => x.value === itemValue)[0];
};

export const multiSelectedOptions = (itemValues: string[], options: vis.SelectOption[]) => {
  if (!itemValues) { [] }
  return itemValues.map(x => singleSelectedOption(x, options))
};


export const singleOptionValue = (opt: any) => {
  if (!opt) { return null }
  return opt.value;
}

export const multiOptionValues = (opts: any) => {
  if (!opts) { return null }
  return opts.map((x: vis.SelectOption) => x.value);
}



