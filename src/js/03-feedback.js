import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

startPoint();

formEl.addEventListener('submit', onFormSubmit);

formEl.addEventListener(
  'input',
  throttle(evt => {
    let persistedData = localStorage.getItem(STORAGE_KEY);
    persistedData = persistedData ? JSON.parse(persistedData) : {};
    persistedData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedData));
  }, 500)
);

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('Отправляем форму');
  let persistedData = localStorage.getItem(STORAGE_KEY);
  console.log(JSON.parse(persistedData));
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function startPoint() {
  let persistedData = localStorage.getItem(STORAGE_KEY);
  if (persistedData) {
    persistedData = JSON.parse(persistedData);
    Object.entries(persistedData).forEach(([name, value]) => {
      formEl.elements[name].value = value;
    });
  }
}
