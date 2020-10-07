import React from 'react';
import { Element } from './Element';

function FeatureV11BottomCenter(props) {
	const colPos = props.colPos ? props.colPos : null;
	if (!colPos) console.log('Error: ColPos not defined!');

	const contents = props.contents ? props.contents[colPos] : null;
	const sectionClass = props.sectionClass ? props.sectionClass : null;
	const sectionId = props.sectionId ? props.sectionId : null;

	const moreButton = props.moreButton ? props.moreButton : 'More';
	const colWidth = props.colWidth ? props.colWidth : 'col-12';

	return (
		<>
			<section
				className={
					'feature-v11-bottom-center padding-y-xl position-relative z-index-1 ' +
					sectionClass
				}
				id={sectionId}>
				<div className='container max-width-adaptive-lg position-relative'>
					<div className='grid gap-sm'>
						{contents &&
							contents.length &&
							contents.map((item, index) => (
								<div className={colWidth} key={index}>
									<div className='grid position-relative justify-center padding-x-md padding-x-0@md height-100%'>
										<div className='z-index-2 col-8@md'>
											<div className='text-component bg padding-md padding-lg@md shadow-sm line-height-md margin-top-xxxl'>
												<Element data={item} type='header' customTag='h4' />
												<Element data={item} type='bodytext' />
												<a
													href={
														item.content.headerLink &&
														item.content.headerLink.url
													}
													className='btn btn--primary margin-top-xs'
													target='_blank'
													rel='noopener noreferrer'>
													{moreButton}
												</a>
											</div>
										</div>

										<figure className='position-absolute z-index-1 left-0 top-0 right-0 height-90%'>
											<Element
												data={item}
												type='image'
												width='1280'
												height='500'
												imageClass='block width-100% height-100% object-cover'
											/>
										</figure>
									</div>
								</div>
							))}
					</div>
				</div>
			</section>
		</>
	);
}

export { FeatureV11BottomCenter };
