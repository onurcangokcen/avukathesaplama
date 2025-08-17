const brutUcret = document.querySelector(".BrutUcret");
const kidemTazminat = document.querySelector("#KidemTazminatSonuc");
const kidemHesaplaButon = document.querySelector(".kidemTazminatHesapla");

const tavan = 53919.68;


function runEvents() {
  kidemHesaplaButon.addEventListener("click", function (e) {
    e.preventDefault();
    kidemHesapla()
  })}


function kidemHesapla() {
  const ucret = parseFloat(brutUcret.value.replace(",", "."));
  const girisGun = parseInt(document.getElementById("gunSelect").value);
  const girisAy = parseInt(document.getElementById("girisAy").value) - 1;
  const girisYil = parseInt(document.getElementById("girisYil").value);
  const cikisGun = parseInt(document.getElementById("cikisGun").value);
  const cikisAy = parseInt(document.getElementById("cikisAy").value) - 1;
  const cikisYil = parseInt(document.getElementById("cikisYil").value);

  if (isNaN(ucret) || isNaN(girisGun) || isNaN(girisAy) || isNaN(girisYil) || isNaN(cikisGun) || isNaN(cikisAy) || isNaN(cikisYil)) {
    alert("Lütfen tüm alanları doğru şekilde doldurun.");
    return;
  }

  const girisTarih = new Date(girisYil, girisAy, girisGun);
  const cikisTarih = new Date(cikisYil, cikisAy, cikisGun);

  if (cikisTarih < girisTarih) {
    gosterBootstrapAlert("Çıkış tarihi, giriş tarihinden önce olamaz.", "warning");
    return;
  }

  const farkMs = cikisTarih - girisTarih;
  const farkGun = farkMs / (1000 * 60 * 60 * 24);
  const yillikUcret = Math.min(ucret, tavan);
  const kidem = (farkGun / 365) * yillikUcret;

  kidemTazminat.value = kidem.toFixed(2);
}

document.addEventListener("DOMContentLoaded", runEvents);

function gosterBootstrapAlert(mesaj, tur = "danger") {
  const alertDiv = document.getElementById("kidemAlert");
  alertDiv.className = `alert alert-${tur}`;
  alertDiv.textContent = mesaj;
  alertDiv.classList.remove("d-none");

  setTimeout(() => {
    alertDiv.classList.add("d-none");
  }, 4000);
}