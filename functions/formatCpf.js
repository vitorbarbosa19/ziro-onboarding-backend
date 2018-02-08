const formatCpf = (cpf) => {
	return cpf.split('').map( (digit, index) => {
		if (index === 3 || index === 6)
			return `.${digit}`
		if (index === 9)
			return `-${digit}`
		return digit
	}).join('')
}

export default formatCpf
