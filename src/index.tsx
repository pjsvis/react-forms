import React, { useState } from "react";
import ReactDOM from "react-dom";
import "tachyons";
import useFormless from "react-useformless";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { singleOptionValue , multiOptionValues} from "./components/select-options-helper";
import { SingleSelect} from './components/single-select';
import { MultiSelect } from './components/multi-select';


const flavourOptions: vis.SelectOption[] = [
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
  const cardStyle="ba br3 b--black-10 pa4 shadow-4"
  // you can set all props for input tag with inputProps(value) function
  return (
    <div className="ma4 sans-serif bg-black-20">
      <div className={'w-30 fl ' + cardStyle }>
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

          <summary>
            Approach 2 <br />
            via setValue, touchValue functions <br />
            Here you have to pass the functions manual
        </summary>

          <div className="w-100 mt2">
            <SingleSelect
              name="flavour"
              caption="Single Flavour"
              values={values}
              onChange={(ev: vis.SelectOption) => {
                setValue("flavour", singleOptionValue(ev));
              }}
              options={flavourOptions}
            />
          </div>

          <div className="w-100">

            <MultiSelect
              name="types"
              caption="Multi Flavour"
              values={values}
              onChange={(ev: vis.SelectOption[]) => {
                setValue("types", multiOptionValues(ev));
              }}
              options={flavourOptions}
            />
          </div>


          <div className={inputStyle}>
            <label htmlFor="">about you</label> <br />
            <textarea
              className={inputStyle}
              placeholder="this input works as inputs above ^^"
              cols={30}
              value={values.aboutYou}
              onBlur={ev => touchValue("aboutYou")}
              onChange={ev => {
                setValue("aboutYou", ev.target.value);
              }}
            />
          </div>
          <input type="submit" value="submit info" className="button-reset" />
        </form>

      </div>
      <div className={'w-30 fl ml4 pa4 ' + cardStyle}>
        <pre> {JSON.stringify({ values, errors, touched }, null, 2)}</pre>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
