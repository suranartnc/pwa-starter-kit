// You can find your project ID in your Dialogflow agent settings
const projectId = 'pwa-starter-kit-b97bc' //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id'
const languageCode = 'th-TH'

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow')
const sessionClient = new dialogflow.SessionsClient()

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId)

function buildRequest(message) {
  // The text query request.
  return {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode
      }
    }
  }
}

// Send request and log result
exports.query = function(message) {
  const request = buildRequest(message)

  return sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult
      return result.fulfillmentText
    })
    .catch(err => {
      console.error('ERROR:', err)
    })
}
