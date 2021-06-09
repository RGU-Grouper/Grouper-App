const email = require("./email.js");

// Email users with their group number. Return status 200 if successful and 500 otherwise
const emailGroups = (req, res) => {
	try {
		const groups = req.body.data;
		groups.forEach((group, index) => {
			group.forEach((user) => {
				// Email user with group number
				const subject = "You have been put into a Grouper group!";
				const text = `Hi ${user.name}! You are now a part of group ${index + 1}!`;
				email.sendMail(user.email, subject, text);
			});
		});

		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
};

// Email users with their secret santa draw. Return status 200 if successful and 500 otherwise
const secretSanta = (req, res) => {
	try {
		const userList = req.body.data;
		for (let i = 0; i < userList.length; i++) {
			const giftGiver = userList[i];
			let giftReceiver = null;
			if (i === userList.length - 1) {
				giftReceiver = userList[0];
			} else {
				giftReceiver = userList[i + 1];
			}

			const subject = "You have been entered into Secret Santa!";
			const text = `Hi ${giftGiver.name}! You have drawn ${giftReceiver.name} in Secret Santa, please get them a nice gift!`;
			email.sendMail(giftGiver.email, subject, text);
		}

		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
};

module.exports = {
	emailGroups,
	secretSanta,
};
