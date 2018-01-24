const sheetUpdater = (parameters) => {
	return new Promise( async (resolve, reject) => {
		try {
			// authenticate to get permission to edit spreadsheet
			const auth = require('./authenticate')
			const spreadsheet = await auth()
			// add a new row to spreadsheet
      spreadsheet.addRow(1, parameters, (error, rows) => {
        if(error)
          reject(error)
        resolve('SUCCESS')
      })
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = sheetUpdater