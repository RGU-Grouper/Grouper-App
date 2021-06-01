const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

let testAccount = null;
let transporter = null;

const setupEmail = async () => {
	testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	});
};

setupEmail().catch(console.error);

router.get('/', (req, res) => {
	console.log("HELLO");
	res.send({ data: "TESTING GET" });
});

router.post('/', (req, res) => {
	try {
		const groups = req.body.data;
		groups.forEach((group, index) => {
			group.forEach(user => {
				console.log(`Group ${index + 1}: ${user.name} - ${user.email}`);
				
				// Email user with group number
				const text = `Hi ${user.name}! You are now a part of group ${index + 1}!`;
				
				transporter.sendMail({
					from: '"Grouper" <grouper@ruaidhri-mackenzie.com>',
					to: user.email, // list of receivers - comma separated string
					subject: "You have been put into a Grouper group!", // Subject line
					text, // plain text body
					html: `<p>${text}</p>`, // html body
				}, (error, info) => {
					if (error) {
						console.log(error);
					}
					else {
						// console.log(info);
					}
				});
			});
		});
		
		res.send({ data: true });
	}
	catch(err) {
		console.log(err);
		res.send({ data: false });
	}
});

module.exports = router;
