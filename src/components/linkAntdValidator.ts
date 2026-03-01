import validator from 'validator'

export const validateURL = (_, value) => {
  if (value && !validator.isURL(value)) {
    return Promise.reject('Пожалуйста, введите корректную ссылку URL');
  }
  return Promise.resolve();
};