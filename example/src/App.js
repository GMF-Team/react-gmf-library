import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Logo from './Logo';
import Data from './Data';
import './style.css'

import {
	Accordion,
	CardV9,
	ContactV3,
	FeatureV2,
	FeatureV11,
	FeatureV11BottomCenter,
	MainFooter,
	FullWidthBlockquote,
	Hero,
	Header,
	VerticalTimeline,
	Overscroll,
} from 'react-gmf-library';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact={true} path='/' render={Home} />
				<Route exact path={['/imprint']} component={Imprint} />
				<Route exact path={['/privacy']} component={Privacy} />
				<Route component={FourZeroFour} />
			</Switch>
		</Router>
	);
};

const Home = () => {
	return (
		<>
			<Header
				accessibilityName='Hauptmenu'
				showNavigation={true}
				scriptFile='scripts/_1_main-header.js'
				scriptId='header'
				logo={Logo}
				menuItems={[
					{
						name: 'Testpage Accordion',
						href: '#accordion',
					},
				]}
				link={Link}
			/>

			<Hero
				contents={Data.Hero}
				colPos='colPos100'
				sectionId='hero'
				sectionClass=''
			/>

			<FeatureV2
				contents={Data.FeatureV2}
				colPos='colPos150'
				sectionId='featurev2'
				sectionClass=''
			/>

			<Overscroll
				contents={Data.Overscroll}
				colPos='colPos200'
				sectionId='overscroll'
				sectionClass=''
				scriptFile='scripts/_1_overscroll-section.js'
				scriptId='overscroll'
			/>

			<FeatureV11
				contents={Data.FeatureV11}
				colPos='colPos250'
				sectionId='featurev11'
				sectionClass='bg-contrast-lower'
			/>

			<VerticalTimeline
				contents={Data.VerticalTimeline}
				colPos='colPos300'
				sectionId='verticaltimeline'
				sectionClass=''
				scriptFile='scripts/_1_vertical-timeline.js'
				scriptId='timeline'
			/>

			<CardV9
				contents={Data.CardV9}
				colPos='colPos350'
				sectionId='cardv9'
				sectionClass='bg-contrast-lower'
				colWidth='col-12 col-6@md'
				moreButton='Mehr erfahren'
			/>

			<FeatureV11BottomCenter
				contents={Data.FeatureV11BottomCenter}
				colPos='colPos400'
				sectionId='featurev11bottomcenter'
				sectionClass=''
				colWidth='col-12 col-6@md'
				moreButton='Mehr erfahren'
			/>

			<FullWidthBlockquote
				contents={Data.FullWidthBlockquote}
				colPos='colPos450'
				sectionId='fullwidthblockquote'
				sectionClass=''
			/>

			<Accordion
				contents={Data.Accordion}
				colPos='colPos500'
				sectionId='accordion'
				sectionClass=''
			/>

			<ContactV3
				contents={Data.ContactV3}
				colPos='colPos550'
				sectionId='contactv3'
				sectionClass='bg-contrast-lower'
				submitButton='Jetzt informieren'
				reactAppContactUrl={process.env.REACT_APP_API_CONTACT_URL}
				reactAppApiContactToken={process.env.REACT_APP_API_CONTACT_TOKEN}
			/>

			<MainFooter
				contents={Data.MainFooter}
				colPos='colPos600'
				sectionId='mainfooter'
				sectionClass=''
				logo={Logo}
				link={Link}
			/>
		</>
	);
};

const Imprint = () => {
	return (
		<div>
			Imprint, <Link to='/'>Home</Link>
		</div>
	);
};

const Privacy = () => {
	return (
		<div>
			Privacy, <Link to='/'>Home</Link>
		</div>
	);
};

const FourZeroFour = () => {
	return (
		<div>
			FourZeroFour, <Link to='/'>Home</Link>
		</div>
	);
};

export default App;
