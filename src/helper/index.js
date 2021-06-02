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

export const dateConvert = (x) => {
  let date = new Date(x);
  let y = date.getFullYear();
  let m = date.getMonth();
  let d = date.getDate();
  return `${d < 10 ? '0' + d : d}/${m < 10 ? '0' + (m + 1) : m + 1}/${y}`;
};

export const extractVideoId = (x) => {
  if (x === 'http' || x === '') {
    return;
  }
  if (x) {
    const id = x.split('/')[3].split('=')[1];
    return `https://www.youtube.com/embed/${id}`;
  }
};
