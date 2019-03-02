import React, { useState } from "react";
import ReactDOM from "react-dom";
import "tachyons";
import "./styles.css";
import useFormless from "react-useformless";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

// you should prefer use composable functions
// in order to pass an validate function to the hook
function required(value) {
  if (!value) {
    return `this field is required`;
  }
  return "";
}

function validatePasswordConfirm(password, confirmPassword) {
  if (password !== confirmPassword) {
    return "password confirm is wrong";
  }
  return required(confirmPassword);
}

const getSelectedOption = itemValue => {
  return options.filter(x => x.value === itemValue);
};

const getSelectedOptions = itemValues => {
  console.log(itemValues)
};

const getValues = (values) => {
  console.log('values', values)
  return values.map(x => x.value)
}

function App() {
  const [message, setMessage] = useState("");
  const validate = ({ values }) => ({
    name: required(values.name),
    email: required(values.email),
    password: required(values.password),
    passwordConfirm: validatePasswordConfirm(
      values.password,
      values.passwordConfirm
    )
  });
  const onError = ev => {
    setMessage("validations failed");
    ev.preventDefault();
  };
  const onSuccess = ev => {
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
        flavour: "strawberry",
        types: ["chocolate"],
        aboutYou: ""
      }
    },
    { validate, onSuccess, onError }
  );

  // you can set all props for input tag with inputProps(value) function
  return (
    <div className="App">
      <p className={`message-${isValid ? "success" : "error"}`}>{message}</p>
      <h1 className="f3">useFormless Hook</h1>
      <h2 className="f4">Try it!</h2>
      <form action="" onSubmit={onSubmit}>
        <summary>
          Approach 1 <br />
          via inputProps(name) function <br />
          notice: it is compatible with input tag's
        </summary>
        <div className="form-control">
          <label htmlFor="">Name</label> <br />
          <input type="text" {...inputProps("name")} />
        </div>
        <div className="form-control">
          <label htmlFor="">Email</label> <br />
          <input type="text" {...inputProps("email")} />
        </div>
        <div className="form-control">
          <label htmlFor="">Password</label> <br />
          <input type="password" {...inputProps("password")} />
        </div>
        <div className="form-control">
          <label htmlFor="">Confirm password</label> <br />
          <input type="password" {...inputProps("passwordConfirm")} />
        </div>
        <div className="w-30">
          <label htmlFor="">Flavour</label> <br />
          <Select
            value={getSelectedOption(values.flavour)}
            onBlur={ev => touchValue("flavour")}
            onChange={ev => {
              setValue("flavour", ev.value);
            }}
            options={options}
          />
        </div>
        <div className="w-30">
          <label htmlFor="">Types</label> <br />
          <Select
            value={getSelectedOptions(values.types)}         
            onChange={ev => {
              console.log(ev)                          
              setValue("types", ev.value);
            }}
            options={options}
            isMulti={true}
          />
        </div>
        <summary>
          Approach 2 <br />
          via setValue, touchValue functions <br />
          Here you have to pass the functions manual
        </summary>
        <div className="form-control">
          <label htmlFor="">about you</label> <br />
          <textarea
            type="text"
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
      <textarea
        value={JSON.stringify({ values, errors, touched }, null, "\t")}
        rows={15}
        cols={50}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
