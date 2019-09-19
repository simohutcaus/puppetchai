const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const config = require('../lib/config');
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

describe('My first pupeteer test', () => {
  let browser
  let page

  before(async function () {
    browser = await puppeteer.launch({
      headless: config.isHeadless,
      slowMo: config.slowMo,
      devTools: config.isDevTools,
      timeout: config.timeout
    })
    page = await browser.newPage()
    await page.setDefaultTimeout(config.waitingTimeout)
    await page.setViewport({
      width: config.viewportWidth,
      height: config.viewportHeight
    })
  })

  after(async function() {
    await browser.close()
  })



  it('my first test step', async () => {
    
    await loadUrl(page, config.baseUrl)
    //await page.goto(config.baseUrl)
    //await page.waitForSelector('#nav-search')
    await shouldExist(page, '#nav-search')

    await waitForText(page, 'body', 'WRITE A POST')

    const url = await page.url()
    const title = await page.title()

    expect(url).to.contain("dev")
    expect(title).to.contains("Community")
  })

  it('browser reload', async () => {
    await page.reload()
    //await page.waitForSelector('#page-content')
    await shouldExist(page, '#page-content')

    const url = await page.url()
    const title = await page.title()

    
    expect(url).to.contain("dev")
    expect(title).to.contains("Community")
  })

  it('click method', async () => {
    await loadUrl(page, config.baseUrl)
    //await page.waitForSelector('#write-link')
    //await page.click('#write-link')
    await click(page, "#write-link")
    //await page.waitForSelector('.registration-rainbow')
    await shouldExist(page, '.registration-rainbow')

  })

  it('submit searchbox', async () => {

    await loadUrl(page, config.baseUrl)
    await type(page, generateEmail(), "#nav-search")
    await page.waitFor(3000)
    //await page.waitForSelector('#nav-search')
    //await page.type("#nav-search", "javascript")
    //await page.keyboard.press("Enter")
    await pressKey(page, 'Enter')
    //await page.waitForSelector('#articles-list')
    await shouldExist(page, '#articles-list')
  })

})