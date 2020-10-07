import React, { useState, useEffect } from 'react';
import { Element } from './Element';

function MainFooter(props) {
	const [content, setContent] = useState([]);
	const Logo = props.logo;
	const Link = props.link;
	const colPos = props.colPos ? props.colPos : null;
	if (!colPos) console.log('Error: ColPos not defined!');

	const contents = props.contents ? props.contents[colPos] : null;
	const sectionClass = props.sectionClass ? props.sectionClass : null;
	const sectionId = props.sectionId ? props.sectionId : null;

	useEffect(() => {
		setContent(contents);
	}, [contents]);

	return content && content.length ? (
		<footer
			className={'main-footer padding-y-lg ' + (sectionClass ? sectionClass : '')}
			id={sectionId}>
			<div className='container max-width-adaptive-lg'>
				<div className='grid gap-lg'>
					<div className='col-12 col-6@sm'>
						{content.map((item, index) => (
							<div key={index}>
								<div className='text-component'>
									<Element data={item} type='header' customTag='h4' />
									<Element data={item} type='subheader' customTag='p' />
									<Element data={item} type='bodytext' />
									<Element
										data={item}
										type='upload'
										width='200'
										customClass='col-12'
									/>
								</div>
							</div>
						))}
					</div>

					<div className='col-12 col-6@sm display@sm'>
						<Link to='/'>
							<Logo />
						</Link>
					</div>
				</div>

				<div className='border-top padding-top-xs margin-top-lg flex justify-end'>
					<div className='text-sm'>
						<Link to='/privacy' className='color-contrast-high margin-left-xs'>
							Datenschutz
						</Link>
						<Link to='/imprint' className='color-contrast-high margin-left-xs'>
							Impressum
						</Link>
					</div>
				</div>
			</div>
		</footer>
	) : null;
}

export { MainFooter };
