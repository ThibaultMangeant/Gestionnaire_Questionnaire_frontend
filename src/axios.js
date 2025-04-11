import axios from 'axios';

const api = axios.create
(
	{
		headers: {    'Accept': 'application/json',    'Content-Type': 'application/json'  },
		baseURL: 'http://127.0.0.1:80'
	}
);

export default api;