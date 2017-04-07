var request = require('request');


const CarrierText = ['Good job! Share the happiness!', 'Stay hydrated! Eat clean. Exercise. Meditate', 'Schedule a weekly dinner date. Call or email an old friend. Have lunch or coffee with a friend. Go for a walk with a workout buddy.', 'Ask a loved one to check in with you regularly. Do some yoga. Get some fresh air and go for a walk. Play with your pet or go to a dog park', 'You are at genetically at risk for depression. Call a therapist or hotline']
const nonCarrierText = ['Good job! Share the happiness!', 'Stay hydrated! Eat clean. Exercise. Meditate', 'Schedule a weekly dinner date. Call or email an old friend. Have lunch or coffee with a friend. Go for a walk with a workout buddy', 'Schedule a weekly dinner date. Call or email an old friend. Have lunch or coffee with a friend. Go for a walk with a workout buddy', 'Ask a loved one to check in with you regularly.  Get some fresh air and go for a walk. Play with your pet or go to a dog park']

const sample = {
  "AppCode": "Chain964",
  "Pars": [
    {
      "Value": "227679",
      "Name": "dataSourceId"
    }
  ]
}


/**
 * GET /
 * Home page.
 */
exports.getMood = (req, res) => {
  res.render('mood', {
    title: 'Mood'
  });
};

exports.getResults = (req, res) => {
  userPick = req.params.state;

  var headers = {
    'User-Agent': 'NodeJS/6.10.2',
    'Authorization': 'Bearer ' + req.user.tokens.filter(token => token.kind == 'sequencing')[0].accessToken
  }

  // Configure the request
  var options = {
    url: 'https://api.sequencing.com/v2/StartApp',
    method: 'POST',
    headers: headers,
    json: sample
  }

  // Start the request
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      console.log(body.Status.Status)

      console.log(body.ResultProps[0].Value)
      if (body.Status.Status == 'Completed' && (body.ResultProps[0].Value == 'Carrier' || body.ResultProps[0].Value == 'Possibly Affected')) {
        res.render('tip', {
          title: 'Tip',
          tipText: CarrierText[userPick - 1]
        });
      } else {
        res.render('tip', {
          title: 'Tip',
          tipText: nonCarrierText[userPick - 1]
        })
      }
    }
  })
}

exports.getAppchain = (req, res) => {

  //console.log(sample);
  //console.log(req.user.tokens.filter(token => token.kind == 'sequencing')[0].accessToken)

  // Set the headers
  var headers = {
    'User-Agent': 'NodeJS/6.10.2',
    //    'Content-Type':     'application/x-www-form-urlencoded'
    'Authorization': 'Bearer ' + req.user.tokens.filter(token => token.kind == 'sequencing')[0].accessToken
  }
  //console.log(headers)

  // Configure the request
  var options = {
    url: 'https://api.sequencing.com/v2/StartApp',
    method: 'POST',
    headers: headers,
    json: sample
  }

  //console.log(options)
  // Start the request
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      console.log(body.Status.Status)
      if (body.Status.Status == 'Completed' && body.Status.Status == 'Canceled') {

      }
      else {
        setTimeout(
          request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              // Print out the response body
              console.log(body.Status.Status)
              if (body.Status.Status == 'Completed' && body.Status.Status == 'Canceled') {
                console.log(body.Status.Status)
              }
            } else {
              console.log(response.statusCode)
              console.log(error)
            }
          })
          , 3000);
      }
    } else {
      console.log(response.statusCode)
      console.log(error)
    }
  })

};


