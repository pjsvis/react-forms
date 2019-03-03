export = select
export as namespace select

declare namespace select {

  interface Option {
    label: string;
    value: string | boolean | number;
  }
}
