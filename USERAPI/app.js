const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// middleware to app.js
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// ==============================
// CRUD ROUTES
// ==============================

// 1. Add a new user
app.post('/users', async (req, res) => {
    try {
        console.log("Inside app.post1")
        console.log(req.body)
      const { name, email, age, address } = req.body;
      const age1 = Number(age);
      console.log(age1)
      console.log({name,email,age1,address})
      //const newUser = new User({ name, email, age1, address });
      // Convert age to a number
      console.log("About to create user object...");
    const newUser = new User({ name, email, age: age1, address });
    console.log("User object created, about to save...");
    await newUser.save();
      console.log("Inside app.post1.2")
      res.status(201).send('User added successfully');
      console.log("Inside app.post2")
    } catch (error) {
      res.status(500).send('Error adding user');
      console.log("Inside app.post3")
    }
  });

// 2. Get all users
app.get('/get-users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send('Error fetching users');
    }
  });
//Get Single User:
  app.get('/get-user/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(500).send('Error fetching user');
    }
  });

// 3. Update user details by ID
app.put('/update-user/:id', async (req, res) => {
    try {
      const { name, email, age, address } = req.body;
      await User.findByIdAndUpdate(req.params.id, { name, email, age, address });
      res.send('User updated successfully');
    } catch (error) {
      res.status(500).send('Error updating user');
    }
  });

// 4. Delete a user by ID
app.delete('/delete-user/:id', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.send('User deleted successfully');
    } catch (error) {
      res.status(500).send('Error deleting user');
    }
  });

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

/*const express = require('express');

const bodyParser = require('body-parser');

const { check, validationResult } = require('express-validator');

const nodemailer = require('nodemailer');

const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

//middleware for parsing JSON in request body
app.use(express.json());

app.get('/', (request, response) => {

	response.render('usercontact', { errors : '' });

});

app.post('/create',(request, response) => {
    const nm =  nodemailer.create(req.body);
      res.status(200).json(nm);
	response.render('usercontact', { errors : '' });

});



app.post('/send', 
	[
		check('name').notEmpty().withMessage('Name is required'),
		check('email').isEmail().withMessage('Invalid Email Address'),
		check('subject').notEmpty().withMessage('Subject is required'),
		check('message').notEmpty().withMessage('Message is required')
	], (request, response) => {

		const errors = validationResult(request);

		if(!errors.isEmpty())
		{
			response.render('usercontact', { errors : errors.mapped() });
		}
		else
		{
			const transporter = nodemailer.createTransport({
				service : 'Gmail',
				auth : {
					user : 'povonteblog@gmail.com',
					pass : 'write your Google App Password'
				}
			});

			const mail_option = {
				from : request.body.email,
				to : 'jm6078390@gmail.com',
				subject : request.body.subject,
				text : request.body.message
			};

			transporter.sendMail(mail_option, (error, info) => {
				if(error)
				{
					console.log(error);
				}
				else
				{
					response.redirect('/success');
				}
			});
		}
});

app.get('/success', (request, response) => {

	response.send('<h1>Your Message was Successfully Send!</h1>');

});

//start server
app.listen(3001, () => {

	console.log('Server started on port 3000');

});


*/