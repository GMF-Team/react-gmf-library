import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Logo from './Logo';

import {
	Accordion,
	CardV9,
	ContactV3,
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
								header: 'Hero',
								subheader: '',
								headerLink: '',
								date: '0',
								bodytext: '<p>Text</p>',
								gallery: [
									{
										publicUrl:
											'https://cms.gmf.design/resize/image/fileadmin/_processed_/2/1/csm_test_1b3cf1f7c2.jpg',
										properties: {
											title: 'Titel',
											description: 'Description',
											originalUrl: 'fileadmin/redakteur/bilder/test.jpg',
										},
									},
								],
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
								header: 'Accordion 1',
								subheader: 'Accordion 1a',
								headerLink: '',
								date: '0',
								bodytext:
									'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate</p>',
								gallery: [],
							},
						},
						{
							type: 'minimal',
							colPos: 500,
							content: {
								header: 'Accordion 2',
								subheader: 'Accordion 2a',
								headerLink: '',
								date: '0',
								bodytext:
									'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate</p>',
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
								header: 'Card V9 1',
								subheader: '',
								headerLink: '',
								date: '0',
								bodytext: '<p>Lorem ipsum dolor sit amet</p>',
								gallery: [
									{
										publicUrl:
											'https://cms.gmf.design/resize/image/fileadmin/_processed_/2/1/csm_test_06a514d2a3.jpg',
										properties: {
											title: null,
											alternative: null,
											description: null,
										},
									},
								],
							},
						},
						{
							type: 'minimal',
							colPos: 350,
							content: {
								header: 'Card V9 2',
								subheader: '',
								headerLink: '',
								date: '0',
								bodytext:
									'<p>Laboris nisi ut aliquip ex ea commodo consequat.</p>',
								gallery: [
									{
										publicUrl:
											'https://cms.gmf.design/resize/image/fileadmin/_processed_/2/1/csm_test_06a514d2a3.jpg',
										properties: {
											title: null,
											alternative: null,
											description: null,
										},
									},
								],
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

			<ContactV3
				contents={{
					colPos550: [
						{
							type: 'minimal',
							colPos: 550,
							content: {
								header: 'ContactV3',
								subheader: '',
								headerLink: '',
								date: '0',
								bodytext:
									'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate</p>',
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
								header: 'FooterMain',
								subheader: '',
								headerLink: '',
								date: '0',
								bodytext:
									'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate</p>',
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
