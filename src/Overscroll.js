import React, { useState, useEffect } from 'react';
import { Element } from './Element';
import { ElementHelper } from './ElementHelper';
import { ImportScript } from './ImportScript';

function Overscroll(props) {
	const [content, setContent] = useState([]);
	const scriptFile = props.scriptFile;
	const scriptId = props.scriptId;

	const colPos = props.colPos ? props.colPos : null;
	if (!colPos) console.log('Error: ColPos not defined!');

	const contents = props.contents ? props.contents[colPos] : null;
	const sectionClass = props.sectionClass ? props.sectionClass : null;
	const sectionId = props.sectionId ? props.sectionId : null;

	useEffect(() => {
		if (contents && contents.length) {
			ImportScript(scriptFile, scriptId);
			setContent(contents);
		}
	}, [contents]);

	return content && content.length ? (
		<div className='section-overscroll js-overscroll-section'>
			<section
				className={
					'overscroll-section__sticky-content js-overscroll-section__sticky-content ' +
					sectionClass
				}
				id={sectionId}
				style={{
					backgroundImage:
						"linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 40%), url('" +
						ElementHelper.getFirstImageUrl(content, 0, 1280, 800) +
						"')",
				}}>
				<div className='container max-width-100% min-height-100vh flex flex-wrap items-center'>
					<div className='text-component text-left width-50% margin-left-xl display@sm'>
						<Element data={content[0]} type='header' customTag='h2' />
						<Element data={content[0]} type='subheader' customTag='h3' />
					</div>
				</div>
			</section>

			<section className='overscroll-section__scroll-content bg js-overscroll-section__scroll-content'>
				<div className='container max-width-md padding-y-xl'>
					<div className='text-component hide@sm margin-bottom-md'>
						<Element data={content[0]} type='header' customTag='h2' />
						<Element data={content[0]} type='subheader' customTag='h3' />
					</div>
					<div className='text-component line-height-lg v-space-md'>
						<Element data={content[0]} type='bodytext' />
					</div>
				</div>
			</section>
		</div>
	) : null;
}

export { Overscroll };
