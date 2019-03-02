import React, { useState } from "react";
import ReactDOM from "react-dom";
import "tachyons";
import useFormless from "react-useformless";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { getOptionValue as getSingleOptionValue, getOptionValues as getMultiOptionValues } from "./components/options-helper";
import { SelectSingle} from './components/select-single';
import { SelectMulti } from './components/select-multi';


const strOptions: vis.SelectOption[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const numOptions: vis.SelectOption[] = [
  { value: 100, label: "Chocolate" },
  { value: 200, label: "Strawberry" },
  { value: 300, label: "Vanilla" }
];

const boolOptions: vis.SelectOption[] = [
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
  // you can set all props for input tag with inputProps(value) function
  return (
    <div className="ma6 sans-serif">
      <div className="w-30 fl">
        <p className={`message-${ isValid ? "success" : "error" }`}>{message}</p>
        <h1 className="f3">useFormless Hook</h1>
        <h2 className="f4">Try it!</h2>
        <form action="" onSubmit={onSubmit}>
          <summary>
            Approach 1 <br />
            via inputProps(name) function <br />
            notice: it is compatible with input tag's
        </summary>
          <div >
            <label htmlFor="">Name</label> <br />
            <input className={inputStyle} type="search" {...inputProps("name")} />
          </div>
          <div className={inputStyle}>
            <label htmlFor="">Email</label> <br />
            <input className={inputStyle} type="search" {...inputProps("email")} />
          </div>
          <div className={inputStyle}>
            <label htmlFor="">Password</label> <br />
            <input className={inputStyle} type="password" {...inputProps("password")} />
          </div>
          <div className={inputStyle}>
            <label htmlFor="">Confirm password</label> <br />
            <input className={inputStyle} type="password" {...inputProps("passwordConfirm")} />
          </div>


          <div className="w-100">
            <SelectSingle
              name="flavour"
              caption="Single Flavour"
              values={values}
              onChange={(ev: vis.SelectOption) => {
                setValue("flavour", getSingleOptionValue(ev));
              }}
              options={strOptions}
            />
          </div>

          <div className="w-100">

            <SelectMulti
              name="types"
              caption="Multi Flavour"
              values={values}
              onChange={(ev: vis.SelectOption[]) => {
                setValue("types", getMultiOptionValues(ev));
              }}
              options={strOptions}
            />
          </div>

          <summary>
            Approach 2 <br />
            via setValue, touchValue functions <br />
            Here you have to pass the functions manual
        </summary>
          <div className={inputStyle}>
            <label htmlFor="">about you</label> <br />
            <textarea
              placeholder="this input works as inputs above ^^"
              cols={30}
              value={values.aboutYou}
              onBlur={ev => touchValue("aboutYou")}
              onChange={ev => {
                setValue("aboutYou", ev.target.value);
              }}
            />
          </div>
          <input type="submit" value="submit info" />
        </form>

      </div>
      <div className="w-40 fl">
        <pre> {JSON.stringify({ values, errors, touched }, null, 2)}</pre>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
