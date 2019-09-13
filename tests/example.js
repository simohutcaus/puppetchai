const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('My first pupeteer test', () => {
  let browser
  let page

  before(async function () {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 0,
      devTools: false,
      timeout: 10000
    })
    page = await browser.newPage()
    await page.setViewport({
      width: 800,
      height: 600
    })
  })

  after(async function() {
    await browser.close()
  })



  it('my first test step', async () => {
    await page.goto("https://dev.to")
    await page.waitForSelector('#nav-search')

    const url = await page.url()
    const title = await page.title()

    expect(url).to.contain("dev")
    expect(title).to.contains("Community")
  })

  it('browser reload', async () => {
    await page.reload()
    await page.waitForSelector('#page-content')
    const url = await page.url()
    const title = await page.title()

    
    expect(url).to.contain("dev")
    expect(title).to.contains("Community")
  })

  it('click method', async () => {
    await page.goto('https://dev.to')
    await page.waitForSelector('#write-link')
    await page.click('#write-link')
    await page.waitForSelector('.registration-rainbow')
  })
})