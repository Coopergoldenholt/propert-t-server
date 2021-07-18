module.exports = {
	setAuthByEmployee: async (req, res) => {
		const db = req.app.get("db");
		const { userId, authIds } = req.body;
		const currentProperties = await db.authorizations.get_all_property_auth([
			userId,
		]);

		let currentAuthIds = currentProperties.map((ele) => ele.id);

		authIds.map(async (ele) => {
			if (currentAuthIds.indexOf(ele) !== -1) {
				//Run Deletion of Property Auth
				await db.authorizations.delete_auth([ele]);
			} else {
				//Run Addition of Property Auth
				await db.authorizations.set_new_property_auth([ele, userId]);
			}
		});
		res.status(200).send("Good");
	},
};
