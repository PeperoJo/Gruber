//require/import dependencies
const express = require('express');
//define variables
const app = express();
var Uber = require('node-uber');

var uber = new Uber({
  client_id: '2qgPXqUuIBG-hy4B--7Kpnj3g439mHZc',
  client_secret: 'vzMgBzuX6VcPOQ1BMXsPPha3MA-zvyrDcP3mXQs4',
  server_token: 'V5QIaLdSHE2GYSzn1xL-ZYc0yVnlYkFIAiYJkDYl',
  redirect_uri: 'http://localhost:3000/',
  name: 'Grober', //Uber does not allow project names to have the word "uber" in them
  language: 'en_US', // optional, defaults to en_US
  sandbox: true, // optional, defaults to false
  // proxy: 'PROXY URL' // optional, defaults to none
});

app.get('/index', function(request, response) {
  // alert("wassup");
  var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places','ride_widgets']);
  console.log('URL: ' + url);
  response.redirect(url);
});

app.get('/',function(request, response){
  var code = request.query.code;
  console.log('Code: '+ code);
  uber.authorizationAsync({authorization_code: code})
  .spread(function(access_token, refresh_token, authorizedScopes, tokenExpiration) {
    // store the user id and associated access_token, refresh_token, scopes and token expiration date
    console.log('New access_token retrieved: ' + access_token);
    console.log('... token allows access to scopes: ' + authorizedScopes);
    console.log('... token is valid until: ' + tokenExpiration);
    console.log('... after token expiration, re-authorize using refresh_token: ' + refresh_token);

    // redirect the user back to your actual app
    response.redirect('/location?address=University of Notre Dame, 1251 N Eddy St Ste 400, South Bend, IN 46617, US');//Need to change according to front-end
  })
  .error(function(err) {
    console.error(err);
  });
});

app.get('/location', function(request, response) {
  // extract the query from the request URL
  var query = request.query;
  // if no query params sent, respond with Bad Request
  if (!query || !query.address) {
    response.sendStatus(400);
  } else {
    uber.products.getAllForAddressAsync(query.address)
    .then(function(res) {
        response.json(res);
    })
    .error(function(err) {
      console.error(err);
      response.sendStatus(500);
    });
  }
});
const cards = [
        {id: 0,'location': 'Chicago, IL','price': '1','time': '10:00 PM', 'link': 'https://images.unsplash.com/photo-1524168272322-bf73616d9cb5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=161ce6b10a1b9518237d89cc7510a018&auto=format&fit=crop&w=3300&q=80',
        'info':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate, eros quis vulputate convallis, lectus mauris ornare tortor, vel malesuada arcu diam id eros. Vestibulum quis purus et felis eleifend auctor. Proin sed eros feugiat, faucibus ipsum sit amet, sagittis dolor. Aenean posuere leo in faucibus congue. In hac habitasse platea dictumst. Etiam in nisi elementum, maximus felis eu, cursus nisi. Quisque ac commodo neque. Fusce elit risus, pulvinar ac magna eu, sagittis vestibulum arcu.'},
        {id: 1,'location': 'New York City, NY','price':'1' ,'time': '8:00 PM', 'link': 'https://images.pexels.com/photos/450597/pexels-photo-450597.jpeg'
        ,'info':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate, eros quis vulputate convallis, lectus mauris ornare tortor, vel malesuada arcu diam id eros. Vestibulum quis purus et felis eleifend auctor. Proin sed eros feugiat, faucibus ipsum sit amet, sagittis dolor. Aenean posuere leo in faucibus congue. In hac habitasse platea dictumst. Etiam in nisi elementum, maximus felis eu, cursus nisi. Quisque ac commodo neque. Fusce elit risus, pulvinar ac magna eu, sagittis vestibulum arcu.'},
        {id: 2,'location': 'Los Angeles, CA','price': '2','time': '8:00 PM', 'link': 'https://d15gqlu8dfiqiu.cloudfront.net/s3fs-public/styles/banner/public/images/chapters/Los-Angeles-Travel-Massive.jpg'
        ,'info':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate, eros quis vulputate convallis, lectus mauris ornare tortor, vel malesuada arcu diam id eros. Vestibulum quis purus et felis eleifend auctor. Proin sed eros feugiat, faucibus ipsum sit amet, sagittis dolor. Aenean posuere leo in faucibus congue. In hac habitasse platea dictumst. Etiam in nisi elementum, maximus felis eu, cursus nisi. Quisque ac commodo neque. Fusce elit risus, pulvinar ac magna eu, sagittis vestibulum arcu.'},
        {id: 3,'location': 'Orlando, FL','price': '3','time': '8:00 PM', 'link':'https://goairportshuttle.com/images/site/slider-orlando-1.jpg',
        'info':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate, eros quis vulputate convallis, lectus mauris ornare tortor, vel malesuada arcu diam id eros. Vestibulum quis purus et felis eleifend auctor. Proin sed eros feugiat, faucibus ipsum sit amet, sagittis dolor. Aenean posuere leo in faucibus congue. In hac habitasse platea dictumst. Etiam in nisi elementum, maximus felis eu, cursus nisi. Quisque ac commodo neque. Fusce elit risus, pulvinar ac magna eu, sagittis vestibulum arcu.'},
        {id: 4,'location': 'Dallas, TX','price': '5','time': '8:00 PM', 'link':'https://miro.medium.com/max/732/1*hTClRaGFf9tMnBCKyx4G_w.jpeg',
        'info':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate, eros quis vulputate convallis, lectus mauris ornare tortor, vel malesuada arcu diam id eros. Vestibulum quis purus et felis eleifend auctor. Proin sed eros feugiat, faucibus ipsum sit amet, sagittis dolor. Aenean posuere leo in faucibus congue. In hac habitasse platea dictumst. Etiam in nisi elementum, maximus felis eu, cursus nisi. Quisque ac commodo neque. Fusce elit risus, pulvinar ac magna eu, sagittis vestibulum arcu.'},
]

//middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
//body
app.get('/gruber', (req, res) => {
    res.send(cards);
});

app.post('/gruber/cards', (req, res) => {
    
    const card = {
      id: cards.length + 1,
      /*location: req.body.location,
      'name': req.body.name,
      'price': req.body.price,
      'time': req.body.time,
      'link': req.body.link,
      'info': req.body.info,
    */
    };
    cards.push(card);
    res.send(card);
  });

//export
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
