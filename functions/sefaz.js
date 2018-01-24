const sefaz = async () => {
	try {
		const puppeteer = require('puppeteer')
		const browser = await puppeteer.launch()
		const page = await browser.newPage()
		await page.goto(`https://www.sefaz.rs.gov.br/NFE/NFE-CCC.aspx`)
		await page.type(`#ContornoCnpj > input`, `27.098.019/0001-79`, { delay: 200 })
		await page.click(`input[value="Pesquisar por CNPJ"]`)
		await page.waitFor(3000)
		const inscricaoEstadual = await page.$$eval(`.tabelaResultado > tbody > tr:nth-child(2) > td:nth-child(3) > a`, (aTags) => {
			return Array.prototype.map.call(aTags, (aTag) => aTag.innerHTML)
		})
		await browser.close()
		return inscricaoEstadual.pop().trim()
	} catch (error) {
		console.log(error)
		return 'error'
	}
}

module.exports = sefaz
