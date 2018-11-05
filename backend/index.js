const express = require('express');
const app = express();

const cards = [
        {id: '0','location': 'Chicago, IL','price': '70','Start time': '10:00 PM', 'link': 'https://images.unsplash.com/photo-1524168272322-bf73616d9cb5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=161ce6b10a1b9518237d89cc7510a018&auto=format&fit=crop&w=3300&q=80',
        'info':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate, eros quis vulputate convallis, lectus mauris ornare tortor, vel malesuada arcu diam id eros. Vestibulum quis purus et felis eleifend auctor. Proin sed eros feugiat, faucibus ipsum sit amet, sagittis dolor. Aenean posuere leo in faucibus congue. In hac habitasse platea dictumst. Etiam in nisi elementum, maximus felis eu, cursus nisi. Quisque ac commodo neque. Fusce elit risus, pulvinar ac magna eu, sagittis vestibulum arcu.'},
        {id: '1','location': 'New York City, NY','price':'50' ,'Start time': '8:00 PM', 'link': 'https://images.pexels.com/photos/450597/pexels-photo-450597.jpeg'
        ,'info':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate, eros quis vulputate convallis, lectus mauris ornare tortor, vel malesuada arcu diam id eros. Vestibulum quis purus et felis eleifend auctor. Proin sed eros feugiat, faucibus ipsum sit amet, sagittis dolor. Aenean posuere leo in faucibus congue. In hac habitasse platea dictumst. Etiam in nisi elementum, maximus felis eu, cursus nisi. Quisque ac commodo neque. Fusce elit risus, pulvinar ac magna eu, sagittis vestibulum arcu.'},
        {id: '2','location': 'Los Angeles, CA','price': '70','Start time': '8:00 PM', 'link': 'https://d15gqlu8dfiqiu.cloudfront.net/s3fs-public/styles/banner/public/images/chapters/Los-Angeles-Travel-Massive.jpg'
        ,'info':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate, eros quis vulputate convallis, lectus mauris ornare tortor, vel malesuada arcu diam id eros. Vestibulum quis purus et felis eleifend auctor. Proin sed eros feugiat, faucibus ipsum sit amet, sagittis dolor. Aenean posuere leo in faucibus congue. In hac habitasse platea dictumst. Etiam in nisi elementum, maximus felis eu, cursus nisi. Quisque ac commodo neque. Fusce elit risus, pulvinar ac magna eu, sagittis vestibulum arcu.'},
        {id: '3','location': 'Orlando, FL','price': '81','Start time': '8:00 PM', 'link':'https://goairportshuttle.com/images/site/slider-orlando-1.jpg',
        'info':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate, eros quis vulputate convallis, lectus mauris ornare tortor, vel malesuada arcu diam id eros. Vestibulum quis purus et felis eleifend auctor. Proin sed eros feugiat, faucibus ipsum sit amet, sagittis dolor. Aenean posuere leo in faucibus congue. In hac habitasse platea dictumst. Etiam in nisi elementum, maximus felis eu, cursus nisi. Quisque ac commodo neque. Fusce elit risus, pulvinar ac magna eu, sagittis vestibulum arcu.'},
        {id: '4','location': 'Dallas, TX','price': '23','Start time': '8:00 PM', 'link':'https://miro.medium.com/max/732/1*hTClRaGFf9tMnBCKyx4G_w.jpeg',
        'info':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate, eros quis vulputate convallis, lectus mauris ornare tortor, vel malesuada arcu diam id eros. Vestibulum quis purus et felis eleifend auctor. Proin sed eros feugiat, faucibus ipsum sit amet, sagittis dolor. Aenean posuere leo in faucibus congue. In hac habitasse platea dictumst. Etiam in nisi elementum, maximus felis eu, cursus nisi. Quisque ac commodo neque. Fusce elit risus, pulvinar ac magna eu, sagittis vestibulum arcu.'},
]

//app.use(express.json());
app.get('/gruber', (req, res) => {
    res.send(cards);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
