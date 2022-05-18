module.exports = ({ env }) => ({
  auth: {
    secret: env('aosqGKqsDumysn1/dN6Ghg'),
  },
  apiToken: {
    salt: env('h+v2OpXTutq45D4DuRF3+g'),
  },

});
module.exports = ({ env }) => ({
  // ...
  watchIgnoreFiles: [
    '**/config/sync/**',
  ],
});
