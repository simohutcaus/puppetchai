const puppeteer = require('puppeteer')
const expect = require('chai').expect
const config2 = require('../lib/config2')
const click = require('../lib/helpers').click
const type = require('../lib/helpers').typeText
const loadUrl = require('../lib/helpers').loadUrl
const getText = require('../lib/helpers').getText
const waitForText = require('../lib/helpers').waitForText
const pressKey = require('../lib/helpers').pressKey
const shouldExist = require('../lib/helpers').shouldExist
const shouldNotExist = require('../lib/helpers').shouldNotExist
const generateID = require('../lib/utils').generateID
const generateEmail = require('../lib/utils').generateEmail
const generateNumbers = require('../lib/utils').generateNumbers
const getCount = require('../lib/helpers').getCount

describe('Portal', () => {
	let browser
	let page

	before(async function() {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: config2.slowMo,
			devTools: config2.isDevTools,
			timeout: config2.timeout,
		})
		page = await browser.newPage()
		await page.setDefaultTimeout(config2.waitingTimeout)
		await page.setViewport({
			width: config2.viewportWidth,
			height: config2.viewportHeight,
		})
	})

	after(async function() {
		console.log('done')
	})


	describe('Login Test', () => {
		it('should navigate to homepage', async () => {
			await loadUrl(page, config2.baseUrl)
			await shouldExist(page, '#username')
		})

		it('should login', async () => {
			await loadUrl(page, config2.baseUrl)
			await type(page, 'USERNAME', '#username')
			await type(page, 'password', '#password')
			await pressKey(page, 'Enter')
			await waitForText(page, 'body', 'Account')
			await shouldExist(page, '.panel-heading')
			const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
await page.click('#SubsTile');
const newPage = await newPagePromise;
await newPage.waitForSelector('#mainContent');
await newPage.click('body > div.nav-left-wrapper > nav > ul > li:nth-child(3) > span > span.nav-label')
await newPage.click('body > div.nav-left-wrapper > nav > ul > li:nth-child(3) > ul > li:nth-child(2) > a')
await newPage.waitForSelector('#k-tabstrip-wrapper')

// handle Page 2: you can access new page DOM through newPage object
			
		})

		

		// it('should click on signin button', async () => {
		// 	await click(page, '#signin_button')
		// 	await shouldExist(page, LOGIN_FORM)
		// })

		// it('should submit login form', async () => {
		// 	await type(page, generateID(), '#user_login')
		// 	await type(page, generateID(), '#user_password')
		// 	await click(page, '.btn-primary')
		// })
		// it('should get error message', async () => {
		// 	await waitForText(page, 'body', 'Login and/or password are wrong')
		// 	await shouldExist(page, LOGIN_FORM)
		// })
	})

// 	describe('Search Test', () => {
// 		it('should navigate to home page', async () => {
// 			await loadUrl(page, config2.baseUrl)
// 			await shouldExist(page, '#online_banking_features')
// 		})

// 		it('should submit search phrase', async () => {
// 			await type(page, 'hello world', '#searchTerm')
// 			await pressKey(page, 'Enter')
// 		})

// 		it('should display search results', async () => {
// 			await waitForText(page, 'h2', 'Search Results')
// 			await waitForText(page, 'body', 'No results were found for the query')
// 		})
// 	})

// 	describe('Navbar Links Test', () => {
// 		it('should navigate to homepage', async () => {
// 			await loadUrl(page, config2.baseUrl)
// 			await shouldExist(page, '#online_banking_features')
// 		})

// 		it('should have correct number of links', async () => {
// 			// get count of links
// 			const numberOfLinks = await getCount(page, '#pages-nav > li')
// 			//assert the count
// 			expect(numberOfLinks).to.equal(3)
// 		})
//   })
  
//   describe('Feedback Test', () => {
//     it('should navigate to homepage', async () => {
// 			await loadUrl(page, config2.baseUrl)
// 			await shouldExist(page, '#online_banking_features')
//     })
//     it('should on click Feedback link', async () => {
//       await click(page, "#feedback")
//       await shouldExist(page, 'form')

//     })

//     it('should submit feedback form', async () => {
//       await type(page, 'Kaniel', '#name')
//       await type(page, 'test@test.com', '#email')
//       await type(page, 'Just subject', '#subject')
//       await type(page, 'comments', '#comment')
//       await click(page, 'input[type="submit"]')
//     })
//     it('should display success message', async () => {
//       await shouldExist(page, '#feedback-title')
//       await waitForText(page, 'body', 'Thank you for your comments')
// 		})
		

// 	})
	
// 	describe('Forgot password', () => {
// 		it('should navigate to homepage', async () => {
// 			await loadUrl(page, config2.baseUrl)
// 			await shouldExist(page, '#online_banking_features')
// 		})
		
// 		it('should load forgotten password form', async () => {
// 			await loadUrl(page, "http://zero.webappsecurity.com/forgot-password.html")
// 			await waitForText(page, 'h3', 'Forgotten Password')

// 		})
// 		it('should submit email', async () => {
// 			await type(page, 'test@test.com', '#user_email')
// 			await click(page, '.btn-primary')
// 			await waitForText(page, 'body', 'Your password will be sent')
// 		})
// 	})
})
