document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("#caForm2");
  const netUcretInput = form.querySelector("input[name='number2']");
  const izinGunInput = form.querySelector("input[name='ca']");
  const sonucInput = form.querySelector("input[readonly]");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const netUcret = parseFloat(netUcretInput.value.replace(",", "."));
    const izinGun = parseFloat(izinGunInput.value);

    if (isNaN(netUcret) || isNaN(izinGun) || netUcret <= 0 || izinGun <= 0) {
      alert("Lütfen geçerli bir ücret ve izin günü sayısı giriniz.");
      return;
    }

   
  });
});