var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var querystring = require('querystring');
var http = require('http');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api! qlt' });   
});

// more routes for our API will happen here

router.route('/ruter')

    .get(function() {

        var requestify = require('requestify');

requestify.get('http://reisapi.ruter.no/StopVisit/GetDepartures/3010330')
.then(function(response) {
    // Get the response body (JSON parsed or jQuery object for XMLs)
    console.log(response.getBody()[0]);
    res.json(response.getBody()[0]);
});
        
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


