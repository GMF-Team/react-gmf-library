import React, { useState } from 'react';
import { Element } from './Element';

function Accordion(props) {
	const colPos = props.colPos ? props.colPos : null;
	if (!colPos) console.log('Error: ColPos not defined!');

	const contents = props.contents ? props.contents[colPos] : null;
	const sectionClass = props.sectionClass ? props.sectionClass : null;
	const sectionId = props.sectionId ? props.sectionId : null;

	const [accordionActive, setAccordionState] = useState(-1);

	const handleAccordionClick = (i) => {
		if (accordionActive === i) {
			setAccordionState(-1);
		} else {
			setAccordionState(i);
		}
	};

	return (
		<>
			<section className={'accordion-section ' + sectionClass} id={sectionId}>
				<div className='container max-width-adaptive-lg'>
					<ul
						className='accordion js-accordion'
						data-animation='on'
						data-multi-items='on'>
						{contents &&
							contents.length &&
							contents.map((item, index) => (
								<li
									className={`accordion__item  js-accordion__item ${
										accordionActive === index ? 'accordion__item--is-open' : ''
									}`}
									onClick={() => handleAccordionClick(index)}
									key={index}>
									<button
										className='reset accordion__header padding-y-sm padding-x-md js-tab-focus'
										type='button'>
										<Element data={item} type='header' customClass='text-md' />

										<svg
											className='icon accordion__icon-arrow no-js:is-hidden'
											viewBox='0 0 16 16'
											aria-hidden='true'>
											<g
												className='icon__group'
												fill='none'
												stroke='currentColor'
												strokeLinecap='square'
												strokeMiterlimit='10'>
												<path d='M2 2l12 12' />
												<path d='M14 2L2 14' />
											</g>
										</svg>
									</button>

									<div className='accordion__panel js-accordion__panel'>
										<div className='text-component padding-top-xxxs padding-x-md padding-bottom-md'>
											<Element data={item} type='bodytext' />
										</div>
									</div>
								</li>
							))}
					</ul>
				</div>
			</section>
		</>
	);
}

export { Accordion };
