document.addEventListener("DOMContentLoaded", () => {
    const hesapGiris = document.querySelector("#hesapGiris");
    const resultInput = document.querySelector("#result");
    const currencyForm = document.querySelector("#caForm2");
    const usdToTlRadio = document.querySelector("#usdToTl");
    const tlToUsdRadio = document.querySelector("#tlToUsd");

    const currency = new Currency();

    currencyForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const amount = parseFloat(hesapGiris.value.trim().replace(",", "."));
        if (isNaN(amount)) {
            resultInput.value = "Geçersiz sayı!";
            return;
        }

        let fromCurrency, toCurrency;

        if (usdToTlRadio.checked) {
            fromCurrency = "USD";
            toCurrency = "TRY";
        } else if (tlToUsdRadio.checked) {
            fromCurrency = "TRY";
            toCurrency = "USD";
        }

        const result = await currency.exchange(amount, fromCurrency, toCurrency);

        if (result !== null) {
            resultInput.value = result.toFixed(2);
        } else {
            resultInput.value = "Hata oluştu";
        }
    });
});