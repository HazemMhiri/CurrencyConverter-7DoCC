import {
	renderCurrenciesList,
	convertCurrencies
} from "./components/currencies";

const main = () => {
	renderCurrenciesList();

	document
		.querySelector(".js-convert")
		.addEventListener("click", () => convertCurrencies("desc"));
};

main();
