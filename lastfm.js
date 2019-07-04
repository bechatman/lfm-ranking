/** 
 * Wrapper function implement Axios request to Last.fm API and return data.
 * @param user string - Command from the Last.fm API: https://www.last.fm/api/
 * @param options object - Additional parameters from the Last.fm API command required to return correct data. See Last.fm docs.
 * @returns requestURL string - Completed URL to retrieve data from Last.fm API.
*/
module.exports = (command, options) => {
  const user = process.env.LASTFM_USER;
  const apiKey = process.env.LASTFM_KEY;
  let requestURL = `https://ws.audioscrobbler.com/2.0/?method=${command}&user=${user}&api_key=${apiKey}&format=json`
  if (options) {
    const paramsAll = Object.keys(options).map(
      item => `${item}=${options[item]}`
    );
    const params = `&${paramsAll.join('&')}`;
    requestURL = `https://ws.audioscrobbler.com/2.0/?method=${command}&user=${user}&api_key=${apiKey}${params}&format=json`;
  }
  return requestURL;
};