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
const dashboard = require('./Routes/dashboard/dashboard.js');
const { dashboard_get } = dashboard;
const create_contact = require('./Routes/create-contact/create-contact.js');
const { create_contact_get, create_contact_post } = create_contact;
const login = require('./Routes/login/login.js');
const { login_get, login_post, logout } = login;
const edit_contact = require('./Routes/edit-contact/edit-contact.js');
const { edit_contact_get, edit_contact_post } = edit_contact;
const auth_middleware = require('./Middleware/auth-middleware.js');
const { require_auth, redirector, check_current_user } = auth_middleware;
const delete_contact = require('./Routes/delete-contact/delete-contact.js');
const { contactRemover } = delete_contact;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const DATABASE_URL = process.env.DATABASE; 
app.disable('etag');

app.use(express.static(path.join(dirname)));
app.use(express.static(path.join(dirname, 'register')));
app.use(express.static(path.join(dirname, 'login')));
app.use(express.static(path.join(dirname, 'dashboard')));
app.use(express.static(path.join(dirname, 'create-contact')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use('*', check_current_user);

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/create-account', redirector, register_get);

app.post('/create-account', redirector, register_post);

app.get('/login', redirector, login_get);

app.post('/login', redirector, login_post);

app.get('/logout', logout);

app.get('/dashboard', require_auth, dashboard_get);

app.get('/add', require_auth, create_contact_get);

app.post('/add', require_auth, create_contact_post);

app.get('/edit/:Id', require_auth, edit_contact_get); 

app.post('/edit/:Id', require_auth, edit_contact_post);

app.post('/delete-message/:Id', require_auth, contactRemover);

const PORT = process.env.PORT || 8800;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	app.listen(PORT, () => {
		console.log(`We Live at ${ PORT }`);
	});
}).catch((err) => {
	console.log(err);
})