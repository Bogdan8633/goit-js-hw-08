import throttle from 'lodash.throttle';

const formData = {};
const refs = {
  formEl: document.querySelector('.feedback-form'),
  inputEl: document.querySelector('input'),
  textareaEl: document.querySelector('textarea'),
  buttonEl: document.querySelector('button'),
};

const STORAGE_KEY = 'feedback-form-state';

startPoint();

refs.formEl.addEventListener('submit', onFormSubmit);

refs.formEl.addEventListener(
  'input',
  throttle(e => {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, 500)
);

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('Отправляем форму');
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function startPoint() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedSavedData = JSON.parse(savedData);
    refs.inputEl.value = parsedSavedData.email;
    refs.textareaEl.textContent = parsedSavedData.message;
  }
}
