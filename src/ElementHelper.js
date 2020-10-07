import React from 'react';

const ElementHelper = {
	getFirstImageUrl: (content, pos, width, height) => {
		if (
			typeof content !== undefined &&
			content[pos].content.gallery.length &&
			typeof content[pos].content.gallery[0].publicUrl === 'string'
		) {
			let imageCollection = [];
			for (var image of content[pos].content.gallery) {
				let imageUrl = image.publicUrl;
				let search = process.env.REACT_APP_API_BASE_URL;
				let replace = process.env.REACT_APP_API_BASE_URL + 'resize/image/';
				imageCollection.push(
					imageUrl.replace(search, replace) + '/' + width + '/' + height
				);
			}

			return imageCollection[0];
		}
	},

	getImages: (content, pos, width, height) => {
		if (
			typeof content !== undefined &&
			content[pos].content.gallery.length &&
			typeof content[pos].content.gallery[0].publicUrl === 'string'
		) {
			let imageCollection = [];
			for (var image of content[pos].content.gallery) {
				if (image.publicUrl) {
					let imageUrl = image.publicUrl;
					let search = process.env.REACT_APP_API_BASE_URL;
					let replace = process.env.REACT_APP_API_BASE_URL + 'resize/image/';
					imageCollection.push(
						imageUrl.replace(search, replace) + '/' + width + '/' + height
					);
				}
			}

			return imageCollection.map((image, index) => (
				<img src={image} alt='' key={index} />
			));
		}
	},
};

export { ElementHelper };
