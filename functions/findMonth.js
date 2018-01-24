const findMonth = (month) => {
	switch (month) {
		case 'Jan': return 01
		case 'Fev': return 02
		case 'Mar': return 03
		case 'Abr': return 04
		case 'Mai': return 05
		case 'Jun': return 06
		case 'Jul': return 07
		case 'Ago': return 08
		case 'Set': return 09
		case 'Out': return 10
		case 'Nov': return 11
		case 'Dez': return 12
	}
}

module.exports = findMonth