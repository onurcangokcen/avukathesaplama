const ihbarButton = document.querySelector("#ihbarTazminatHesapla");

function runEvents() {
  ihbarButton.addEventListener("click", function (e) {
    e.preventDefault();
    ihbarTazminatHesapla();
  });
}

function ihbarTazminatHesapla() {
  const brutUcretInput = document.querySelector(".BrutUcret");
  const sonucInput = document.querySelector(".ihbarTazminatSonuc");

  const girisGun = parseInt(document.getElementById("gunSelect").value);
  const girisAy = parseInt(document.getElementById("girisAy").value) - 1;
  const girisYil = parseInt(document.getElementById("girisYil").value);

  const cikisGun = parseInt(document.getElementById("cikisGun").value);
  const cikisAy = parseInt(document.getElementById("cikisAy").value) - 1;
  const cikisYil = parseInt(document.getElementById("cikisYil").value);

  const brutUcret = parseFloat(brutUcretInput.value.replace(",", "."));

  if (
    isNaN(brutUcret) ||
    isNaN(girisGun) || isNaN(girisAy) || isNaN(girisYil) ||
    isNaN(cikisGun) || isNaN(cikisAy) || isNaN(cikisYil)
  ) {
    gosterBootstrapAlert("Lütfen tüm alanları eksiksiz ve doğru giriniz.", "danger");
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
  const farkYil = farkGun / 365;

  let ihbarHaftasi = 0;

  if (farkYil < 0.5) {
    ihbarHaftasi = 2;
  } else if (farkYil < 1.5) {
    ihbarHaftasi = 4;
  } else if (farkYil < 3) {
    ihbarHaftasi = 6;
  } else {
    ihbarHaftasi = 8;
  }

  const ihbarTazminati = ihbarHaftasi * 7 * (brutUcret / 30);

  sonucInput.value = ihbarTazminati.toFixed(2);
}

document.addEventListener("DOMContentLoaded", runEvents);

function gosterBootstrapAlert(mesaj, tur = "danger") {
  const alertDiv = document.getElementById("ihbarAlert");
  alertDiv.className = `alert alert-${tur}`;
  alertDiv.textContent = mesaj;
  alertDiv.classList.remove("d-none");

  setTimeout(() => {
    alertDiv.classList.add("d-none");
  }, 4000);
}