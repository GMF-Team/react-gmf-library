import React from 'react';
import { Element } from './Element';

function FeatureV2(props) {
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
						className={'feature-v2 padding-y-xl ' + (sectionClass ? sectionClass : '')}
						id={sectionId}>
						<div className='container max-width-adaptive-lg'>
							<div className='grid gap-md'>
								<div className='col-4@md'>
									<Element data={item} type='subheader' customTag='h4' />
								</div>
								<div className='col-8@md'>
									<div className='text-component padding-left-md@md'>
										<Element data={item} type='header' customTag='h2' />
										<Element data={item} type='bodytext' />
										<Element
											data={item}
											type='image'
											width='800'
											height='800'
										/>
										<Element
											data={item}
											type='upload'
											width='400'
											customClass='col-12 col-6@md'
										/>
									</div>
								</div>
							</div>
						</div>
					</section>
				))}
		</>
	);
}

export { FeatureV2 };
