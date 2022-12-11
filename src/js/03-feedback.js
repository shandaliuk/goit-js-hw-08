import throttle from 'lodash.throttle';

const FORM_STATE = 'feedback-form-state';

const formElement = document.querySelector('.feedback-form');

let formInput = {};

const savedInputs = load(FORM_STATE);

if (savedInputs) {
  restoreInputs(savedInputs);
}

const onFormInput = event => {
  const { name, value } = event.target;

  formInput[name] = value;

  save(FORM_STATE, formInput);
};

const onFormSubmit = event => {
  event.preventDefault();

  console.log(formInput);

  formInput = {};

  localStorage.removeItem(FORM_STATE);

  event.currentTarget.reset();
};

formElement.addEventListener('input', throttle(onFormInput, 500));
formElement.addEventListener('submit', onFormSubmit);

function restoreInputs(inputs) {
  formInput = inputs;
  Object.keys(inputs).forEach(name => (formElement[name].value = inputs[name]));
}

function save(key, value) {
  try {
    const properValue = JSON.stringify(value);
    localStorage.setItem(key, properValue);
  } catch (error) {
    console.log(error.message);
  }
}

function load(key) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? undefined : JSON.parse(value);
  } catch (error) {
    console.log(error.message);
  }
}
