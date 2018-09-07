const cors = require('cors')({ origin: true })
const functions = require('firebase-functions')
const { query } = require('./dialogflow')

exports.query = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    const message = req.body.message

    query(message)
      .then(result => {
        return res.status(200).send(result)
      })
      .catch(error => console.log(error))
  })
})
