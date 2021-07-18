const bcrypt = require("bcryptjs");
const saltRounds = 12;
const nodemailer = require("nodemailer");
const validator = require("email-validator");
const { EMAIL_PASS } = process.env;

let transporter = nodemailer.createTransport({
	host: "smtp.mail.outlook.com",
	service: "outlook",
	auth: {
		user: "coopergoldenholt@outlook.com",
		pass: EMAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

module.exports = {
	loginUser: async (req, res) => {
		const db = req.app.get("db");
		let { email, password } = req.body;
		email = email.toLowerCase();
		const [user] = await db.login.get_user_by_email(email);
		if (!user) {
			return res.status(401).send("Username or password incorrect");
		}
		const result = await bcrypt.compare(password, user.password);

		if (result) {
			req.session.user = {
				email: user.email,
				firstName: user.first_name,
				lastName: user.last_name,
				loggedIn: true,
				companyId: user.company_id,
				userType: user.type_of_user,
				id: user.id,
				managedCompanyId: user.managed_company,
			};
			res.status(200).send(req.session.user);
		} else res.status(401).send("Username or password incorrect");
	},
	registerUser: async (req, res) => {
		const db = req.app.get("db");
		let { email, managedCompanyId, typeOfUser, companyId } = req.body;
		// const validEmail = await validator.validate(email);
		const validEmail = true;
		if (!validEmail) {
			res.status(401).send("Email is Invalid");
		} else {
			email = email.toLowerCase();
			const [existingUser] = await db.login.get_user_by_email(email);
			if (existingUser) {
				res.statusMessage = "Email is in use";
				return res.status(404).end();
			}

			const [user] = await db.register.create_user([
				email,
				typeOfUser,
				managedCompanyId,
				companyId,
			]);
			// transporter.sendMail({
			// 	from: "coopergoldenholt@outlook.com", // sender address
			// 	to: user.email, // list of receivers
			// 	subject:
			// 		"You Have Been Invited To Register For The Golden Landscaping App", // Subject line
			// 	html: `<p><b>Hello</b>  </p>
			// <p>You have been invited to register an account with the Golden Landscaping and Lawn App. Download the app off the app store and finish setting up your account with this email!</p>`,
			// });

			res.status(200).send("User Created");
		}
	},
	setUserPassword: async (req, res) => {
		const db = req.app.get("db");
		let { email, password, firstName, lastName } = req.body;
		email = email.toLowerCase();
		const [existingUser] = await db.login.get_user_by_email(email);
		if (!existingUser) {
			return res.status(401).send("No Email Was Found");
		} else if (existingUser.password !== null) {
			return res.status(401).send("User Already Exists");
		}
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);

		const [user] = await db.register.set_user_password([
			email,
			hash,
			firstName,
			lastName,
		]);

		req.session.user = {
			email: user.email,
			firstName: user.first_name,
			lastName: user.last_name,
			loggedIn: true,
			companyId: user.company_id,
			userType: user.type_of_user,
			id: user.id,
			managedCompanyId: user.managed_company,
		};
		res.status(200).send(req.session.user);
	},
	deleteUser: async (req, res) => {
		const db = req.app.get("db");
		let { id } = req.params;

		const deletedUser = await db.users.delete_user(id);

		res.status(200).send("user deleted");
	},
	logoutUser: async (req, res) => {
		req.session.destroy();
	},
};
