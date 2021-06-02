export const helperFunction = (body, setHelperText) => {
  setHelperText({
    error: body.error,
    text: body.text,
    type: body.type,
  });
  setTimeout(() => setHelperText({ error: false, text: '', type: '' }), 3000);
};

export const stringToArray = (x) => {
  if (x === null || x === undefined) {
    return '';
  }
  return x.split(',');
};

export const arrayToString = (x) => {
  if (x === null || x === undefined) {
    return '';
  }
  return x.join(', ');
};
