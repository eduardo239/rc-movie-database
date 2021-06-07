export const getApiOMDB = async (term, helperFunction, setHelperText) => {
  const api_key = 'f655bbbf';

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?t=${term}&apikey=${api_key}`
    );
    const json = await response.json();

    if (json.Response === 'False' || json.Response === 'false') {
      return { error: json.Error };
    }
    return { response: [json] };
  } catch (error) {
    return error;
  }
};
