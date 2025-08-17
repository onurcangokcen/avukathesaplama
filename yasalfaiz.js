const faizOranlari = [
  { baslangic: "1984-12-19", bitis: "1997-12-31", oran: 30 },
  { baslangic: "1998-01-01", bitis: "1999-12-31", oran: 50 },
  { baslangic: "2000-01-01", bitis: "2002-06-30", oran: 60 },
  { baslangic: "2002-07-01", bitis: "2003-06-30", oran: 55 },
  { baslangic: "2003-07-01", bitis: "2003-12-31", oran: 50 },
  { baslangic: "2004-01-01", bitis: "2004-06-30", oran: 43 },
  { baslangic: "2004-07-01", bitis: "2005-04-30", oran: 38 },
  { baslangic: "2005-05-01", bitis: "2005-12-31", oran: 12 },
  { baslangic: "2006-01-01", bitis: "2024-05-31", oran: 9 },
  { baslangic: "2024-06-01", bitis: "2099-12-31", oran: 24 }
];

// Gün ve ayları Date objesine çevir
function tarihOlustur(gun, ay, yil) {
  return new Date(`${yil}-${String(ay).padStart(2, "0")}-${String(gun).padStart(2, "0")}`);
}

// Bootstrap alert gösterme
function showAlert(metin, tip = "danger") {
  const alert = document.getElementById("yasalFaizAlert");
  alert.className = `alert alert-${tip}`;
  alert.innerText = metin;
  alert.classList.remove("d-none");
}

// Alert gizleme
function hideAlert() {
  const alert = document.getElementById("yasalFaizAlert");
  alert.classList.add("d-none");
}

// Faiz hesapla
function yasalFaizHesapla(anaPara, baslangic, bitis) {
  let toplamFaiz = 0;

  for (const oran of faizOranlari) {
    const oranBaslangic = new Date(oran.baslangic);
    const oranBitis = new Date(oran.bitis);

    const gecerliBaslangic = baslangic > oranBaslangic ? baslangic : oranBaslangic;
    const gecerliBitis = bitis < oranBitis ? bitis : oranBitis;

    if (gecerliBaslangic <= gecerliBitis) {
      const gunSayisi = Math.floor((gecerliBitis - gecerliBaslangic) / (1000 * 60 * 60 * 24)) + 1;
      const yillikFaiz = (anaPara * oran.oran) / 100;
      const gunlukFaiz = yillikFaiz / 365;
      toplamFaiz += gunlukFaiz * gunSayisi;
    }
  }

  return toplamFaiz.toFixed(2);
}

// Form gönderildiğinde
document.getElementById("caForm2").addEventListener("submit", function (e) {
  e.preventDefault();

  const anaPara = parseFloat(document.getElementById("hesapGiris").value.replace(",", "."));
  const basGun = document.getElementById("gunSelect").value;
  const basAy = document.getElementById("girisAy").value;
  const basYil = document.getElementById("girisYil").value;
  const bitGun = document.getElementById("cikisGun").value;
  const bitAy = document.getElementById("cikisAy").value;
  const bitYil = document.getElementById("cikisYil").value;

  if (!anaPara || !basGun || !basAy || !basYil || !bitGun || !bitAy || !bitYil) {
    showAlert("Lütfen tüm alanları eksiksiz doldurun.", "warning");
    return;
  }

  const baslangicTarihi = tarihOlustur(basGun, basAy, basYil);
  const bitisTarihi = tarihOlustur(bitGun, bitAy, bitYil);

  if (bitisTarihi < baslangicTarihi) {
    showAlert("Bitiş tarihi, başlangıç tarihinden önce olamaz.", "danger");
    return;
  }

  const faiz = yasalFaizHesapla(anaPara, baslangicTarihi, bitisTarihi);
  document.querySelector('input[name="ca"]').value = `${faiz} TL`;
  hideAlert(); // başarılıysa alert gizle
});
