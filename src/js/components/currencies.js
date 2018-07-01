import { getAllCurrencies, getCurrenciesConvertion } from "../api";

const _currenciesMarkup = () => {
	return getAllCurrencies().then(data => {
		const results = data.results;
		const currenciesHTML = [];

		for (const key in results) {
			currenciesHTML.push(`<option value="${key}">${key}</option>`);
		}
		return currenciesHTML;
	});
};

export const convertCurrencies = () => {
	const selectedCurrencies = Array.from(
		document.querySelectorAll(".js-currency-select")
	);

	const firstCurrency = selectedCurrencies[0].value;
	const secondCurrency = selectedCurrencies[1].value;
	const query = `${firstCurrency}_${secondCurrency}`;

	return getCurrenciesConvertion([query]).then(data => {
		const results = data.results;

		const insertedValuesElements = Array.from(
			document.querySelectorAll(".js-value")
		);
		insertedValuesElements[1].value =
			results[query].val * insertedValuesElements[0].value;
	});
};

export const renderCurrenciesList = () => {
	const currenciesListElements = Array.from(
		document.querySelectorAll(".js-currencies")
	);
	_currenciesMarkup().then(markup => {
		currenciesListElements.forEach(currencyEl => {
			currencyEl.innerHTML = `<select class="js-currency-select">${
				markup
			}</select>`;
		});
	});
};
