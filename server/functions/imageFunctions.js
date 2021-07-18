const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

module.exports = {
	saveImage: async (image, companyId, managedCompanyId, propertyId) => {
		try {
			const imageId = uuidv4();
			// to declare some path to store your converted image
			const path =
				"images/" +
				`${companyId}/` +
				`${managedCompanyId}/` +
				`${propertyId}/` +
				imageId +
				".jpeg";

			const imgdata = image.base64;

			// to convert base64 format into random filename
			const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");

			fs.writeFileSync(path, base64Data, { encoding: "base64" });
			let url = `http://localhost:4068/${companyId}/${managedCompanyId}/${propertyId}/${imageId}.jpeg`;
			return url;
		} catch (e) {
			console.log(e);
		}
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
