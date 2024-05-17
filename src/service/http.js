import axios from "axios";
const request = axios.create({
  timeout: 10000,
  baseURL:'http://150.158.31.201:4000',
  headers: {
		'Accept': '*/*',
		'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
	}
  
})
export default request