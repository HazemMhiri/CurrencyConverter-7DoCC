const api_endpoint = "https://free.currencyconverterapi.com/api/v5";

export const getAllCurrencies = () => {
	return fetch(`${api_endpoint}/currencies`).then(response => {
		return response.json();
	});
};

export const getCurrenciesConvertion = queries => {
	let url = `${api_endpoint}/convert?q=${queries.join()}`;

	return fetch(url).then(response => {
		return response.json();
	});
};
