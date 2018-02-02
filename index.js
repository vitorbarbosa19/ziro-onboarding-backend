const url = require('url')
const express = require('express')
const app = express()

app.get('/submit', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	try {
		const query = url.parse(req.url, true).query
		const { lojista, rg, cpf, cnpj, ie, razaoSocial, nomeFantasia, endereco, bairro,
			cep, cidade, estado, fone, email, referencia } = query
		if (lojista && rg && cpf && ie && razaoSocial && nomeFantasia && endereco && bairro
			&& cep && cidade && estado && fone && email && referencia) {
			const now = new Date().toString()
			const findMonth = require('./functions/findMonth')
			const dataCadastro = `${now.substr(8,2)}/${now.substr(4,3)}/${now.substr(11,4)} ${now.substr(16,8)}`
			const mes = findMonth(now.substr(4,3))
			const sheetUpdater = require('./functions/sheetUpdater')
			res.end( await sheetUpdater({ lojista, rg, cpf, cnpj, ie, razaoSocial, nomeFantasia, endereco, bairro,
			cep, cidade, estado, fone, email, referencia, dataCadastro, mes }))
		}
	} catch (error) {
		console.log(error)
		res.end(error)
	}
})

app.get('/business-info', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	try {
		const requestPromise = require('request-promise-native')
		const cnpjToSearch = url.parse(req.url, true).query.cnpj
		const result = await requestPromise(`https://zirocnpj.now.sh?cnpj=${cnpjToSearch}`)
		res.end(JSON.stringify({ error: '', values: result }))
	} catch (error) {
		console.log(error)
		res.end(JSON.stringify({ error: 'There was an error', values: error }))
	}
})

app.get('/inscricao-estadual', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	try {
		const sefaz = require('./functions/sefaz')
		const cnpjToSearch = url.parse(req.url, true).query.cnpj
		const result = await sefaz(cnpjToSearch)
		if (result === 'error')
			res.end(JSON.stringify({ error: 'Error executing scraper', values: '' }))
		res.end(JSON.stringify({ error: '', values: result }))
	} catch (error) {
		console.log(error)
		res.end(JSON.stringify({ error: 'There was an error', values: error }))
	}
})

app.use( (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.status(404).send('Rota inválida. Use as rotas: /submit /business-info /inscricao-estadual')
})

app.listen(process.env.PORT || 3000, () => console.log(`Listening on ${process.env.PORT || 3000}`))
