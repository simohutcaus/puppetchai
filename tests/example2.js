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

//'PageUp': {'keyCode': 33, 'code': 'PageUp', 'key': 'PageUp'},
// page.keyboard.press('PageUp')
//await page.type('input[name=pickupAgingComment]', 'test comment', {delay: 20})


describe('Reckon One Payroll', () => {
	let browser
	let page

	before(async function() {
		browser = await puppeteer.launch({
			defaultViewport: null,
			headless: true,
			slowMo: config2.slowMo,
			devTools: config2.isDevTools,
			timeout: config2.timeout,
		})
		page = await browser.newPage()
		await page.setDefaultTimeout(config2.waitingTimeout)
		await page.setViewport({
			width: 1600,
			height: 1200,
		})
	})

	after(async function() {
		console.log('done')
	})


	function delay(time) {
		return new Promise(function(resolve) { 
				setTimeout(resolve, time)
		});
 }


	describe('Login Test', () => {
		it('should navigate to homepage', async () => {
			await loadUrl(page, config2.baseUrl)
			await shouldExist(page, '#username')
		})

		it('should login', async () => {
			await type(page, 'stp@mailinator.com', '#username')
			await type(page, 'password', '#password')
			await pressKey(page, 'Enter')
			await waitForText(page, 'body', 'Account')
			await shouldExist(page, '.panel-heading')
			const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
await page.click('#SubsTile');
newPage = await newPagePromise;
await newPage.waitForSelector('#mainContent');
await newPage.click('body > div.nav-left-wrapper > nav > ul > li:nth-child(3) > span > span.nav-label')
await newPage.click('body > div.nav-left-wrapper > nav > ul > li:nth-child(3) > ul > li:nth-child(2) > a')
await newPage.waitForSelector('.employee-index')	
await newPage.waitForSelector('#show-hide-grdContactActive')
await newPage.click('.button.-primary.-prominent')
await newPage.waitForSelector('#FirstName')
await type(newPage, `Simon ${Date.now()}`, '#FirstName')
await type(newPage, `test ${Date.now()}`, '#Surname')
await type(newPage, 'Line1', '#PostalAddress_Line1')
await type(newPage, 'Line2', '#PostalAddress_Line2')
await type(newPage, 'Sydney', '#PostalAddress_Suburb')
await type(newPage, '2060', '#PostalAddress_PostCode')
await type(newPage, 'test@test.com', '#EmailAddress')
await newPage.click('#btnSave')
await newPage.waitForSelector('#btnSaveClose')




// handle Page 2: you can access new page DOM through newPage object
			
		})

		it('It should navigate to personal tab of new employee', async () => {
			
			await newPage.waitForSelector('#mainContent')
			await delay(4000)
			await newPage.waitForSelector('#mainContent > div.row.js-nav-page > div > div > ul > li:nth-child(2) > a')
			await newPage.click('#mainContent > div.row.js-nav-page > div > div > ul > li:nth-child(2) > a')
			await newPage.waitForSelector('#DateOfBirth')
			await type(newPage, '1234', '#PdfPassword')
			await newPage.click('#mainContent > div.row.js-nav-page > div > div > ul > li:nth-child(3) > a')
			await delay(4000)
			await newPage.waitForSelector('button#btnRightkendoDialog.button.-primary.k-button')
			await newPage.click('button#btnLeftkendoDialog.button.-tertiary.k-button.cancel')	
		})

		it('It should fill out the employment tab', async () => {

			await newPage.waitForSelector('#EmployeeNumber')
			await type(newPage, '1234', '#EmployeeNumber')
			await delay(2000)
			await type(newPage, '40', '#WeeklyHours')
			await type(newPage, 'Product Manager', '#JobTitle')
			await delay(4000)
			await newPage.click('#mainContent > div > div > div > ul > li:nth-child(4) > a')
			await delay(4000)
			await newPage.waitForSelector('#btnRightkendoDialog.button.-primary.k-button')
			await newPage.click('button#btnRightkendoDialog.button.-primary.k-button')	
			await newPage.waitForSelector('#TaxFileNumber')
			await delay(2000)
			await newPage.waitForSelector('#EmployeeTax > section:nth-child(11) > ul > li:nth-child(2) > span.span-3.-last > span > span > input')
			await delay(2000)
			
			//await newPage.click('#grdLeaves > div.k-header.k-grid-toolbar.k-grid-top > a')
			//await delay(4000)

		})

		it('It should fill out the tax tab', async () => {
			await newPage.click('#IsHelp')
			await type(newPage, 'New South Wales', '#EmployeeTax > section:nth-child(11) > ul > li:nth-child(2) > span.span-3.-last > span > span > input')
			await type(newPage, '1111111111', '#TaxFileNumber')
			await type(newPage, 'Scale 2: Tax free threshold claimed', '#EmployeeTax > section:nth-child(11) > ul > li:nth-child(4) > span.span-4.-last > span.k-widget.k-combobox.k-header.js-mode-edit.span-3 > span > input')
			await newPage.keyboard.press('Tab')
			await delay(2000)
			await type(newPage, '1', '#TaxOffset')
			await newPage.click('#mainContent > div > div > div > ul > li:nth-child(5) > a')
			await delay(4000)
			await newPage.waitForSelector('#btnRightkendoDialog.button.-primary.k-button')
			await newPage.click('button#btnRightkendoDialog.button.-primary.k-button')
		})

		it('should fill out the leave tab', async () => {
			await newPage.waitForSelector('#grdLeaves > div > a')
			await newPage.click('#grdLeaves > div > a')
			await delay(4000)
			await newPage.type('input[name=PayItem_input', 'Annual leave', {delay: 20})
			await delay(2000)
			await newPage.keyboard.press('Tab')
			await type(newPage, '152', '#AnnualEntitlement')
			await delay(2000)
			await newPage.keyboard.press('Tab')
			await delay(2000)
			await newPage.keyboard.press('Tab')
			await newPage.click('#mainContent > div > div > div > ul > li:nth-child(6) > a')
			await delay(4000)
			await newPage.waitForSelector('#btnRightkendoDialog.button.-primary.k-button')
			await newPage.click('button#btnRightkendoDialog.button.-primary.k-button')


		})

		it('should fill out the pay setup tab', async () => {
			await newPage.waitForSelector('#IsSsReduceEmployerSuperContribution')
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
