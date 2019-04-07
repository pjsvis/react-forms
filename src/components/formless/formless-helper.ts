
export const flavourOptions: select.Option[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

export const numOptions: select.Option[] = [
  { value: 100, label: "Chocolate" },
  { value: 200, label: "Strawberry" },
  { value: 300, label: "Vanilla" }
];

export const boolOptions: select.Option[] = [
  { value: true, label: "Is Chocolate" },
  { value: false, label: "Is not Chocolate" },

];

// you should prefer use composable functions
// in order to pass an validate function to the hook
export function required(value: any) {
  if (!value) {
    return `this field is required`;
  }
  return "";
}

export function validatePasswordConfirm(password: string, confirmPassword: string) {
  if (password !== confirmPassword) {
    return "password confirm is wrong";
  }
  return required(confirmPassword);
}

export interface FormValues {
  name: string;
  email:string;
  password: string;
  passwordConfirm: string;
  flavour: string;
  types: string[];
  aboutYou: string;
}
