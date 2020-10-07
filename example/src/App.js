import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Logo from './Logo';

import { Accordion } from 'react-gmf-library';
import { Hero } from 'react-gmf-library';
import { Header } from 'react-gmf-library';
import { FooterMain } from 'react-gmf-library';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact={true} path='/' render={TestPage} />
			</Switch>
		</Router>
	);
};

const TestPage = () => {
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
						name: 'FeatureV2',
						href: '#featurev2',
					},
				]}
			/>

			<Hero
				contents={{
					colPos100: [
						{
							id: 111,
							pid: 36,
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
											'https://cms.gmf.design/fileadmin/_processed_/2/1/csm_test_1b3cf1f7c2.jpg',
										properties: {
											title: null,
											alternative: null,
											description: null,
											mimeType: 'image/jpeg',
											type: 'image',
											filename: 'csm_test_1b3cf1f7c2.jpg',
											originalUrl: 'fileadmin/redakteur/bilder/test.jpg',
											uidLocal: 8,
											fileReferenceUid: 101,
											size: '199 KB',
											link: null,
											autoplay: null,
											extension: 'jpg',
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
							id: 124,
							pid: 36,
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
							id: 124,
							pid: 36,
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

			<FooterMain
				contents={{
					colPos600: [
						{
							id: 124,
							pid: 36,
							type: 'minimal',
							colPos: 600,
							content: {
								header: 'Contact V3',
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
				sectionClass='section_footermain'
				logo={Logo}
				link={Link}
			/>
		</>
	);
};

export default App;
