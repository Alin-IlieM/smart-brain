const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();
const knex = require("knex");
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: 'containers-us-west-138.railway.app',
        user: 'postgres',
        password: 'yoSQRqCoyBvYlhEmmnHw',
        database: 'railway'
    }
});

console.log(db.select('*').from('users'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());



app.get('/', (req, resp) => {
    resp.send('success')
})

app.get('/profile/:id', (req, resp) => {profile.handleProfile(req, resp, db)})

app.put('/image', (req, resp) => {image.handleImage(req, resp, db)})

app.post('/signin', (req, resp) => {signin.handleSignin(req, resp, db, bcrypt)})

app.post('/register', (req, resp) => {register.handleRegister(req, resp, db, bcrypt)})

app.post('/imageurl', (req, resp) => {image.handleApiCall(req, resp)})

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})