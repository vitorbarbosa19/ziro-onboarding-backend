const sefaz = async (cnpj) => {
	try {
		const puppeteer = require('puppeteer')
		// add args when deploying to heroku
		const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
		const page = await browser.newPage()
		await page.goto(`https://www.sefaz.rs.gov.br/NFE/NFE-CCC.aspx`)
		await page.type(`#ContornoCnpj > input`, `${cnpj}`, { delay: 200 })
		await page.click(`input[value="Pesquisar por CNPJ"]`)
		await page.waitFor(3000)
		const inscricaoEstadual = await page.$$eval(`.tabelaResultado > tbody > tr:nth-child(2) > td:nth-child(3) > a`, (aTags) => {
			return Array.prototype.map.call(aTags, (aTag) => aTag.innerHTML)
		})
		if (inscricaoEstadual.length > 0) {
			await browser.close()
			return inscricaoEstadual.pop().trim()
		}
		const inscricaoNotFound = await page.$$eval(`.tabelaResultado > tbody > tr:nth-child(2) > td`, (messages) => {
			return Array.prototype.map.call(messages, (message) => message.innerHTML)
		})
		if (inscricaoNotFound.length > 0) {
			await browser.close()
			return inscricaoNotFound.pop().trim()
		}
		await browser.close()
		return 'error'
	} catch (error) {
		console.log(error)
		return 'error'
	}
}

module.exports = sefaz
