const axios = require('axios');
const lfm = require('./lastfm')

/**
 * Function to return a Last.fm user's most listened albums as an array to be included in 11ty global data.
 */

module.exports = function() {
  return new Promise((resolve, reject) => {
    axios.get(lfm('user.getTopArtists', { period: '1month' }))
    .then(response => resolve(
      response.data.topartists.artist.map( item => {
        const name = item.name
        const url = item.url
        const image = item.image[item.image.length - 1]
        const rank = item['@attr'].rank
        const plays = item.playcount

        return {rank, name, url, image, plays}
      })
    ))
    .catch(error => reject(console.log('Connection to Last.FM failed while fetching top albums')))
  })
};