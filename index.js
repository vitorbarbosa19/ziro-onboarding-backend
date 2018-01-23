const express = require('express')
const app = express()

app.get('/', (req, res) => {
	res.end('App')
})

app.listen(process.env.PORT || 3000, () => console.log(`Listening on ${process.env.PORT || 3000}`))