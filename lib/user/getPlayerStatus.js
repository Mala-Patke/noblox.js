// Includes
const http = require('../util/http.js').func
const Promise = require('bluebird')

// Args
exports.required = ['group']
exports.optional = []

// Define
function getPlayerStatus (group, jar) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `https://api.roblox.com/users/${user}/onlinestatus/`,
      options: {
        method: 'GET',
        resolveWithFullResponse: true,
        jar: jar
      }
    }

    return http(httpOpt)
      .then(function (res) {
        const responseData = JSON.parse(res.body)
        if (res.statusCode === 400) {
          reject(new Error('The user is invalid or does not exist.'))
        }
        if (responseData.GameID === null) {
          reject(new Error('You do not have permissions to view the status of that user.'))
        } else {
          resolve(responseData)
        }
      })
      .catch(error => reject(error))
  })
}

exports.func = function (args) {
  return getPlayerStatus(args.group, args.jar)
}
