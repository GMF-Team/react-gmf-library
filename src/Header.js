import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { ImportScript } from './ImportScript';

function Header(props) {
	const Logo = props.logo;
	const scriptFile = props.scriptFile;
	const scriptId = props.scriptId;
	const showNavigation = props.showNavigation ? props.showNavigation : null;
	const menuItems = props.menuItems ? props.menuItems : null;
	const accessibilityName = props.accessibilityName
		? props.accessibilityName
		: 'Menu';

	useEffect(() => {
		if (showNavigation) {
			ImportScript(scriptFile, scriptId);
		}
	}, [showNavigation, scriptFile, scriptId]);

	const handleHeaderChange = (evt) => {
		evt.preventDefault();
		const elementId = evt.target.hash.replace('#', '');
		const scrollPoint = document.getElementById(elementId);
		const yOffset = -125;
		const y =
			scrollPoint.getBoundingClientRect().top + window.pageYOffset + yOffset;
		window.scrollTo({ top: y, behavior: 'smooth' });
	};

	return (
		<header className='header position-fixed opacity-90% js-header '>
			<div className='header__container container max-width-lg'>
				<div className='header__logo'>
					<Logo />
				</div>

				{showNavigation && (
					<>
						<button
							className='btn btn--subtle header__trigger js-header__trigger padding-bottom-sm padding-top-sm padding-right-xxs padding-left-sm shadow-none'
							aria-label='Toggle menu'
							aria-expanded='false'
							aria-controls='header-nav'>
							<i className='header__trigger-icon' aria-hidden='true'></i>
							<span className='sr-only'>{accessibilityName}</span>
						</button>

						<nav
							className='header__nav js-header__nav'
							id='header-nav'
							role='navigation'
							aria-label='Main'>
							<div className='header__nav-inner'>
								<div className='header__label sr-only'>{accessibilityName}</div>
								<ul className='header__list'>
									{menuItems &&
										menuItems.length &&
										menuItems.map((item, index) => (
											<li className='header__item' key={index}>
												<a
													href={item.href}
													className='header__link'
													onClick={handleHeaderChange}>
													{item.name}
												</a>
											</li>
										))}
								</ul>
							</div>
						</nav>
					</>
				)}
			</div>
		</header>
	);
}

export { Header };
