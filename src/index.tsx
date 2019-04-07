import React, { useState } from "react";
import ReactDOM from "react-dom";
import "tachyons";
import useFormless from "react-useformless";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { singleOptionValue , multiOptionValues} from "./components/select/select-options-helper";
import { SingleSelect} from './components/select/single-select';
import { MultiSelect } from './components/select/multi-select';


const flavourOptions: select.Option[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const numOptions: select.Option[] = [
  { value: 100, label: "Chocolate" },
  { value: 200, label: "Strawberry" },
  { value: 300, label: "Vanilla" }
];

const boolOptions: select.Option[] = [
  { value: true, label: "Is Chocolate" },
  { value: false, label: "Is not Chocolate" },

];

// you should prefer use composable functions
// in order to pass an validate function to the hook
function required(value: any) {
  if (!value) {
    return `this field is required`;
  }
  return "";
}

function validatePasswordConfirm(password: string, confirmPassword: string) {
  if (password !== confirmPassword) {
    return "password confirm is wrong";
  }
  return required(confirmPassword);
}

interface FormValues {
  name: string;
  email:string;
  password: string;
  passwordConfirm: string;
  flavour: string;
  types: string[];
  aboutYou: string;
}

function App() {
  const [message, setMessage] = useState("");
  const validate = ({ values }: { values: any }) => ({
    name: required(values.name),
    email: required(values.email),
    password: required(values.password),
    passwordConfirm: validatePasswordConfirm(
      values.password,
      values.passwordConfirm
    )
  });
  const onError = (ev: any) => {
    setMessage("validations failed");
    ev.preventDefault();
  };
  const onSuccess = (ev: any) => {
    setMessage("validations success");
    ev.preventDefault();
  };
  const {
    values,
    errors,
    touched,
    isValid,
    inputProps,
    onSubmit,
    setValue,
    touchValue
  } = useFormless(
    {
      initialValues: {
        name: "Gibran",
        email: "Gibran@example.com",
        password: "",
        passwordConfirm: "",
        flavour: "",
        types: [],
        aboutYou: "Hello there"
      }
    },
    { validate, onSuccess, onError }
  );

  const inputStyle = "w-100 mb2"
  const cardStyle="ba br3 b--black-10 pa4 shadow-4"
  // you can set all props for input tag with inputProps(value) function
  return (
    <>
  <div>Hello</div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
