require('dotenv').config()
// const fsPromises = require('fs').promises
const lfmListeningTime = require('./lfmListeningTime')
const lfmTopArtists = require('./lfmTopArtists')
const lfmTopTracks = require('./lfmTopTracks')

async function test(fn) {
  const results = await fn();
  console.log(results)
  return JSON.stringify(results);
}

test(lfmTopArtists)