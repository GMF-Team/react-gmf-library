import React from 'react';
import { Element } from './Element';

function FeatureV11(props) {
	const colPos = props.colPos ? props.colPos : null;
	if (!colPos) console.log('Error: ColPos not defined!');

	const contents = props.contents ? props.contents[colPos] : null;
	const sectionClass = props.sectionClass ? props.sectionClass : null;
	const sectionId = props.sectionId ? props.sectionId : null;

	return (
		<>
			{contents &&
				contents.length &&
				contents.map((item, index) => (
					<section
						key={index}
						className={
							'feature-v11 position-relative z-index-1 bg-contrast-lower ' +
							sectionClass
						}
						id={sectionId}>
						<div className='container max-width-adaptive-lg position-relative'>
							<div className='grid padding-x-md padding-x-0@md'>
								<div className='position-relative z-index-2 col-6@md col-5@lg'>
									<div className='text-component bg padding-md padding-lg@md shadow-sm line-height-md margin-y-xxl'>
										<Element data={item} type='header' customTag='h1' />
										<Element data={item} type='bodytext' />
									</div>
								</div>

								<figure className='position-absolute z-index-1 top-0 right-0 height-100% col-10@md overflow-hidden'>
									<Element data={item} type='image' width='800' height='525' />
								</figure>
							</div>
						</div>
					</section>
				))}
		</>
	);
}

export { FeatureV11 };
