const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const dirname = __dirname.slice(0, __dirname.search(/Server/i) - 1);
const dotenv = require('dotenv');
const create_account = require('./Routes/register/register.js');
const { register } = create_account;

app.disable('etag');

app.use(express.static(path.join(dirname)));
dotenv.config({path: path.join(__dirname,'.env')});
app.set('view engine', 'ejs');

app.get('*', (req, res, next) => {
	res.locals.req = req;
	next();
});

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/create-account', register);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
	console.log(`We Live at ${ PORT }`);
})