const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
var stream = require("stream");

module.exports = {
	saveImage: async (image, companyId, managedCompanyId, propertyId) => {
		const gc = new Storage({
			projectId: "landscaping-1596651165198",
			keyFilename: path.join(
				__dirname,
				"../../landscaping-1596651165198-d20b30bb1c9f.json"
			),
		});

		let imageBuffer = Buffer.from(image.base64, "base64");

		const bucket = gc.bucket("proper-t-images");
		const imageId = uuidv4();
		var file = bucket.file(
			`${companyId}-` +
				`${managedCompanyId}-` +
				`${propertyId}-` +
				imageId +
				".jpeg"
		);
		file.save(
			imageBuffer,
			{
				// metadata: { contentType: mimeType },
				public: true,
				validation: "md5",
			},
			function (error) {
				if (error) {
					return res.serverError("Unable to upload the image.");
				}

				return res.ok("Uploaded");
			}
		);
		// const stuff = await image.base64.pipe(
		// 	bucket
		// 		.file(
		// 			`${companyId}/` +
		// 				`${managedCompanyId}/` +
		// 				`${propertyId}/` +
		// 				imageId +
		// 				".jpeg"
		// 		)
		// 		.createWriteStream({
		// 			resumable: false,
		// 			gzip: true,
		// 		})
		// );

		// try {
		// 	const imageId = uuidv4();
		// 	// to declare some path to store your converted image
		// 	const path =
		// 		"images/" +
		// 		`${companyId}/` +
		// 		`${managedCompanyId}/` +
		// 		`${propertyId}/` +
		// 		imageId +
		// 		".jpeg";
		// 	const imgdata = image.base64;
		// 	// to convert base64 format into random filename
		// 	const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");
		// 	fs.writeFileSync(path, base64Data, { encoding: "base64" });
		// 	let url = `${companyId}/${managedCompanyId}/${propertyId}/${imageId}.jpeg`;
		// 	return url;
		// } catch (e) {
		// 	console.log(e);
		// }
	},
	createManagingCompanyFolder: async (companyId, managingCompanyId) => {
		let folderName = `images/${companyId}/${managingCompanyId}`;
		if (!fs.existsSync(folderName)) {
			fs.mkdirSync(folderName);
		}
	},
	createPropertyFolder: async (companyId, managingCompanyId, propertyId) => {
		let folderName = `images/${companyId}/${managingCompanyId}/${propertyId}`;
		if (!fs.existsSync(folderName)) {
			fs.mkdirSync(folderName);
		}
	},
};
