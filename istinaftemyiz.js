const basvuruDeger = document.querySelector(".basvuruDegeri");
const kanunYoluHesaplaBtn = document.querySelector("#kanunYoluHesapla");
const kanunYolunaBasvurmaHarc = document.querySelector("#kanunYolunaBasvurmaHarc");
const kararHarc = document.querySelector("#kararHarc");
const toplamHarc = document.querySelector(".toplamHarc");
const davaciCheckbox = document.querySelector("#davaciCheckBox");

// Olayları Başlat
document.addEventListener("DOMContentLoaded", function () {
  kanunYoluHesaplaBtn.addEventListener("click", function () {
    const secilenYol = document.querySelector('input[name="kanunYolu"]:checked')?.value;
    if (!secilenYol) {
      alert("Lütfen bir kanun yolu seçin.");
      return;
    }

    const deger = parseFloat(basvuruDeger.value.replace(",", "."));
    if (isNaN(deger) || deger <= 0) {
      alert("Lütfen geçerli bir kaybedilen tutar girin.");
      return;
    }

    let basvurmaHarc = 0;
    let kararHarci = 1013.90;

    if (secilenYol === "istinaf") {
      basvurmaHarc = deger * 0.0015;
      if (basvurmaHarc < 2279.30 || davaciCheckbox.checked) {
        basvurmaHarc = 2279.30;
      }
    } else if (secilenYol === "temyiz") {
      basvurmaHarc = deger * 0.0017;
      if (basvurmaHarc < 3033.70 || davaciCheckbox.checked) {
        basvurmaHarc = 3033.70;
      }
    }

    const toplam = basvurmaHarc + kararHarci;

    kanunYolunaBasvurmaHarc.value = basvurmaHarc.toFixed(2);
    kararHarc.value = kararHarci.toFixed(2);
    toplamHarc.value = toplam.toFixed(2);
  });
});