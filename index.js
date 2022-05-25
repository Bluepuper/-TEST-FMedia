import puppeteer from 'puppeteer'
import fs from 'fs/promises'

let scrape = async (url) => {

	// const cookiesString = await fs.readFile('./cookies.json')
	// const cookies = JSON.parse(cookiesString)
	
	const browser = await puppeteer.launch({headless: false})
	const page = await browser.newPage()

	// await page.setCookie(...cookies)
	await page.setDefaultNavigationTimeout(0)


	await page.goto(url)

	await page.waitForTimeout(2000)

	await page.evaluate( async () => {
		Array.from(document.querySelectorAll("button")).forEach(e => {
		const text = e.textContent.toLowerCase().replace(/\s/g, '')
		if (
			text.includes("войти") ||
			text.includes("login")
		) {
			e.click()
		}
		})
	})

	await page.waitForTimeout(2000)

	await page.evaluate( async () => {
		Array.from(document.querySelectorAll("button")).forEach(e => {
		const text = e.textContent.toLowerCase().replace(/\s/g, '')
		if (
			text.includes("cookie")
		) {
			e.click()
		}
		})
	})

	await page.waitForTimeout(2000)

	await page.evaluate( async () => {
		Array.from(document.querySelectorAll("button")).forEach(e => {
		const text = e.textContent.toLowerCase().replace(/\s/g, '')
		if (text.includes("facebook")) {
			e.click()
		}
		})
	})

	await page.waitForTimeout(2000)
	await page.waitForNavigation()
	await page.waitForTimeout(2000)


	browser.close()

	console.log("SCRIPT ENDED")
}

await scrape("https://www.canva.com/ru_ru/")
await scrape("https://www.pinterest.ru/")