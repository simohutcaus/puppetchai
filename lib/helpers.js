module.exports = {
  click: async function(page, selector) {
    try {
      await page.waitForSelector(selector)
      await page.click(selector)
    } catch (error) {
      throw new Error(`Could not click on selector: ${selector}`)
    }
  },

  typeText: async function(page, text, selector) {
    try{
      await page.waitForSelector(selector)
      await page.type(selector, text)

    } catch (error) {
      throw new error(`Unable to type text into: ${selector}`)
    }
  },

  loadUrl: async function(page, url) {
    try {
      await page.goto(url, {waitUntil: "networkidle0"})
    } catch (error) {

    }
  },

  getText: async function(page, selector) {
    try {
      await page.waitForSelector(selector)
      return page.$eval(selector, e => e.innerHTML)
    } catch (error) {
      throw new Error(`cannot get text from selector ${selector}`)

    }
  },

  getCount: async function(page, selector) {
    try {
      await page.waitForSelector(selector)
      return page.$$eval(selector, items => items.length)
    } catch (error) {
      throw new Error(`cannot read number of selectors ${selector}`)
    }
  },

  waitForText: async function(page, selector, text) {

   try {
    await page.waitForSelector(selector)
    await page.waitForFunction((selector, text) => 
      document.querySelector(selector).innerHTML.includes(text),
      {},
      selector,
      text
    )

  } catch (error) {
    throw new Error(`Text: ${text} not found for selector ${selector}`)
  }
},

  pressKey: async function(page, key)  {
    try {
      await page.keyboard.press(key)
    } catch (error) {
      throw new Error(`Could not press key ${key}`)
    }
  },

  shouldExist: async function(page, selector) {

    try {
      await page.waitForSelector(selector, {visible: true})

    } catch (error) {
      throw new Error(`Selector: ${selector} not found`)
    }
  },

  shouldNotExist: async function(page, selector) {

    try {
      await page.waitForSelector(() => !document.querySelector(selector))
    } catch(error) {
      throw new Error(`Selector: ${selector} was found and should not be`)
    }
  }


}