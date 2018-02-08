const formatCep = (cep) => {
	if (cep) {
		return cep.split('').map( (digit, index) => {
			if (index === 2)
				return `.${digit}`
			if (index === 5)
				return `-${digit}`
			return digit
		}).join('')
	} else return cep
}

export default formatCep
