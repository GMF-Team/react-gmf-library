import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Logo from './Logo';

import {
	Accordion,
	CardV9,
	ContactV3,
	FeatureV2,
	FeatureV11,
	FeatureV11BottomCenter,
	Hero,
	Header,
	FooterMain,
} from 'react-gmf-library';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact={true} path='/' render={Home} />
			</Switch>
		</Router>
	);
};

const Home = () => {
	const dummyImage = [
		{
			publicUrl:
				'https://cms.gmf.design/resize/image/fileadmin/_processed_/2/1/csm_test_1b3cf1f7c2.jpg',
			properties: {
				title: 'Titel',
				description: 'Description',
				originalUrl: 'fileadmin/redakteur/bilder/test.jpg',
			},
		},
	];

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
				contents={{
					colPos100: [
						{
							type: 'minimal',
							colPos: 100,
							content: {
								header: 'Hero header',
								subheader: 'Hero subheader',
								headerLink: '',
								date: '0',
								bodytext: '<p>Hero Text</p>',
								gallery: dummyImage,
							},
						},
					],
				}}
				colPos='colPos100'
				sectionId='hero'
				sectionClass='section_hero'
			/>

			<Accordion
				contents={{
					colPos500: [
						{
							type: 'minimal',
							colPos: 500,
							content: {
								header: 'Accordion header 1',
								subheader: 'Accordion subheader 1',
								headerLink: '',
								date: '0',
								bodytext:
									'<p>Accordion text 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate</p>',
								gallery: [],
							},
						},
						{
							type: 'minimal',
							colPos: 500,
							content: {
								header: 'Accordion header 2',
								subheader: 'Accordion subheader 2',
								headerLink: '',
								date: '0',
								bodytext:
									'<p>Accordion text 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate</p>',
								gallery: [],
							},
						},
					],
				}}
				colPos='colPos500'
				sectionId='accordion'
				sectionClass='section_accordion'
			/>

			<CardV9
				contents={{
					colPos350: [
						{
							type: 'minimal',
							colPos: 350,
							content: {
								header: 'CardV9 header 1',
								subheader: 'CardV9 subheader 1',
								headerLink: '',
								date: '0',
								bodytext: '<p>CardV9 text 1 1Lorem ipsum dolor sit amet</p>',
								gallery: dummyImage,
							},
						},
						{
							type: 'minimal',
							colPos: 350,
							content: {
								header: 'CardV9 header 2',
								subheader: 'CardV9 subheader 2',
								headerLink: '',
								date: '0',
								bodytext:
									'<p>CardV9 text 2 Laboris nisi ut aliquip ex ea commodo consequat.</p>',
								gallery: dummyImage,
							},
						},
					],
				}}
				colPos='colPos350'
				sectionId='cardv9'
				sectionClass='section_cardv9'
				colWidth='col-12 col-6@md'
				moreButton='Mehr erfahren'
			/>

			<FeatureV2
				contents={{
					colPos150: [
						{
							type: 'minimal',
							colPos: 150,
							content: {
								header: 'FeatureV2 header',
								subheader: 'FeatureV2 subheader',
								headerLink: '',
								date: '0',
								bodytext: '<p>FeatureV2 text</p>',
								gallery: dummyImage,
							},
						},
					],
				}}
				colPos='colPos150'
				sectionId='featurev2'
				sectionClass='section_featurev2'
			/>

			<FeatureV11
				contents={{
					colPos250: [
						{
							type: 'minimal',
							colPos: 250,
							content: {
								header: 'FeatureV11 header',
								subheader: 'FeatureV11 subheader',
								headerLink: '',
								date: '0',
								bodytext: '<p>FeatureV11 text</p>',
								gallery: dummyImage,
							},
						},
					],
				}}
				colPos='colPos250'
				sectionId='featurev11'
				sectionClass='section_featurev11'
			/>

			<FeatureV11BottomCenter
				contents={{
					colPos400: [
						{
							type: 'minimal',
							colPos: 400,
							content: {
								header: 'FeatureV11BottomCenter header',
								subheader: 'FeatureV11BottomCenter subheader',
								headerLink: '',
								date: '0',
								bodytext: '<p>FeatureV11BottomCenter text</p>',
								gallery: dummyImage,
							},
						},
					],
				}}
				colPos='colPos400'
				sectionId='featurev11bottomcenter'
				sectionClass='section_featurev11bottomcenter'
				colWidth='col-12 col-6@md'
				moreButton='Mehr erfahren'
			/>

			<ContactV3
				contents={{
					colPos550: [
						{
							type: 'minimal',
							colPos: 550,
							content: {
								header: 'ContactV3 header',
								subheader: 'ContactV3 subheader',
								headerLink: '',
								date: '0',
								bodytext: '<p>ContactV3 text Lorem ipsum dolor sit amet</p>',
								gallery: [],
							},
						},
					],
				}}
				colPos='colPos550'
				sectionId='contactv3'
				sectionClass='section_contactv3'
				submitButton='Jetzt informieren'
				reactAppContactUrl={process.env.REACT_APP_API_CONTACT_URL}
				reactAppApiContactToken={process.env.REACT_APP_API_CONTACT_TOKEN}
			/>

			<FooterMain
				contents={{
					colPos600: [
						{
							type: 'minimal',
							colPos: 600,
							content: {
								header: 'FooterMain header',
								subheader: 'FooterMain subheader',
								headerLink: '',
								date: '0',
								bodytext: '<p>FooterMain text Lorem ipsum dolor sit amet</p>',
								gallery: [],
							},
						},
					],
				}}
				colPos='colPos600'
				sectionId='footermain'
				sectionClass='section_footermain'
				logo={Logo}
				link={Link}
			/>
		</>
	);
};

export default App;
