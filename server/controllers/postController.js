const imageFunctions = require("../functions/imageFunctions");
const cleaningFunctions = require("../functions/cleaningFunctions");

module.exports = {
	savePost: async (req, res) => {
		const db = req.app.get("db");
		const {
			summary,
			title,
			beforeImages,
			afterImages,
			propertyId,
			companyId,
			managedCompanyId,
		} = req.body;
		const date = `${new Date().getFullYear()}-${
			new Date().getMonth() + 1
		}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
		// let [post] = await db.posts.insert_post([
		// 	companyId,
		// 	propertyId,
		// 	date,
		// 	7,
		// 	summary,
		// 	title,
		// 	managedCompanyId,
		// ]);

		for (let image of beforeImages) {
			const db = req.app.get("db");
			let imageURL = await imageFunctions.saveImage(
				image,
				companyId,
				managedCompanyId,
				propertyId
			);
			// await db.images.insert_post_image([imageURL, "before", post.id]);
		}
		// for (let image of afterImages) {
		// 	const db = req.app.get("db");
		// 	let imageURL = await imageFunctions.saveImage(
		// 		image,
		// 		companyId,
		// 		managedCompanyId,
		// 		propertyId
		// 	);
		// 	await db.images.insert_post_image([imageURL, "after", post.id]);
		// }

		res.status(200).send("request created");
	},

	getPropertyPosts: async (req, res) => {
		const db = req.app.get("db");
		const { propertyId } = req.params;
		let posts = await db.posts.get_posts_by_property([propertyId]);
		posts = cleaningFunctions.cleanPostData(posts);
		res.status(200).send(posts);
	},
	getPosts: async (req, res) => {
		const db = req.app.get("db");
		const { id } = req.query;
		let posts = [];
		if (req.session.user.userType === "customer") {
			posts = await db.posts.get_posts_by_managed_company(
				req.session.user.managedCompanyId
			);
		} else {
			posts = await db.posts.get_posts_by_company([id]);
		}

		posts = cleaningFunctions.cleanPostData(posts);
		res.status(200).send(posts);
	},
};
