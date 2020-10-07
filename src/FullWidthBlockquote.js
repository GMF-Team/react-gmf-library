import React from 'react';
import { Element } from './Element';

function FullWidthBlockquote(props) {
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
						className={'full-width-blockquote ' + sectionClass}
						id={sectionId}>
						<blockquote className='position-relative z-index-1 bg-contrast-lower text-center padding-y-xxl'>
							<div className='container max-width-adaptive-sm'>
								<svg
									className='icon icon--xxl color-contrast-low'
									aria-hidden='true'
									viewBox='0 0 64 64'>
									<polygon
										fill='currentColor'
										points='2 36 17 2 26 2 15 36 26 36 26 62 2 62 2 36'
									/>
									<polygon
										fill='currentColor'
										points='38 36 53 2 62 2 51 36 62 36 62 62 38 62 38 36'
									/>
								</svg>
								<div className='text-component margin-top-lg'>
									<Element data={item} type='header' customTag='h1' />
									<Element data={item} type='bodytext' customClass='text-xl' />
								</div>
							</div>
						</blockquote>
					</section>
				))}
		</>
	);
}

export { FullWidthBlockquote };
