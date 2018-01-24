const express = require('express')
const app = express()

app.get('/', async (req, res) => {
	try {
		const url = require('url')
		const sefaz = require('./functions/sefaz')
		const cnpjToSearch = url.parse(req.url, true).query.cnpj
		const result = await sefaz(cnpjToSearch)
		if (result === 'error')
			res.end('Error executing scraper')
		console.log(result)
		res.end(result)
	} catch (error) {
		console.log(error)
		res.end(error)
	}
})

app.listen(process.env.PORT || 3000, () => console.log(`Listening on ${process.env.PORT || 3000}`))