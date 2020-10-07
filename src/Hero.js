import React, { useState, useEffect } from 'react';
import { Element } from './Element';
import { ElementHelper } from './ElementHelper';

function Hero(props) {
	const [content, setContent] = useState([]);

	const colPos = props.colPos ? props.colPos : null;
	if (!colPos) console.log('Error: ColPos not defined!');

	const contents = props.contents ? props.contents[colPos] : null;
	const sectionClass = props.sectionClass ? props.sectionClass : null;
	const sectionId = props.sectionId ? props.sectionId : null;

	useEffect(() => {
		setContent(contents);
	}, [contents]);

	return content && content.length ? (
		<section
			className={'section-hero padding-y-xxl ' + sectionClass}
			id={sectionId}
			style={{
				backgroundImage:
					"linear-gradient(45deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 40%), url('" +
					ElementHelper.getFirstImageUrl(content, 0, 1280, 800) +
					"')",
			}}>
			<div className='container max-width-100% min-height-50vh flex flex-wrap items-center'>
				<div className='text-component margin-bottom-sm width-50% margin-left-xl'>
					<Element
						data={content[0]}
						type='header'
						customTag='h1'
						customId='hero'
						customClass='heroc'
					/>
					<Element data={content[0]} type='subheader' wrap='strong' />
					<Element data={content[0]} type='bodytext' />
				</div>
			</div>
		</section>
	) : null;
}

export { Hero };
