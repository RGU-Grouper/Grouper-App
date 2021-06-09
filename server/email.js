const nodemailer = require("nodemailer");
const keys = require("./keys.js");

let transporter = null;

// Setup the transporter with the correct sending address and auth
const setupEmail = async () => {
	transporter = nodemailer.createTransport({
		service: keys.emailService,
		auth: {
			user: keys.emailAddress,
			pass: keys.emailPassword,
		},
	});
};

// Send an email from the official account
const sendMail = (to, subject, text) => {
	transporter.sendMail(
		{
			from: `"Grouper" <${keys.emailAddress}>`,
			to, // list of receivers - comma separated string
			subject, // Subject line
			text, // plain text body
			html: `<p>${text}</p>`, // html body
		},
		(error, info) => {
			if (error) {
				console.log(error);
			} else {
				// console.log(info);
				console.log(`Group ${index + 1}: ${user.name} - ${user.email}`);
			}
		}
	);
};

module.exports = {
	setupEmail,
	sendMail,
};
