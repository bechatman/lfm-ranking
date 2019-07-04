const axios = require('axios');
const lfm = require('./lastfm')

function getTotalPages() {
  return axios.get(lfm('user.getTopTracks', { period: '1month' }))
  .then( response => parseInt(response.data.toptracks['@attr'].totalPages))
}

function callPage(page) {
  return axios.get(lfm('user.getTopTracks', { period: '1month', page: page }))
  .then(response => 
     response.data.toptracks.track.map( item => {
      const artist = item.artist.name;
      const duration = item.duration;
      const song = item.name;
      const playcount = item.playcount;
      const mbid = item.mbid;
      const url = item.artist.url;
      return {artist, song, duration, playcount, url, mbid}
    }))
  .catch(error => reject(console.log('Connection to Last.FM failed while fetching top songs')))
};

/**
 * Function to return a Last.fm user's most listened albums as an array to be included in 11ty global data.
 */


module.exports = async () => {
  const allTracks = []
  const pages = await getTotalPages();
  for (let i = 1; i <= pages; i++) {
    const pageResults = await callPage(i);
    for (let x = 1; x < pageResults.length; x++) {
      allTracks.push(pageResults[x])
    }
  }
  const artists = new Set(allTracks.map(item => item.artist));
  const topArtists = Array.from(artists).map( (artist, index) => {
    const time = allTracks.reduce( (total, item) => {
      const playcount = parseInt(item.playcount);
      const duration = parseInt(item.duration);
      if (item.artist === artist && duration > 0){
        return duration * playcount + total;
      } else {
        return total;
      }
    }, 0)
    return {artist, time}
  }).sort( (a, b) => a.time - b.time ).reverse();
  
  return topArtists
}