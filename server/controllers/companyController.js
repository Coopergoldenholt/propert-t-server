const imageFunctions = require("../functions/imageFunctions");

module.exports = {
	getManagedCompanies: async (req, res) => {
		const db = req.app.get("db");
		const { id } = req.params;
		const companies = await db.register.get_managed_companies_by_company_id(id);
		res.status(200).send(companies);
	},
	addManagedCompany: async (req, res) => {
		const db = req.app.get("db");
		const { companyName } = req.body;

		let [managedCompany] = await db.companies.create_managing_company([
			1,
			companyName,
		]);

		imageFunctions.createManagingCompanyFolder(1, managedCompany.id);

		res.status(200).send("Company Created");
	},

	getUsers: async (req, res) => {
		const db = req.app.get("db");
		const users = await db.users.get_all_users(1);

		res.status(200).send(users);
	},
	getEmployees: async (req, res) => {
		const db = req.app.get("db");
		const users = await db.users.get_all_employees_by_admin(
			req.session.user.companyId
		);

		res.status(200).send(users);
	},

	getAllCompanyUsers: async (req, res) => {
		const db = req.app.get("db");
		const users = await db.users.get_all_users_from_company(
			req.session.user.companyId
		);
		res.status(200).send(users);
	},

	getProperties: async (req, res) => {
		const db = req.app.get("db");
		let properties = [];
		if (req.session.user.userType === "customer") {
			properties = await db.properties.get_properties_by_managed_company(
				req.session.user.managedCompanyId
			);
		} else {
			properties = await db.properties.get_all_company_properties([
				req.session.user.companyId,
			]);
		}
		res.status(200).send(properties);
	},

	addProperty: async (req, res) => {
		const db = req.app.get("db");
		let { name, managedCompany, companyId } = req.body;

		const [property] = await db.properties.add_property([
			1,
			managedCompany,
			name,
		]);

		imageFunctions.createPropertyFolder(1, managedCompany, property.id);

		res.status(200).send("Created");
	},
	deleteProperty: async (req, res) => {
		const db = req.app.get("db");
		let { companyId } = req.params;

		const deleted = await db.properties.delete_property([companyId]);
		res.status(200).send("Deleted");
	},
	deleteCompany: async (req, res) => {
		const db = req.app.get("db");
		let { companyId } = req.params;

		const deleted = await db.companies.delete_managing_company([companyId]);
		res.status(200).send("Deleted");
	},
	getPropertiesByMangagedCompany: async (req, res) => {
		const db = req.app.get("db");
		const { id } = req.params;
		const properties = await db.properties.get_properties_by_managed_company(
			id
		);
		res.status(200).send(properties);
	},
};
