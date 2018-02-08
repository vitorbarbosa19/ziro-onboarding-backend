const formatCnpj = (cnpj) => {
	if (cnpj) {
		return cnpj.split('').map( (digit, index) => {
			if (index === 2 || index === 5)
				return `.${digit}`
			if (index === 8)
				return `/${digit}`
			if (index === 12)
				return `-${digit}`
			return digit
		}).join('')
	} else return cnpj
}

module.exports = formatCnpj
