import React from 'react';
import parse from 'html-react-parser';
import Moment from 'moment';
import 'moment/locale/de';

function Element(props) {
	const type = props.type;
	const data = props.data;
	const CustomTag = props.customTag ? `${props.customTag}` : `div`;
	const customId = props.customId;
	const customClass = props.customClass;

	const parseHeader = () => {
		if (
			typeof data.content.header !== undefined &&
			data.content.header &&
			type === 'header'
		)
			return (
				<CustomTag className={customClass} id={customId}>
					<span>{parse(data.content.header)}</span>
				</CustomTag>
			);

		if (
			data.content.shortcut &&
			data.content.shortcut[0].content.header &&
			type === 'header'
		)
			return (
				<CustomTag className={customClass} id={customId}>
					<span>{parse(data.content.shortcut[0].content.header)}</span>
				</CustomTag>
			);

		return null;
	};

	const parseSubHeader = () => {
		if (
			typeof data.content.subheader !== undefined &&
			data.content.subheader &&
			type === 'subheader'
		)
			return (
				<CustomTag className={customClass} id={customId}>
					<span>{parse(data.content.subheader)}</span>
				</CustomTag>
			);

		if (
			data.content.shortcut &&
			data.content.shortcut[0].content.subheader &&
			type === 'subheader'
		)
			return (
				<CustomTag className={customClass} id={customId}>
					<span>{parse(data.content.shortcut[0].content.subheader)}</span>
				</CustomTag>
			);

		return null;
	};

	const parseDate = () => {
		if (
			typeof data.content.date !== undefined &&
			data.content.date &&
			type === 'date'
		)
			return (
				<CustomTag className={customClass} id={customId}>
					<span>{Moment.unix(data.content.date).format('DD. MMMM YYYY')}</span>
				</CustomTag>
			);

		if (
			data.content.shortcut &&
			data.content.shortcut[0].content.date &&
			type === 'date'
		)
			return (
				<CustomTag className={customClass} id={customId}>
					<span>{parse(data.content.shortcut[0].content.date)}</span>
				</CustomTag>
			);

		return null;
	};

	const parseBodytext = () => {
		if (typeof data.content.bodytext === 'string' && type === 'bodytext')
			return <CustomTag>{parse(data.content.bodytext)}</CustomTag>;

		// The bodytext has an array element, e.g. table. Dont do the parsing here
		if (typeof data.content.bodytext === 'object' && type === 'bodytext') {
			return <></>;
		}

		if (
			data.content.shortcut &&
			typeof data.content.shortcut[0].content.bodytext === 'string' &&
			type === 'bodytext'
		)
			return (
				<CustomTag>
					{parse(data.content.shortcut[0].content.bodytext)}
				</CustomTag>
			);

		return null;
	};

	const parseImage = () => {
		if (data.content.gallery.length > 0 && type === 'image') {
			const width = props.width;
			const height = props.height;
			const imageClass = props.imageClass;
			let imageCollection = [];

			for (var image of data.content.gallery) {
				let imageUrl = image.publicUrl;
				let search = process.env.REACT_APP_API_BASE_URL;
				let replace = process.env.REACT_APP_API_BASE_URL + 'resize/image/';
				imageCollection.push(
					imageUrl.replace(search, replace) + '/' + width + '/' + height
				);
			}

			return imageCollection.map((image, index) => (
				<img src={image} alt='' key={index} className={imageClass} />
			));
		} else {
			return null;
		}
	};

	const parseTable = () => {
		let dataRows = [];
		data.content.bodytext.forEach(function (rows, rowKey) {
			let dataCells = [];
			rows.forEach(function (cell, cellKey) {
				dataCells.push(
					<td key={cellKey} className='table__cell' role='cell'>
						<span className='table__label' aria-hidden='true'>
							{cellKey}
						</span>
						{cell}
					</td>
				);
			});
			dataRows.push(
				<tr key={rowKey} className='table__row'>
					{dataCells}
				</tr>
			);
		});

		return (
			<table className='table table--expanded@xs position-relative z-index-1 width-100% js-table'>
				<tbody className='table__body'>{dataRows}</tbody>
			</table>
		);
	};

	const parseDownload = () => {
		if (data.content.media.length > 0 && type === 'upload') {
			const width = props.width;
			const height = 0;
			let mediaCollection = [];

			for (var media of data.content.media) {
				let mediaUrl = media.publicUrl;
				let search = process.env.REACT_APP_API_BASE_URL;
				let replace = process.env.REACT_APP_API_BASE_URL + 'resize/image/';

				mediaCollection.push({
					title: media.properties.title ? media.properties.title : '',
					description: media.properties.description
						? media.properties.description
						: '',
					filename: media.properties.filename ? media.properties.filename : '',
					url: mediaUrl.replace(search, replace) + '/' + width + '/' + height,
					publicUrl: media.publicUrl,
				});
			}

			return (
				<div className='grid gap-sm' id={customId}>
					{mediaCollection.map((media, index) => (
						<div className={'thumbnail ' + customClass} key={index}>
							<a href={media.publicUrl} className='text-decoration-none color-contrast-medium' alt={media.description} target='blank'>
								<div className='grid gap-sm margin-bottom-sm'>
									<div className='col-3 col-4@md'>
										<img src={media.url} alt={media.description} key={index} />
									</div>
									<div className='col-12 col-8@md text-component'>
										{media.filename && <div className='filename_url'>{media.filename}</div>}
										{media.title && <div className='filename_title text-sm margin-top-sm'>{media.title}</div>}
										{media.description && <div className='filename_description text-sm margin-top-sm'>{media.description}</div>}
									</div>
								</div>
							</a>
						</div>
					))}
				</div>
			);
		} else {
			return null;
		}
	};

	let out = null;

	switch (data.type + '-' + type) {
		case 'minimal-header':
			out = parseHeader();
			break;
		case 'minimal-subheader':
			out = parseSubHeader();
			break;
		case 'minimal-date':
			out = parseDate();
			break;
		case 'minimal-bodytext':
			out = parseBodytext();
			break;
		case 'minimal-image':
			out = parseImage();
			break;
		case 'minimal-upload':
			out = null;
			break;

		case 'shortcut-header':
			out = parseHeader();
			break;
		case 'shortcut-subheader':
			out = parseSubHeader();
			break;
		case 'shortcut-date':
			out = parseDate();
			break;
		case 'shortcut-bodytext':
			out = parseBodytext();
			break;
		case 'shortcut-image':
			out = parseImage();
			break;
		case 'shortcut-upload':
			out = null;
			break;

		case 'table-header':
			out = parseHeader();
			break;
		case 'table-subheader':
			out = parseSubHeader();
			break;
		case 'table-date':
			out = parseDate();
			break;
		case 'table-bodytext':
			out = parseTable();
			break;
		case 'table-image':
			out = null;
			break;
		case 'table-upload':
			out = null;
			break;

		case 'uploads-header':
			out = parseHeader();
			break;
		case 'uploads-subheader':
			out = parseSubHeader();
			break;
		case 'uploads-date':
			out = parseDate();
			break;
		case 'uploads-bodytext':
			out = null;
			break;
		case 'uploads-image':
			out = null;
			break;
		case 'uploads-upload':
			out = parseDownload();
			break;

		default:
			console.log(
				`Sorry, No ${data.type} for ${type} type found for rendering.`
			);
	}
	return out;
}

export { Element };
