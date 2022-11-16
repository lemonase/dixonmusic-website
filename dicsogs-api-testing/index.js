const Discogs = require('disconnect').Client;
require('dotenv').config()

const dis = new Discogs({ userToken: process.env.DISCOGS_API_TOKEN });


let userList = dis.user().list()
let userCollection = dis.user().collection();
let userInventory = dis.user().getInventory("dixonmusic", { page: 1, per_page: 50 }, (err, data) => {

  data.listings.forEach(listing => {
    console.log(listing.release.thumbnail);
  })
});

// console.log(userInventory)

// console.log(userList.getItems())

// userCollection.getReleases("jamesdixon", 0, { page: 1, per_page: 50 }, (err, data) => {
//   console.log(data);
// })

// console.log(userCollection);

// var db = dis.database();

// db.getRelease(176126, function (err, data) {
//   console.log(data);
//   console.log(data.images[0].resource_url);
// });

// db.getRelease(375756, function (err, data) {
//   console.log(data.images[0].uri);
// });
