const url = require('url')
const express = require('express')
const app = express()

app.get('/business-info', async (req, res) => {
	try {
		const requestPromise = require('request-promise-native')
		const cnpjToSearch = url.parse(req.url, true).query.cnpj
		const result = await requestPromise(`https://zirocnpj.now.sh?cnpj=${cnpjToSearch}`)
		res.end(result)
	} catch (error) {
		console.log(error)
		res.end(error)
	}
})

app.get('/inscricao-estadual', async (req, res) => {
	try {
		const sefaz = require('./functions/sefaz')
		const cnpjToSearch = url.parse(req.url, true).query.cnpj
		const result = await sefaz(cnpjToSearch)
		if (result === 'error')
			res.end('Error executing scraper')
		res.end(result)
	} catch (error) {
		console.log(error)
		res.end(error)
	}
})

app.listen(process.env.PORT || 3000, () => console.log(`Listening on ${process.env.PORT || 3000}`))