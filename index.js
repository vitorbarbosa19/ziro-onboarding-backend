const url = require('url')
const express = require('express')
const app = express()

app.get('/submit', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	try {
		const query = url.parse(req.url, true).query
		let { lojista, rg, cpf, cnpj, ie, razaoSocial, nomeFantasia, endereco, bairro,
			cep, cidade, estado, fone, email, assessor } = query
		const now = new Date().toString()
		const findMonth = require('./functions/findMonth')
		const dataCadastro = `${now.substr(8,2)}/${now.substr(4,3)}/${now.substr(11,4)} ${now.substr(16,8)}`
		const mes = findMonth(dataCadastro.substr(3,3))
		const ano = dataCadastro.substring(7,11)
		const sheetUpdater = require('./functions/sheetUpdater')
		const formatCpf = require('./functions/formatCpf')
		cpf = formatCpf(cpf)
		const formatCnpj = require('./functions/formatCnpj')
		cnpj = formatCnpj(cnpj)
		const formatCep = require('./functions/formatCep')
		cep = formatCep(cep)
		const formatFone = require('./functions/formatFone')
		fone = formatFone(fone)
		const status = 'ativo'
		res.end( await sheetUpdater({
			lojista, rg, cpf, cnpj, ie, razaoSocial, nomeFantasia, endereco, bairro,
			cep, cidade, estado, fone, email, assessor, dataCadastro, mes, ano, status
		}))
	} catch (error) {
		console.log(error)
		res.end(JSON.stringify({ error: 'There was an error', values: error }))
	}
})

app.get('/business-info', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	try {
		const requestPromise = require('request-promise-native')
		const cnpjToSearch = url.parse(req.url, true).query.cnpj
		if (cnpjToSearch) {
			const result = JSON.parse(await requestPromise(`https://zirocnpj.now.sh?cnpj=${cnpjToSearch}`))
			if (result.status === "ERROR")
				res.end(JSON.stringify({ error: 'There was an error', values: result.message }))
			res.end(JSON.stringify({ error: '', values: result }))
		}
		res.end(JSON.stringify({ error: 'Invalid parameter: cnpj', values: '' }))
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
		if (cnpjToSearch.length === 14) {
			const result = await sefaz(cnpjToSearch)
			if (result === 'error')
				res.end(JSON.stringify({ error: 'Error during scrape execution', values: '' }))
			res.end(JSON.stringify({ error: '', values: result }))
		}
		res.end(JSON.stringify({ error: 'Invalid parameter: cnpj', values: '' }))
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
