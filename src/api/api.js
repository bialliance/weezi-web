import axios from 'axios'

class Api {
	getDaoInfo() {
		return new Promise((resolve, reject) => {
			axios.get('https://webapi.weezi.io/dao-info').then(({ data }) => resolve(data)).catch((e) => reject(e))
		})
	}
}

export default new Api()