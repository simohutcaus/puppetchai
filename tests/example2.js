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
			executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe ',
			headless: false,
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


	describe('Add Employee Test', () => {
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
const payrollSideLink = await newPage.$x("//span[text()='Payroll']")
			await payrollSideLink[0].click()
//const payrollSideBar = await newPage.$x("//span[text()='Payroll']");
//console.log('tested ' + payrollTest[0]);
//await payrollSideBar[0].click()
//await newPage.click('body > div.nav-left-wrapper > nav > ul > li:nth-child(3) > ul > li:nth-child(2) > a')
const employeeSideLink = await newPage.$x("//a[text()='Employees']")
await employeeSideLink[0].click()
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
			const personalLink = await newPage.$x("//a[text()='Personal']")
			await personalLink[0].click()
			await newPage.waitForSelector('#DateOfBirth')
			await type(newPage, '1234', '#PdfPassword')
			const employmentLink = await newPage.$x("//a[text()='Employment']")
			await employmentLink[0].click()
			await delay(4000)
			await newPage.waitForSelector('button#btnRightkendoDialog.button.-primary.k-button')
			await newPage.click('button#btnLeftkendoDialog.button.-tertiary.k-button.cancel')	
		})

		it('It should fill out the employment tab', async () => {

			await newPage.waitForSelector('#EmployeeNumber')
			await type(newPage, 'Product Manager', '#JobTitle')
			//await type('input[name=WeeklyHours]', '40', {delay: 20})
			await type(newPage, '1234', '#EmployeeNumber')
			await delay(2000)
			//await type(newPage, '40', '#WeeklyHours')
			await newPage.keyboard.press('Tab')
			await newPage.keyboard.press('Tab')
			await newPage.keyboard.press('Tab')
			await newPage.keyboard.press('Tab')
			await newPage.keyboard.press('Tab')
			await delay(2000)
			await newPage.keyboard.press('4')
			await newPage.keyboard.press('0')
			const taxLink = await newPage.$x("//a[text()='Tax']")
			await taxLink[0].click()
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
			await type(newPage, '11111111111', '#TaxFileNumber')
			await type(newPage, 'Scale 2: Tax free threshold claimed', '#EmployeeTax > section:nth-child(11) > ul > li:nth-child(4) > span.span-4.-last > span.k-widget.k-combobox.k-header.js-mode-edit.span-3 > span > input')
			await newPage.keyboard.press('Tab')
			await delay(2000)
			await type(newPage, '1', '#TaxOffset')
			const leaveLink = await newPage.$x("//a[text()='Leave']")
			await leaveLink[0].click()
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
			const paysetupLink = await newPage.$x("//a[text()='Pay set up']")
			await paysetupLink[0].click()
			await delay(4000)
			await newPage.waitForSelector('#btnRightkendoDialog.button.-primary.k-button')
			await newPage.click('button#btnRightkendoDialog.button.-primary.k-button')
			


		})

		it('should fill out the pay setup tab', async () => {
			await newPage.waitForSelector('#IsSsReduceEmployerSuperContribution')
			await newPage.click('#grdEarnings > div > a')
			await delay(1000)
			await newPage.type('input[name=PayItem_input', 'Ordinary', {delay: 20})
			await delay(4000)
			await newPage.waitForSelector('#Quantity')
			await newPage.waitForSelector('#Rate')
			await newPage.keyboard.press('Tab')
			await type(newPage, '40', '#Rate' )
			await newPage.keyboard.press('Enter')
			
			
			//await newPage.type(newPage, '40', '#Quantity')
			//await newPage.keyboard.press('Tab')



		})

		it('should save and close the profile, saving the employee', async () => {
			await newPage.click('#btnSaveClose')
		})



		


})
})
