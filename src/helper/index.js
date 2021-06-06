/**
 *
 * @param {boolean} error
 * @param {String} text
 * @param {String} type
 * @param {Function} f
 * @param {Number} time
 */
export const helperFunction = (error, text, type, f, time) => {
  f({
    error: error,
    text: text,
    type: type,
  });
  setTimeout(() => f({ error: false, text: '', type: '' }), time);
};

/**
 *
 * @param {String} x
 * @returns
 */
export const removeHtmlTags = (x) => {
  return x.replace(/<\/?[^>]+(>|$)/g, '');
};

export const stringToArray = (x) => {
  if (x === null || x === undefined) {
    return '';
  }
  return x.split(',').map((y) => y.trim().toLowerCase());
};

export const arrayToString = (x) => {
  if (x === null || x === undefined) {
    return '';
  }
  return x.map((y) => y.trim().charAt(0).toUpperCase() + y.slice(1)).join(', ');
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

/**
 *
 * @param {String} x
 * @param {number} len
 * @returns
 */
export const compactString = (x, len) => {
  if (x === null) {
    return;
  }
  if (x.length > 10) {
    return x.slice(0, len) + '...';
  }
  return x;
};

export const routingTo = (...args) => {
  const id = args[0].id;
  const history = args[0].history;
  const to = args[0].to;

  const path = history.location.pathname;
  const arrayPath = path.split('/');
  const lenPath = arrayPath.length;

  if (lenPath < 3) {
    history.push(`${to}/${id}`);
  } else {
    history.push(`${id}`);
  }
};
