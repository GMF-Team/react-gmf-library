import React, { useEffect } from 'react';
import { Element } from './Element';
import { ImportScript } from './ImportScript';

function VerticalTimeline(props) {
	const scriptFile = props.scriptFile;
	const scriptId = props.scriptId;

	const colPos = props.colPos ? props.colPos : null;
	if (!colPos) console.log('Error: ColPos not defined!');

	const contents = props.contents ? props.contents[colPos] : null;
	const sectionClass = props.sectionClass ? props.sectionClass : null;
	const sectionId = props.sectionId ? props.sectionId : null;

	useEffect(() => {
		ImportScript(scriptFile, scriptId);
	}, []);

	return (
		<>
			<section
				className={
					'section-verticaltimeline position-relative z-index-1 overflow-hidden padding-y-xl ' +
					sectionClass
				}
				id={sectionId}>
				<div className='container max-width-adaptive-lg'>
					<div className='v-timeline js-v-timeline'>
						{contents &&
							contents.length &&
							contents.map((item, index) => (
								<div
									className='v-timeline__section js-v-timeline__section'
									key={index}>
									<div
										className='v-timeline__marker bg-contrast-high border border-3 border-contrast-lower'
										aria-hidden='true'></div>

									<div className='v-timeline__items-group'>
										<div className='v-timeline__item bg-contrast-lower padding-md radius-md shadow-xs'>
											<div className='v-timeline__date margin-bottom-sm'>
												<Element
													data={item}
													type='date'
													customTag='time'
													customClass='v-timeline__date-value'
												/>
											</div>

											<div className='text-component'>
												<Element data={item} type='header' customTag='h4' />
												<Element data={item} type='bodytext' />
											</div>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</section>
		</>
	);
}

export { VerticalTimeline };
