document.addEventListener("DOMContentLoaded", () => {
    const hesapGiris = document.querySelector("#hesapGiris");
    const resultInput = document.querySelector("#result");
    const currencyForm = document.querySelector("#caForm2");
    const euroToTlRadio = document.querySelector("#euroToTl");
    const tlToEuroRadio = document.querySelector("#tlToEuro");

    const currency = new Currency();

    currencyForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const amount = parseFloat(hesapGiris.value.trim().replace(",", "."));
        if (isNaN(amount)) {
            resultInput.value = "Geçersiz sayı!";
            return;
        }

        let fromCurrency = "EUR", toCurrency = "TRY";

        if (tlToEuroRadio.checked) {
            fromCurrency = "TRY";
            toCurrency = "EUR";
        }

        const result = await currency.exchange(amount, fromCurrency, toCurrency);

        if (result !== null) {
            resultInput.value = result.toFixed(2);
        } else {
            resultInput.value = "Hata oluştu";
        }
    });
});