function tarihOlustur(gun, ay, yil) {
  return new Date(`${yil}-${String(ay).padStart(2, "0")}-${String(gun).padStart(2, "0")}`);
}

function showAlert(message, type = "success") {
  const alertDiv = document.getElementById("serbestFaizAlert");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  alertDiv.classList.remove("d-none");
}

document.getElementById("caForm2").addEventListener("submit", function (e) {
  e.preventDefault();

  const anapara = parseFloat(document.getElementById("hesapGiris").value.replace(",", "."));
  const faizOraniInput = document.querySelector('input[placeholder="Faiz Oranını Giriniz"]');
  const faizOrani = parseFloat(faizOraniInput.value.replace(",", "."));

  const baslangicGun = document.getElementById("gunSelect").value;
  const baslangicAy = document.getElementById("girisAy").value;
  const baslangicYil = document.getElementById("girisYil").value;

  const bitisGun = document.getElementById("cikisGun").value;
  const bitisAy = document.getElementById("cikisAy").value;
  const bitisYil = document.getElementById("cikisYil").value;

  if (isNaN(anapara) || isNaN(faizOrani)) {
    showAlert("Lütfen geçerli bir alacak tutarı ve faiz oranı giriniz.", "danger");
    return;
  }

  const baslangicTarih = tarihOlustur(baslangicGun, baslangicAy, baslangicYil);
  const bitisTarih = tarihOlustur(bitisGun, bitisAy, bitisYil);

  if (bitisTarih <= baslangicTarih) {
    showAlert("Bitiş tarihi, başlangıç tarihinden sonra olmalıdır.", "danger");
    return;
  }

  const gunFarki = (bitisTarih - baslangicTarih) / (1000 * 60 * 60 * 24);
  const faizTutari = (anapara * faizOrani * gunFarki) / 36500;

  document.querySelector('input[placeholder="Faiz Tutarı"]').value = faizTutari.toFixed(2);
});