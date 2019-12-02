const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const auth = require('http-auth');
const { body, validationResult } = require('express-validator');

const Registration = mongoose.model('Registration');
const Movie = mongoose.model('Movie');

const basic = auth.basic({
	file: path.join(__dirname, '../users.htpasswd')
})

router.get('/', (req, res) => {
  	res.render('form', {title: 'Registration form'});
});

router.post('/', 
	[
		body('name')
			.isLength({ min: 1 })
			.withMessage('Please enter a name'),
		body('email')
			.isLength({ min:1 })
			.withMessage('Please enter an email'),

	],
 	(req, res) => {
 		const errors = validationResult(req);
 		if (errors.isEmpty()) {
 			const registration = new Registration(req.body);
 			registration.save()
 				.then( () => { res.send('Thank you for your registration!'); })
 				.catch( () => { res.send('Sorry, something went wrong!'); })
 		} else {
			res.render('form', {
				title: 'Registration form',
				errors: errors.array(),
				data: req.body,
			});
 		}
	}
);

router.get('/registrations', auth.connect(basic), (req, res) => {

	Registration.find()
		.then((registrations) => {
			res.render('index', {title: 'Listing regs', registrations});
		})
		.catch(() => {
			res.send('Sorry, something went wrong!');
		})

})

router.get('/movies', auth.connect(basic), (req, res) => {

	Movie.find()
		.then((movies) => {
			res.render('movies', {title: 'Listing movies', movies});
		})
		.catch(() => {
			res.send('Sorry, something went wrong!');
		})

})

// for testing the mongo connection
router.get('/addmovietest', (req, res) => {
	const movie = new Movie();
	movie.title = "testTitle";
	movie.id = 0;
	movie.save();
})

module.exports = router;
