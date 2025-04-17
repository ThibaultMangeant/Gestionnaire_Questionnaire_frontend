import axios from 'axios';

const api = axios.create
(
	{
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		baseURL: 'http://localhost/api'
	}
);

export default api;