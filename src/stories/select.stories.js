import React  from "react";
import  { useState } from "react";
import ReactDOM from "react-dom";

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import "tachyons";
import useFormless from "react-useformless";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { singleOptionValue , multiOptionValues} from "../components/select/select-options-helper";
import { SingleSelect} from '../components/select/single-select';
import { MultiSelect } from '../components/select/multi-select';

storiesOf('Select', module)
  .add('with text', () => <SingleSelect options={singleOptionValue} onChange={action('changed')}>Hello Button</SingleSelect>)
  .add('with some emoji', () => (
  <div className="w-100 mt2">
<SingleSelect
  name="flavour"
  caption="Single Flavour"
  // values={values}
  // onChange={(ev) => {
  //   setValue("flavour", singleOptionValue(ev));
  // }}
  options={flavourOptions}
/>
</div>
  ));


