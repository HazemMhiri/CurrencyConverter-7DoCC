import {
	renderCurrenciesList,
	convertCurrencies
} from "./components/currencies";

const _registerServiceWorker = () => {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register("/js/sw.js").then(reg => {
			if (!navigator.serviceWorker.controller) {
				return;
			}

			if (reg.waiting) {
				indexController._updateReady(reg.waiting);
				return;
			}

			if (reg.installing) {
				indexController._trackInstalling(reg.installing);
				return;
			}

			reg.addEventListener("updatefound", () => {
				indexController._trackInstalling(reg.installing);
			});

			let refreshing = false;
			navigator.serviceWorker.addEventListener("controllerchange", () => {
				if (refreshing) return;
				window.location.reload();
				refreshing = true;
			});
		});
	}

	return;
};

const main = () => {
	_registerServiceWorker();

	renderCurrenciesList();

	document
		.querySelector(".js-convert")
		.addEventListener("click", () => convertCurrencies("desc"));
};

main();
