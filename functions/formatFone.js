const formatFone = (fone) => {
	if (fone) {
		if (fone.length > 2 && fone.length < 10)
			return `(${fone.substr(0, 2)})${fone.substr(2, fone.length)}`
		if (fone.length === 10)
			return `(${fone.substr(0, 2)})${fone.substr(2, 4)}-${fone.substr(6, fone.length)}`
		if (fone.length === 11)
			return `(${fone.substr(0, 2)})${fone.substr(2, 5)}-${fone.substr(7, fone.length)}`
		return fone
	} else return fone
}

module.exports = formatFone