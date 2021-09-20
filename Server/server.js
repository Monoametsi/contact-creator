const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const dirname = __dirname.slice(0, __dirname.search(/Server/i) - 1);
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname,'.env')});
const create_account = require('./Routes/register/register.js');
const { register_get, register_post } = create_account;
const login = require('./Routes/login/login.js');
const { login_get } = login;
const bodyParser = require('body-parser');
const DATABASE_URL = process.env.DATABASE; 
app.disable('etag');

app.use(express.static(path.join(dirname)));
app.use(express.static(path.join(dirname, 'register')));
app.use(express.static(path.join(dirname, 'login')));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use('*', (req, res, next) => {
	res.locals.req = req;
	next();
});

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/create-account', register_get);

app.post('/create-account', register_post);

app.get('/login', login_get);

const PORT = process.env.PORT || 8800;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	app.listen(PORT, () => {
		console.log(`We Live at ${ PORT }`);
	});
}).catch((err) => {
	console.log(err);
})