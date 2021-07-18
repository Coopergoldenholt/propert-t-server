module.exports = {
	getCustomerProperties: async (req, res) => {
		const db = req.app.get("db");

		const properties = await db.properties.get_user_properties(
			req.session.user.managedCompanyId
		);

		res.status(200).send(properties);
	},
};
