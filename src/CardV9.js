import React from 'react';
import { Element } from './Element';
import { ElementHelper } from './ElementHelper';

function CardV9(props) {
	const colPos = props.colPos ? props.colPos : null;
	if (!colPos) console.log('Error: ColPos not defined!');

	const contents = props.contents ? props.contents[colPos] : null;
	const sectionClass = props.sectionClass ? props.sectionClass : null;
	const sectionId = props.sectionId ? props.sectionId : null;

	const moreButton = props.moreButton ? props.moreButton : 'More';
	const colWidth = props.colWidth ? props.colWidth : 'col-12';

	return (
		<section
			className={'card-v9-section padding-y-xl ' + (sectionClass ? sectionClass : '')}
			id={sectionId}>
			<div className='container max-width-adaptive-lg'>
				<div className='grid gap-xs justify-center'>
					{contents &&
						contents.length &&
						contents.map((item, index) => (
							<div className={colWidth} key={index}>
								<a
									href={item.content.headerLink && item.content.headerLink.url}
									target='_blank'
									rel='noopener noreferrer'
									className='card-v9 card-v9--overlay-bg radius-md'
									aria-labelledby='card-title-2'
									style={{
										backgroundImage:
											"url('" +
											ElementHelper.getFirstImageUrl(
												contents,
												index,
												600,
												400
											) +
											"')",
									}}>
									<div className='card-v9__content padding-md'>
										<div className='padding-bottom-xxxl max-width-xs'>
											<Element
												data={item}
												type='header'
												customTag='h2'
												customId={'card-title-' + index}
												customClass='text-xl margin-bottom-xs'
											/>
											<Element data={item} type='subheader' customTag='h3' />
											<Element data={item} type='bodytext' />
										</div>

										<div className='margin-top-auto'>
											<span className='card-v9__btn'>
												<i>{moreButton}</i>
											</span>
										</div>
									</div>
								</a>
							</div>
						))}
				</div>
			</div>
		</section>
	);
}

export { CardV9 };
