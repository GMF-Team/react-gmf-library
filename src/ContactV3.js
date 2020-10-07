import React, { useState } from 'react';
import { Element } from './Element';
import axios from 'axios';

function ContactV3(props) {
	const colPos = props.colPos ? props.colPos : null;
	if (!colPos) console.log('Error: ColPos not defined!');

	const reactAppContact = {
		url: props.reactAppContactUrl,
		token: props.reactAppApiContactToken,
	}
	const contents = props.contents ? props.contents[colPos] : null;
	const sectionClass = props.sectionClass ? props.sectionClass : null;
	const sectionId = props.sectionId ? props.sectionId : null;

	const submitButton = props.submitButton ? props.submitButton : 'Submit';

	const [contactName, setContactName] = useState('');
	const [contactEmail, setContactEmail] = useState('');
	const [contactMessage, setContactMessage] = useState('');
	const [formState, setFormState] = useState(false);
	const [resultMessage, setResultMessage] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		axios({
			method: 'post',
			url: reactAppContact.url,
			headers: { 'content-type': 'application/json' },
			data: {
				token: reactAppContact.token,
				name: contactName,
				email: contactEmail,
				message: contactMessage,
			},
		})
			.then((result) => {
				setContactName('');
				setContactEmail('');
				setContactMessage('');
				setResultMessage(result.data.message);
				setFormState(true);
			})
			.catch((error) => {
				console.log('Error message:');
				console.log(error.message);
			});
	};

	return (
		<>
			<section
				className={'contact-v3 padding-y-xl ' + sectionClass}
				id={sectionId}>
				<div className='container max-width-adaptive-lg'>
					<div className='grid gap-sm'>
						<div className='col-6@sm col-12'>
							{contents &&
								contents.length &&
								contents.map((item, index) => (
									<div className='text-component' key={index}>
										<Element data={item} type='header' customTag='h4' />
										<Element data={item} type='bodytext' />
										<Element
											data={item}
											type='image'
											width='1280'
											height='500'
											imageClass='block width-100% height-100% object-cover'
										/>
									</div>
								))}
						</div>
						<div className='col-6@sm col-12'>
							{formState ? (
								<>
									<p>{resultMessage}</p>
								</>
							) : (
								<>
									<form onSubmit={handleSubmit}>
										<div className='margin-bottom-sm'>
											<div className='margin-bottom-sm'>
												<label
													className='form-label margin-bottom-xxs'
													htmlFor='contactName'>
													Name
												</label>
												<input
													className='form-control width-100%'
													type='text'
													name='contactName'
													id='contactName'
													value={contactName}
													onChange={(e) => setContactName(e.target.value)}
													required
												/>
											</div>

											<div className='margin-bottom-sm'>
												<label
													className='form-label margin-bottom-xxs'
													htmlFor='contactEmail'>
													Email
												</label>
												<input
													className='form-control width-100%'
													type='email'
													name='contactEmail'
													id='contactEmail'
													value={contactEmail}
													onChange={(e) => setContactEmail(e.target.value)}
													required
												/>
											</div>

											<div className='margin-bottom-sm'>
												<label
													className='form-label margin-bottom-xxs'
													htmlFor='contactMessage'>
													Nachricht
												</label>
												<textarea
													className='form-control width-100%'
													rows='9'
													name='contactMessage'
													id='contactMessage'
													value={contactMessage}
													onChange={(e) =>
														setContactMessage(e.target.value)
													}></textarea>
											</div>

											<div className='text-right'>
												<button className='btn btn--primary'>
													{submitButton}
												</button>
											</div>
										</div>
									</form>
								</>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export { ContactV3 };
