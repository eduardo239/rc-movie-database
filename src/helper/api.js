/**
 * Api search OMDB
 * @param {String} term
 * @returns
 */
export const getApiOMDB = async (term) => {
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

/**
 * Api search Maze
 *
 * @param {String} term
 * @returns
 */
export const getApiMaze = async (term) => {
  try {
    const response = await fetch(
      `http://api.tvmaze.com/search/shows?q=${term}`
    );
    const json = await response.json();
    return { data: json };
  } catch (error) {
    return { error };
  }
};
