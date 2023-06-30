import { makeLogger } from '../../utils/log';

const log = makeLogger('kbin-import');

// import the puppeteer package

import puppeteer from 'puppeteer';

const main = async () => {
	log('start');

	// open https://kbin.social/magazines in puppeteer
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://kbin.social/magazines/hot');

	// find all tr elements on the page and return their first td element's text

	const communities = await page.$$eval('.magazines tbody tr', (trs) => {
		const getInt = (selector: string, parentEl: Element): number => {
			const element = parentEl.querySelector(selector);
			return element ? parseInt(element.textContent || '0') : 0;
		};
		return trs.map((row) => {
			return {
				title: row.querySelector('a')?.innerText.trim(),
				name: row.querySelector('a')?.href.split('/').at(-1),
				fullURL: row.querySelector('a')?.href,
				icon: row.querySelector('a img')?.getAttribute('src'),
				//     countSubscribers: number
				countPosts: getInt('td:nth-of-type(2)', row),
				countComments: getInt('td:nth-of-type(3)', row),
				instanceId: 'kbin.social',
				countUsersActiveDay: 1,
				countUsersActiveMonth: 1
			};
		});
	});

	log(communities);

	await browser.close();

	log('done');
};

main();
