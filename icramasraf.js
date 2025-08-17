const icraDegeri = document.querySelector(".icraDeger");
const icraMasraf = document.querySelector("#icraMasrafToplam");
const icraPesin = document.querySelector("#icraPesinSonuc");
const icraBasvurma = document.querySelector("#icraBasvurmaSonuc");
const icraHesaplaButton = document.querySelector("#icraMasrafHesapla");
const icraIlamliCheck = document.querySelector("#icraIlamlıCheckBox");

function runEvents() {
  icraHesaplaButton.addEventListener("click", function (e) {
    e.preventDefault();
    icraMasrafHesaplama();
  });
}

function icraMasrafHesaplama() {
  const basvurmaHarci = 615.4;

  // İlamlı icra seçiliyse sadece maktu harç alınır
  if (icraIlamliCheck.checked) {
    icraBasvurma.value = basvurmaHarci.toFixed(2);
    icraPesin.value = "0.00";
    icraMasraf.value = basvurmaHarci.toFixed(2);
    return;
  }

  // İlamlı değilse normal hesaplama
  const temizDeger = icraDegeri.value.replace(",", ".").replace(/[^\d.]/g, "");
  const deger = parseFloat(temizDeger);

  if (isNaN(deger)) {
    icraMasraf.value = "Geçersiz";
    return;
  }

  let pesinHarci = deger / 50;
  if (pesinHarci < 615.4) pesinHarci = 615.4;

  const toplam = basvurmaHarci + pesinHarci;

  icraBasvurma.value = basvurmaHarci.toFixed(2);
  icraPesin.value = pesinHarci.toFixed(2);
  icraMasraf.value = toplam.toFixed(2);
}

document.addEventListener("DOMContentLoaded", runEvents);