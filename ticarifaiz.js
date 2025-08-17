
const ticariFaizOranlari = [
  { baslangic: "2010-12-30", oran: 14 },
  { baslangic: "2011-12-29", oran: 17 },
  { baslangic: "2012-06-19", oran: 16 },
  { baslangic: "2012-12-20", oran: 13.5 },
  { baslangic: "2013-06-21", oran: 9.5 },
  { baslangic: "2013-12-27", oran: 10.25 },
  { baslangic: "2014-12-14", oran: 9.00 },
  { baslangic: "2016-12-31", oran: 8.75 },
  { baslangic: "2018-06-29", oran: 18.5 },
  { baslangic: "2019-10-11", oran: 17.25 },
  { baslangic: "2019-12-21", oran: 12.75 },
  { baslangic: "2020-06-13", oran: 9.00 },
  { baslangic: "2020-12-19", oran: 15.75 },
  { baslangic: "2021-12-31", oran: 14.75 },
  { baslangic: "2022-12-31", oran: 9.75 },
  { baslangic: "2023-06-24", oran: 15.75 },
  { baslangic: "2023-09-01", oran: 25.75 },
  { baslangic: "2023-09-28", oran: 30.75 },
  { baslangic: "2023-11-01", oran: 35.75 },
  { baslangic: "2023-12-01", oran: 40.75 },
  { baslangic: "2023-12-23", oran: 43.25 },
  { baslangic: "2024-04-01", oran: 50.75 },
  { baslangic: "2024-12-28", oran: 48.25 },
  { baslangic: "2025-03-08", oran: 43.25 }
];

// Yeni tarih oluşturucu
function tarihOlustur(gun, ay, yil) {
  return new Date(`${yil}-${String(ay).padStart(2, "0")}-${String(gun).padStart(2, "0")}`);
}

// Bootstrap alert gösterme
function showAlert(mesaj, tip = "danger") {
  const alertBox = document.getElementById("ticariFaizAlert");
  alertBox.className = `alert alert-${tip}`;
  alertBox.innerText = mesaj;
  alertBox.classList.remove("d-none");
}

// Alert gizleme
function hideAlert() {
  const alertBox = document.getElementById("ticariFaizAlert");
  alertBox.classList.add("d-none");
}

// Ticari faiz hesapla
function ticariFaizHesapla(anaPara, baslangic, bitis) {
  let toplamFaiz = 0;

  // Tarihleri eski → yeni sıralamak için tersten gez
  for (let i = ticariFaizOranlari.length - 1; i >= 0; i--) {
    const oranBaslangic = new Date(ticariFaizOranlari[i].baslangic);
    const oranBitis = i < ticariFaizOranlari.length - 1
      ? new Date(ticariFaizOranlari[i + 1].baslangic)
      : new Date("2100-01-01");

    const gecerliBaslangic = baslangic > oranBaslangic ? baslangic : oranBaslangic;
    const gecerliBitis = bitis < oranBitis ? bitis : oranBitis;

    if (gecerliBaslangic <= gecerliBitis) {
      const gunSayisi = Math.floor((gecerliBitis - gecerliBaslangic) / (1000 * 60 * 60 * 24)) + 1;
      const yillikFaiz = (anaPara * ticariFaizOranlari[i].oran) / 100;
      const gunlukFaiz = yillikFaiz / 365;
      toplamFaiz += gunlukFaiz * gunSayisi;
    }
  }

  return toplamFaiz.toFixed(2);
}

// Form gönderildiğinde hesaplama
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

  const faiz = ticariFaizHesapla(anaPara, baslangicTarihi, bitisTarihi);
  document.querySelector('input[name="ca"]').value = `${faiz}`;
  hideAlert(); 
});