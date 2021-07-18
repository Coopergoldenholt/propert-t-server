module.exports = {
	cleanPostData: (posts) => {
		for (let i = 0; i < posts.length; i++) {
			let cleanImageArr = [];

			let newImageData = posts[i].array.replace("{", "");
			newImageData = newImageData.replace("}", "");
			newImageData = newImageData.split(",");

			for (let j = 0; j < newImageData.length; j++) {
				if (j % 3 === 0 || j === 0) {
					let newObj = {
						id: newImageData[j].slice(2),
						imageURL: newImageData[j + 1],
						typeOfImage: newImageData[j + 2].slice(0, -2),
					};
					cleanImageArr.push(newObj);
				}
			}
			posts[i].images = cleanImageArr;
			posts[i].array = undefined;
		}
		return posts;
	},
};
